import { type ColumnDef } from "@tanstack/react-table"
import { type Product } from "@/types/product"

export const columns: ColumnDef<Product>[] = [
    {
        accessorKey: "title",
        header: "Product",
    },
    {
        accessorKey: "category",
        header: "Category",
    },
    {
        accessorKey: "price",
        header: "Price ($)",
    },
    {
        accessorKey: "rating",
        header: "Rating",
    },
    {
        accessorKey: "stock",
        header: "Stock",
    },
]
