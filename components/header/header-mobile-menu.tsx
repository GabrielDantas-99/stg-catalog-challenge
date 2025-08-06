import { useAuth } from "@/contexts/auth-context"
import { useCart } from "@/contexts/cart-context"
import { useWishlist } from "@/contexts/wishlist-context"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import { Button } from "../ui/button"
import { Menu } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "../ui/badge"
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
            <SheetContent side="left" className="w-72 p-0">
                <div className="flex flex-col h-full">
                    <div className="p-4 border-b">
                        <Link href="/catalog" className="flex items-center space-x-2">
                            <Image src="/sgt_store_logo.png" width={140} height={40} alt="Logo Sgt Store" />
                        </Link>
                    </div>
                    <div className="flex-1 flex flex-col gap-2 p-4">
                        <Link href="/catalog">
                            <Button variant="ghost" className="w-full justify-start">Catálogo</Button>
                        </Link>
                        <Link href="/wishlist">
                            <Button variant="ghost" className="w-full justify-start">
                                Lista de Desejos
                                {user && wishlistItems.length > 0 && (
                                    <Badge className="ml-2">{wishlistItems.length}</Badge>
                                )}
                            </Button>
                        </Link>
                        <Link href="/cart">
                            <Button variant="ghost" className="w-full justify-start">
                                Carrinho
                                {user && itemCount > 0 && (
                                    <Badge className="ml-2">{itemCount}</Badge>
                                )}
                            </Button>
                        </Link>
                        {user && (
                            <Link href="/orders">
                                <Button variant="ghost" className="w-full justify-start">Histórico de Pedidos</Button>
                            </Link>
                        )}
                    </div>
                    <div className="p-4 border-t flex flex-col gap-2">
                        <SwitcherTheme />
                        {user ? (
                            <>
                                <div className="text-xs text-muted-foreground">{user.user_metadata?.name || user.email}</div>
                                <Button variant="outline" size="sm" onClick={signOut}>Sair</Button>
                            </>
                        ) : (
                            <Link href="/auth/signin">
                                <Button variant="default" size="sm" className="w-full">Entrar</Button>
                            </Link>
                        )}
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default HeaderMobileMenu