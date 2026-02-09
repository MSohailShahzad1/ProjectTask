import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/services/productService";

export const useProducts = (
    page: number,
    limit: number,
    category: string
) => {
    const skip = (page - 1) * limit;

    return useQuery({
        queryKey: ["products", page, category],
        queryFn: () => fetchProducts(limit, skip, category),
    });
};
