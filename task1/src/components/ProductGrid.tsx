import { useEffect } from "react"
import { fetchProducts } from "@/store/slices/products.slice"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import ProductCard from "./ProductCard"
import { Skeleton } from "@/components/ui/skeleton"

export default function ProductGrid() {
    const dispatch = useAppDispatch()
    const { items, loading } = useAppSelector(
        (state) => state.products
    )

    useEffect(() => {
        dispatch(fetchProducts())
    }, [])

    if (loading)
        return (
            <div className="grid grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                    <Skeleton key={i} className="h-60" />
                ))}
            </div>
        )

    return (
        <div className="grid grid-cols-4 gap-4">
            {items.map((p) => (
                <ProductCard key={p.id} product={p} />
            ))}
        </div>
    )
}
