"use client"

import type React from "react"
import Link from "next/link"
import { ClipboardClock, Heart, LayoutList, Menu, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useAuth } from "@/contexts/auth-context"
import { useCart } from "@/contexts/cart-context"
import { useWishlist } from "@/contexts/wishlist-context"
import Image from "next/image"
import SwitcherTheme from "../switcher-theme"

function HeaderMobileMenu() {
    const { user, signOut } = useAuth()
    const { itemCount } = useCart()
    const { items: wishlistItems } = useWishlist()

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Menu className="h-4 w-4" />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0" forceMount>
                <SheetHeader>
                    <SheetTitle>
                        <Link href="/catalog" className="flex items-center space-x-2">
                            <Image src="/sgt_store_logo.png" width={140} height={40} alt="Logo Sgt Store" />
                        </Link>
                    </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col h-full">
                    <div className="flex-1 flex flex-col gap-2 p-4">
                        <Link href="/catalog">
                            <Button variant="ghost" className="w-full justify-start">
                                <LayoutList />
                                Catálogo</Button>
                        </Link>
                        <Link href="/wishlist">
                            <Button variant="ghost" className="w-full justify-start">
                                <Heart className="h-4 w-4" />
                                Lista de Desejos
                                {user && wishlistItems.length > 0 && (
                                    <Badge className="ml-2">{wishlistItems.length}</Badge>
                                )}
                            </Button>
                        </Link>
                        <Link href="/cart">
                            <Button variant="ghost" className="w-full justify-start">
                                <ShoppingCart className="h-4 w-4" />
                                Carrinho
                                {user && itemCount > 0 && (
                                    <Badge className="ml-2">{itemCount}</Badge>
                                )}
                            </Button>
                        </Link>
                        {user && (
                            <Link href="/orders">
                                <Button variant="ghost" className="w-full justify-start">
                                    <ClipboardClock />
                                    Histórico de Pedidos
                                </Button>
                            </Link>
                        )}
                    </div>
                    <SheetFooter className="p-4 border-t flex flex-col gap-2">
                        {user ? (
                            <>
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col text-xs text-muted-foreground">
                                        <b>{user.user_metadata?.name}</b>
                                        <small>{user.email}</small>
                                    </div>
                                    <SwitcherTheme />
                                </div>
                                <Button variant="outline" size="sm" onClick={signOut}>Sair</Button>
                            </>
                        ) : (
                            <Link href="/auth/signin">
                                <Button variant="default" size="sm" className="w-full">Entrar</Button>
                            </Link>
                        )}
                    </SheetFooter>
                </div>
            </SheetContent>
        </Sheet>
    )
}
export default HeaderMobileMenu;