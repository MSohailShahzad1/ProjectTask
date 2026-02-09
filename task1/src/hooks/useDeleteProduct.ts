import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "@/services/productService";
import type { ProductsResponse } from "@/types/product";

export const useDeleteProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteProduct,
        onSuccess: (_, deletedId) => {
            const queries = queryClient.getQueriesData<ProductsResponse>({
                queryKey: ["products"],
            });

            for (const [key, data] of queries) {
                if (!data) continue;
                const products = data.products.filter((p) => p.id !== deletedId);
                if (products.length === data.products.length) continue;
                queryClient.setQueryData<ProductsResponse>(key, {
                    ...data,
                    products,
                    total: Math.max(0, data.total - 1),
                });
            }
        },
    });
};
