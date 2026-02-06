import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useUIStore } from "@/zustand/ui.store"
import { useAppSelector } from "@/store/hooks"

export default function Header() {
    const toggleCart = useUIStore((s) => s.toggleCart)
    const count = useAppSelector(
        (state) => state.cart.items.length
    )

    return (
        <header className="flex justify-between p-4 border-b">
            <h1 className="font-bold text-xl">Cart App</h1>

            <Button onClick={toggleCart} className="relative">
                Cart
                {count > 0 && (
                    <Badge className="absolute -top-2 -right-2">
                        {count}
                    </Badge>
                )}
            </Button>
        </header>
    )
}
