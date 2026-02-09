import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProduct } from "@/services/productService";
import type { ProductsResponse, Product } from "@/types/product";

export const useUpdateProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateProduct,
        onSuccess: (updated) => {
            const queries = queryClient.getQueriesData<ProductsResponse>({
                queryKey: ["products"],
            });

            for (const [key, data] of queries) {
                if (!data) continue;
                const products = data.products.map((p) =>
                    p.id === updated.id ? { ...p, ...updated } : p
                );
                queryClient.setQueryData<ProductsResponse>(key, {
                    ...data,
                    products,
                });
            }
        },
    });
};
