"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import { Header } from "@/components/header"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import { formatPrice, generateWhatsAppMessage, createWhatsAppLink } from "@/lib/utils"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"
import { useSendOrder } from "@/hooks/useSendOrder"

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, total } = useCart()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const { sendOrder } = useSendOrder()

  const handleQuantityChange = async (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return
    await updateQuantity(productId, newQuantity)
  }

  const handleRemoveItem = async (productId: string) => {
    await removeItem(productId)
  }

  const handleCheckout = async () => {
    if (!user || items.length === 0) return

    setLoading(true)
    try {
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: user.id,
          total: total,
        })
        .select()
        .single()

      if (orderError) throw orderError

      const orderItems = items.map((item) => ({
        order_id: order.id,
        product_id: item.product.id,
        quantity: item.quantity,
        price: item.product.price,
      }))

      const { error: itemsError } = await supabase.from("order_items").insert(orderItems)
      if (itemsError) throw itemsError

      const userName = user.user_metadata?.name || user.email || "Cliente"
      const userEmail = user.email || ""

      const whatsappItems = items.map((item) => ({
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
      }))

      await sendOrder({
        userName,
        userEmail,
        items: whatsappItems,
        total,
      })

      await clearCart()

      toast.success("Pedido enviado com sucesso!", {
        description: "Seu pedido foi registrado e enviado via WhatsApp",
      })
    } catch (error) {
      console.error("Erro durante o checkout:", error)
      toast.error("Erro ao processar pedido", {
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
            <p>Por favor, faça login para ver seu carrinho.</p>
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
        <Breadcrumbs items={[{ label: "Carrinho de Compras" }]} />

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Itens do Carrinho */}
          <div className="lg:col-span-2">
            <h1 className="text-2xl font-bold mb-6">Carrinho de Compras</h1>

            {items.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Seu carrinho está vazio</h3>
                  <p className="text-muted-foreground mb-4">Adicione alguns produtos para começar</p>
                  <Link href="/catalog">
                    <Button>Continuar Comprando</Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <div className="relative h-20 w-20 flex-shrink-0">
                          <Image
                            src={item.product.image_url || "/placeholder.svg"}
                            alt={item.product.name}
                            fill
                            className="object-cover rounded-md"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium truncate">{item.product.name}</h3>
                          <p className="text-sm text-muted-foreground capitalize">{item.product.category}</p>
                          <p className="text-lg font-semibold text-primary">{formatPrice(item.product.price)}</p>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-transparent"
                            onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>

                          <span className="w-8 text-center">{item.quantity}</span>

                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-transparent"
                            onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        <div className="text-right">
                          <p className="font-semibold">{formatPrice(item.product.price * item.quantity)}</p>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-700"
                            onClick={() => handleRemoveItem(item.product.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Resumo do Pedido */}
          {items.length > 0 && (
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Resumo do Pedido</h2>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span>Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} itens)</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Frete</span>
                      <span className="text-green-600">Grátis</span>
                    </div>
                  </div>

                  <div className="border-t pt-4 mb-6">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button onClick={handleCheckout} disabled={loading} className="w-full" size="lg">
                      {loading ? "Processando..." : "Finalizar via WhatsApp"}
                    </Button>

                    <Link href="/catalog">
                      <Button variant="outline" className="w-full bg-transparent">
                        Continuar Comprando
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
