"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header/header"
import { ProductGrid } from "@/components/product-grid"
import { ProductFilters } from "@/components/product-filters"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { supabase } from "@/lib/supabase"
import type { Product } from "@/types"
import { useAuth } from "@/contexts/auth-context"
import { ArrowDown, Loader } from "lucide-react"

export default function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState("created_at")
  const searchParams = useSearchParams()
  const { user, loading: authLoading } = useAuth()

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        window.location.href = "/auth/signin"
        return
      }
      loadProducts()
    }
  }, [searchParams, sortBy, user, authLoading])

  const loadProducts = async () => {
    setLoading(true)
    try {
      let query = supabase.from("products").select("*")

      // Apply filters
      const category = searchParams.get("category")
      const search = searchParams.get("search")
      const minPrice = searchParams.get("minPrice")
      const maxPrice = searchParams.get("maxPrice")

      if (category) {
        query = query.eq("category", category)
      }

      if (search) {
        query = query.ilike("name", `%${search}%`)
      }

      if (minPrice) {
        query = query.gte("price", Number.parseInt(minPrice))
      }

      if (maxPrice) {
        query = query.lte("price", Number.parseInt(maxPrice))
      }

      // Apply sorting
      const [field, direction] = sortBy.split("-")
      query = query.order(field, { ascending: direction !== "desc" })

      const { data, error } = await query

      if (error) throw error

      setProducts(data || [])
    } catch (error) {
      console.error("Error loading products:", error)
    } finally {
      setLoading(false)
    }
  }

  if (authLoading) {
    return <div className="min-h-screen bg-background grid place-items-center">
      <Loader className="animate-spin" />
    </div>
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <Breadcrumbs items={[{ label: "Catalogo" }]} />

        {/* Hero Section */}
        <div className="relative mb-12 rounded-2xl bg-gradient-to-r from-blue-600 to-green-600 p-8 text-white overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Simples
              <br />é Melhor
            </h1>
            <p className="text-lg opacity-90 mb-6">Descubra nossa coleção selecionada de produtos premium</p>
            <Button variant="secondary" size="lg">
              <ArrowDown className="h-4 w-4 mr-2" />
              Explorar Produtos
            </Button>
          </div>
          <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-black/20 to-transparent" />
        </div>

        {/* Filters and Products */}
        <div className="flex gap-8">
          <div className="hidden  lg:flex">
            <ProductFilters />
          </div>

          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between lg:mb-6 mb-3">
              <div className="lg:hidden">
                <ProductFilters />
              </div>
              <div className="hidden lg:block text-sm text-muted-foreground">
                {products.length} resultado{products.length !== 1 ? "s" : ""} para produtos
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground">Ordenar por:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="created_at-desc">Mais Recentes</SelectItem>
                    <SelectItem value="created_at-asc">Mais Antigos</SelectItem>
                    <SelectItem value="price-asc">Preço: Menor para Maior</SelectItem>
                    <SelectItem value="price-desc">Preço: Maior para Menor</SelectItem>
                    <SelectItem value="name-asc">Nome: A a Z</SelectItem>
                    <SelectItem value="name-desc">Nome: Z a A</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="text-sm text-muted-foreground mb-3 text-center">
              {products.length} resultado{products.length !== 1 ? "s" : ""} para produtos
            </div>
            {/* Products Grid */}
            <ProductGrid products={products} loading={loading} />
          </div>
        </div>
      </main>
    </div>
  )
}
