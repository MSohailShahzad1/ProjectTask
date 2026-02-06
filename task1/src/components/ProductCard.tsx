import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Product } from "@/types/product"
import { useAppDispatch } from "@/store/hooks"
import { addToCart } from "@/store/slices/cart.slice"

export default function ProductCard({ product }: { product: Product }) {
    const dispatch = useAppDispatch()

    return (
        <Card>
            <CardContent className="p-4 space-y-2">
                <img src={product.thumbnail} />
                <h3 className="font-medium">{product.title}</h3>
                <p>${product.price}</p>

                <Button
                    className="w-full"
                    onClick={() => dispatch(addToCart(product))}
                >
                    Add to Cart
                </Button>
            </CardContent>
        </Card>
    )
}
