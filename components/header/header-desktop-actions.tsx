"use client"

import { useAuth } from "@/contexts/auth-context"
import { useCart } from "@/contexts/cart-context"
import { useWishlist } from "@/contexts/wishlist-context"
import { Heart, ShoppingCart, User } from "lucide-react"
import SwitcherTheme from "../switcher-theme"
import { Button } from "../ui/button"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Badge } from "../ui/badge"

function HeaderDesktopActions() {
    const { user, signOut } = useAuth()
    const { itemCount } = useCart()
    const { items: wishlistItems } = useWishlist()

    return (
        <div className="hidden md:flex items-center space-x-4">
            <SwitcherTheme />
            {user && (
                <Link href="/wishlist">
                    <Button variant="ghost" size="icon" className="relative">
                        <Heart className="h-4 w-4" />
                        {wishlistItems.length > 0 && (
                            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                                {wishlistItems.length}
                            </Badge>
                        )}
                    </Button>
                </Link>
            )}
            {user && (
                <Link href="/cart">
                    <Button variant="ghost" size="icon" className="relative">
                        <ShoppingCart className="h-4 w-4" />
                        {itemCount > 0 && (
                            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                                {itemCount}
                            </Badge>
                        )}
                    </Button>
                </Link>
            )}
            {user ? (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <User className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <div className="px-2 py-1.5 text-sm font-medium">Olá, {user.user_metadata?.name || user.email}</div>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href="/orders">Histórico de Pedidos</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href="/wishlist">Lista de Desejos</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={signOut}>Sair</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <Link href="/auth/signin">
                    <Button variant="default" size="sm">
                        Entrar
                    </Button>
                </Link>
            )}
        </div>
    )
}

export default HeaderDesktopActions;