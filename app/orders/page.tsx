"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabase"
import { formatPrice } from "@/lib/utils"
import { Package } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

interface Order {
  id: string
  total: number
  created_at: string
  order_items: Array<{
    quantity: number
    price: number
    products: {
      name: string
      image_url: string
    }
  }>
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      loadOrders()
    }
  }, [user])

  const loadOrders = async () => {
    if (!user) return

    setLoading(true)
    try {
      const { data, error } = await supabase
        .from("orders")
        .select(`
          id,
          total,
          created_at,
          order_items (
            quantity,
            price,
            products (
              name,
              image_url
            )
          )
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

      if (error) throw error

      // Implementação mais correta para setOrders
      const ordersData = data || []
      setOrders(ordersData)

      if (ordersData.length === 0) {
        toast.info("Nenhum pedido encontrado", {
          description: "Seus pedidos aparecerão aqui após a primeira compra",
        })
      }
    } catch (error) {
      console.error("Erro ao carregar pedidos:", error)
      toast.error("Erro ao carregar pedidos", {
        description: "Tente novamente em alguns instantes",
      })
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p>Por favor, faça login para ver seus pedidos.</p>
            <Link href="/auth/signin">
              <Button className="mt-4">Entrar</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <Breadcrumbs items={[{ label: "Histórico de Pedidos" }]} />

        <h1 className="text-2xl font-bold mb-6">Histórico de Pedidos</h1>

        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="animate-pulse space-y-4">
                    <div className="h-4 bg-muted rounded w-1/4"></div>
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                    <div className="h-4 bg-muted rounded w-1/3"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : orders.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Nenhum pedido ainda</h3>
              <p className="text-muted-foreground mb-4">Seu histórico de pedidos aparecerá aqui</p>
              <Link href="/catalog">
                <Button>Começar a Comprar</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Pedido #{order.id.slice(0, 8)}</CardTitle>
                    <Badge variant="secondary">Concluído</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(order.created_at).toLocaleDateString("pt-BR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {order.order_items.map((item, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className="text-sm">
                          {item.quantity}x {item.products.name}
                        </div>
                        <div className="text-sm font-medium">{formatPrice(item.price * item.quantity)}</div>
                      </div>
                    ))}
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Total</span>
                        <span className="text-lg font-bold text-primary">{formatPrice(order.total)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
