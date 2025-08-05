"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import type { Product } from "@/types"
import { useCart } from "@/contexts/cart-context"
import { useWishlist } from "@/contexts/wishlist-context"
import { useAuth } from "@/contexts/auth-context"
import { formatPrice } from "@/lib/utils"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist()
  const { user } = useAuth()

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (user) {
      await addItem(product)
    }
  }

  const handleWishlistToggle = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (user) {
      if (isInWishlist(product.id)) {
        await removeFromWishlist(product.id)
      } else {
        await addToWishlist(product)
      }
    }
  }

  const isNew = new Date(product.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)

  return (
    <Card className="group overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow">
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

        {isNew && <Badge className="absolute top-2 left-2 bg-green-500 hover:bg-green-600">Novo</Badge>}

        {user && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8 bg-white/80 hover:bg-white"
            onClick={handleWishlistToggle}
          >
            <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
          </Button>
        )}
      </div>

      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground capitalize">{product.category}</div>

          <Link href={`/product/${product.id}`}>
            <h3 className="font-medium line-clamp-2 hover:text-primary">{product.name}</h3>
          </Link>

          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`h-3 w-3 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
            ))}
            <span className="text-xs text-muted-foreground ml-1">(4.0)</span>
          </div>

          <div className="text-lg font-semibold text-primary">{formatPrice(product.price)}</div>
          {user && (
            <Button size="sm" onClick={handleAddToCart} className="h-8 w-full px-3">
              <ShoppingCart className="h-3 w-3 mr-1" />
              Adicionar
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
