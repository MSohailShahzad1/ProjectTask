import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProduct } from "@/services/productService";
import type { ProductsResponse } from "@/types/product";

export const useAddProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addProduct,
        onSuccess: (created) => {
            const queries = queryClient.getQueriesData<ProductsResponse>({
                queryKey: ["products"],
            });

            for (const [key, data] of queries) {
                if (!data) continue;
                const [, page, category] = key as unknown as [
                    string,
                    number,
                    string
                ];

                if (page !== 1) continue;
                if (category && category !== "all" && category !== created.category)
                    continue;

                const products = [created, ...data.products].slice(0, data.limit);
                queryClient.setQueryData<ProductsResponse>(key, {
                    ...data,
                    products,
                    total: data.total + 1,
                });
            }
        },
    });
};
