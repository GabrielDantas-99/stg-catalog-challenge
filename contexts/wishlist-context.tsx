"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useAuth } from "./auth-context"
import { supabase } from "@/lib/supabase"
import type { Product } from "@/types"
import { toast } from "sonner"

interface WishlistContextType {
  items: Product[]
  loading: boolean
  addItem: (product: Product) => Promise<void>
  removeItem: (productId: string) => Promise<void>
  isInWishlist: (productId: string) => boolean
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      loadWishlistItems()
    } else {
      setItems([])
    }
  }, [user])

  const loadWishlistItems = async () => {
    if (!user) return

    setLoading(true)
    try {
      const { data, error } = await supabase
        .from("wishlist")
        .select(`
          products (*)
        `)
        .eq("user_id", user.id)

      if (error) throw error

      const wishlistItems = data.map((item) => item.products as Product)
      setItems(wishlistItems)
    } catch (error) {
      console.error("Erro ao carregar lista de desejos:", error)
      toast.error("Erro ao carregar lista de desejos")
    } finally {
      setLoading(false)
    }
  }

  const addItem = async (product: Product) => {
    if (!user) return

    try {
      const { error } = await supabase.from("wishlist").insert({
        user_id: user.id,
        product_id: product.id,
      })

      if (error) throw error

      setItems((prev) => [...prev, product])

      toast.success("Adicionado à lista de desejos", {
        description: `${product.name} foi adicionado à sua lista de desejos`,
      })
    } catch (error) {
      console.error("Erro ao adicionar à lista de desejos:", error)
      toast.error("Erro ao adicionar à lista de desejos")
    }
  }

  const removeItem = async (productId: string) => {
    if (!user) return

    try {
      const { error } = await supabase.from("wishlist").delete().eq("user_id", user.id).eq("product_id", productId)

      if (error) throw error

      const removedItem = items.find((item) => item.id === productId)
      setItems((prev) => prev.filter((item) => item.id !== productId))

      toast.success("Removido da lista de desejos", {
        description: `${removedItem?.name} foi removido da sua lista de desejos`,
      })
    } catch (error) {
      console.error("Erro ao remover da lista de desejos:", error)
      toast.error("Erro ao remover da lista de desejos")
    }
  }

  const isInWishlist = (productId: string) => {
    return items.some((item) => item.id === productId)
  }

  return (
    <WishlistContext.Provider
      value={{
        items,
        loading,
        addItem,
        removeItem,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }
  return context
}
