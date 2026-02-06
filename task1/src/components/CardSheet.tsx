import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { useUIStore } from "@/zustand/ui.store"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { removeFromCart } from "@/store/slices/cart.slice"
import { Button } from "@/components/ui/button"

export default function CartSheet() {
    const cartOpen = useUIStore((s) => s.cartOpen)
    const toggleCart = useUIStore((s) => s.toggleCart)
    const items = useAppSelector((s) => s.cart.items)
    const dispatch = useAppDispatch()

    return (
        <Sheet open={cartOpen} onOpenChange={toggleCart}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Your Cart</SheetTitle>
                </SheetHeader>

                {items.length === 0 && <p>Cart is empty</p>}

                {items.map((item) => (
                    <div key={item.id} className="mt-4">
                        <p>{item.title}</p>
                        <p>Qty: {item.quantity}</p>
                        <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => dispatch(removeFromCart(item.id))}
                        >
                            Remove
                        </Button>
                    </div>
                ))}
            </SheetContent>
        </Sheet>
    )
}
