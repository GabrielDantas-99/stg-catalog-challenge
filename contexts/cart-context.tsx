"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useAuth } from "./auth-context"
import { supabase } from "@/lib/supabase"
import type { Product } from "@/types"
import { cartCache } from "@/lib/cache"
import { toast } from "sonner"

interface CartItem {
  id: string
  product: Product
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  loading: boolean
  addItem: (product: Product, quantity?: number) => Promise<void>
  removeItem: (productId: string) => Promise<void>
  updateQuantity: (productId: string, quantity: number) => Promise<void>
  clearCart: () => Promise<void>
  total: number
  itemCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      loadCartItems()
    } else {
      setItems([])
      cartCache.remove()
    }
  }, [user])

  // Cache cart items whenever they change
  useEffect(() => {
    if (user && items.length > 0) {
      cartCache.set({ items, timestamp: Date.now() })
    }
  }, [items, user])

  const loadCartItems = async () => {
    if (!user) return

    setLoading(true)
    try {
      // Try to load from cache first
      const cachedCart = cartCache.get()
      if (cachedCart && Date.now() - cachedCart.timestamp < 5 * 60 * 1000) {
        // 5 minutes cache
        setItems(cachedCart.items)
        setLoading(false)
        return
      }

      const { data, error } = await supabase
        .from("cart_items")
        .select(`
          id,
          quantity,
          products (*)
        `)
        .eq("user_id", user.id)

      if (error) throw error

      const cartItems = data.map((item) => ({
        id: item.id,
        product: Array.isArray(item.products) ? item.products[0] as Product : item.products as Product,
        quantity: item.quantity,
      }))

      setItems(cartItems)
    } catch (error) {
      console.error("Erro ao carregar carrinho:", error)
      toast.error("Erro ao carregar carrinho")
    } finally {
      setLoading(false)
    }
  }

  const addItem = async (product: Product, quantity = 1) => {
    if (!user) return

    try {
      const existingItem = items.find((item) => item.product.id === product.id)

      if (existingItem) {
        await updateQuantity(product.id, existingItem.quantity + quantity)
      } else {
        const { data, error } = await supabase
          .from("cart_items")
          .insert({
            user_id: user.id,
            product_id: product.id,
            quantity,
          })
          .select()
          .single()

        if (error) throw error

        setItems((prev) => [
          ...prev,
          {
            id: data.id,
            product,
            quantity,
          },
        ])
      }

      toast.success("Produto adicionado ao carrinho", {
        description: `${product.name} foi adicionado com sucesso`,
        duration: 2000,
      })
    } catch (error) {
      console.error("Erro ao adicionar ao carrinho:", error)
      toast.error("Erro ao adicionar produto", {
        description: "Tente novamente em alguns instantes",
      })
    }
  }

  const removeItem = async (productId: string) => {
    if (!user) return

    try {
      const { error } = await supabase.from("cart_items").delete().eq("user_id", user.id).eq("product_id", productId)

      if (error) throw error

      const removedItem = items.find((item) => item.product.id === productId)
      setItems((prev) => prev.filter((item) => item.product.id !== productId))

      toast.success("Produto removido", {
        description: `${removedItem?.product.name} foi removido do carrinho`,
      })
    } catch (error) {
      console.error("Erro ao remover do carrinho:", error)
      toast.error("Erro ao remover produto")
    }
  }

  const updateQuantity = async (productId: string, quantity: number) => {
    if (!user || quantity < 1) return

    try {
      const { error } = await supabase
        .from("cart_items")
        .update({ quantity })
        .eq("user_id", user.id)
        .eq("product_id", productId)

      if (error) throw error

      setItems((prev) => prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item)))
    } catch (error) {
      console.error("Erro ao atualizar quantidade:", error)
      toast.error("Erro ao atualizar quantidade")
    }
  }

  const clearCart = async () => {
    if (!user) return

    try {
      const { error } = await supabase.from("cart_items").delete().eq("user_id", user.id)

      if (error) throw error

      setItems([])
      cartCache.remove()
    } catch (error) {
      console.error("Erro ao limpar carrinho:", error)
      toast.error("Erro ao limpar carrinho")
    }
  }

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        loading,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        total,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
