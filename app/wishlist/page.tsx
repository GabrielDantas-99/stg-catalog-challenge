"use client"

import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart } from "lucide-react"
import { Header } from "@/components/header/header"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useWishlist } from "@/contexts/wishlist-context"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import { formatPrice } from "@/lib/utils"
import { Product } from "@/types"

export default function WishlistPage() {
  const { items, removeItem } = useWishlist()
  const { addItem } = useCart()
  const { user } = useAuth()

  const handleAddToCart = async (product: Product) => {
    await addItem(product)
  }

  const handleRemoveFromWishlist = async (productId: string) => {
    await removeItem(productId)
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p>Por favor, faça login para ver sua lista de desejos.</p>
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
        <Breadcrumbs items={[{ label: "Wishlist" }]} />

        <h1 className="text-2xl font-bold mb-6">Minha Lista de Desejos</h1>

        {items.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Heart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Sua lista de desejos está vazia</h3>
              <p className="text-muted-foreground mb-4">Salve produtos que você ama para depois</p>
              <Link href="/catalog">
                <Button>Navegar Produtos</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((product) => (
              <Card key={product.id} className="group overflow-hidden">
                <div className="relative">
                  <Link href={`/product/${product.id}`}>
                    <div className="aspect-square overflow-hidden bg-gray-100">
                      <Image
                        src={product.image_url || "/placeholder.svg"}
                        alt={product.name}
                        width={300}
                        height={300}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                  </Link>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8 bg-white/80 hover:bg-white"
                    onClick={() => handleRemoveFromWishlist(product.id)}
                  >
                    <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                  </Button>
                </div>

                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground capitalize">{product.category}</div>

                    <Link href={`/product/${product.id}`}>
                      <h3 className="font-medium line-clamp-2 hover:text-primary">{product.name}</h3>
                    </Link>

                    <div className="flex items-center justify-between">
                      <div className="text-lg font-semibold text-primary">{formatPrice(product.price)}</div>

                      <Button size="sm" onClick={() => handleAddToCart(product)} className="h-8 px-3">
                        <ShoppingCart className="h-3 w-3 mr-1" />
                        Adicionar
                      </Button>
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
