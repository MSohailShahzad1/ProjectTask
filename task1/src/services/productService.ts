import api from "@/api/axios";
import type { ProductsResponse, Product } from "@/types/product";

export const fetchProducts = async (
    limit: number,
    skip: number,
    category?: string
): Promise<ProductsResponse> => {
    const url =
        category && category !== "all"
            ? `/products/category/${category}?limit=${limit}&skip=${skip}`
            : `/products?limit=${limit}&skip=${skip}`;

    const res = await api.get(url);
    return res.data;
};

export const fetchCategories = async (): Promise<string[]> => {
    const res = await api.get("/products/categories");
    const data = res.data as Array<
        string | { slug?: string; name?: string; url?: string }
    >;

    return data.map((item) => {
        if (typeof item === "string") return item;
        return item.slug || item.name || "";
    }).filter(Boolean);
};

export const addProduct = async (
    data: Omit<Product, "id">
): Promise<Product> => {
    const res = await api.post("/products/add", data);
    return res.data;
};

export const updateProduct = async ({
    id,
    data,
}: {
    id: number;
    data: Partial<Product>;
}): Promise<Product> => {
    const res = await api.put(`/products/${id}`, data);
    return res.data;
};

export const deleteProduct = async (id: number) => {
    return api.delete(`/products/${id}`);
};
