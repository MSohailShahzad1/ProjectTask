import { useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import { useAddProduct } from "@/hooks/useAddProduct";
import { useDeleteProduct } from "@/hooks/useDeleteProduct";
import { useUpdateProduct } from "@/hooks/useUpdateProduct";
import { useCategories } from "@/hooks/useCategories";
import { Button } from "@/components/ui/button";
import { ProductModal } from "@/components/ProductModal";
import type { Product } from "@/types/product";

const LIMIT = 8;

export default function Products() {
    const [page, setPage] = useState(1);
    const [open, setOpen] = useState(false);
    const [category, setCategory] = useState("all");
    const [editing, setEditing] = useState<Product | null>(null);

    const { data, isLoading, isError } = useProducts(page, LIMIT, category);
    const categoriesQuery = useCategories();
    const addMutation = useAddProduct();
    const updateMutation = useUpdateProduct();
    const deleteMutation = useDeleteProduct();

    if (isLoading)
        return (
            <div className="min-h-screen bg-slate-50">
                <div className="mx-auto max-w-6xl px-4 py-10">
                    <div className="rounded-lg border border-slate-200 bg-white p-6 text-slate-600">
                        Loading products...
                    </div>
                </div>
            </div>
        );
    if (isError)
        return (
            <div className="min-h-screen bg-slate-50">
                <div className="mx-auto max-w-6xl px-4 py-10">
                    <div className="rounded-lg border border-red-200 bg-white p-6 text-red-700">
                        Failed to load products
                    </div>
                </div>
            </div>
        );

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8">
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-xl font-semibold text-slate-900">
                                Products
                            </h1>
                            <p className="text-sm text-slate-500">
                                Browse, filter, and manage product listings
                            </p>
                        </div>
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                            <div className="flex items-center gap-3">
                                <select
                                    className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm outline-none ring-0 focus:border-slate-400 sm:w-56"
                                    value={category}
                                    onChange={(e) => {
                                        setCategory(e.target.value);
                                        setPage(1);
                                    }}
                                >
                                    <option value="all">All categories</option>
                                    {categoriesQuery.data?.map((c) => (
                                        <option key={c} value={c}>
                                            {c}
                                        </option>
                                    ))}
                                </select>
                                {categoriesQuery.isLoading && (
                                    <span className="text-xs text-slate-500">
                                        Loading categories...
                                    </span>
                                )}
                                {categoriesQuery.isError && (
                                    <span className="text-xs text-red-600">
                                        Failed to load categories
                                    </span>
                                )}
                            </div>
                            <Button
                                onClick={() => {
                                    setEditing(null);
                                    setOpen(true);
                                }}
                            >
                                Add Product
                            </Button>
                        </div>
                    </div>
                </div>

                {data?.products.length === 0 ? (
                    <div className="rounded-lg border border-slate-200 bg-white p-10 text-center text-slate-600">
                        No products found for this category.
                    </div>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {data?.products.map((p) => (
                            <div
                                key={p.id}
                                className="group flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                            >
                                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                                    <img
                                        src={p.thumbnail}
                                        alt={p.title}
                                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="flex flex-1 flex-col p-4">
                                    <div className="flex items-start justify-between gap-3">
                                        <h3 className="line-clamp-2 text-sm font-semibold text-slate-900">
                                            {p.title}
                                        </h3>
                                        <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">
                                            {p.category}
                                        </span>
                                    </div>
                                    <p className="mt-2 text-lg font-semibold text-slate-900">
                                        ${p.price}
                                    </p>
                                    <div className="mt-auto flex gap-2 pt-4">
                                        <Button
                                            size="sm"
                                            onClick={() => {
                                                setEditing(p);
                                                setOpen(true);
                                            }}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => deleteMutation.mutate(p.id)}
                                            disabled={deleteMutation.isLoading}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-slate-600">
                        Showing {data?.products.length ?? 0} of {data?.total ?? 0}
                    </p>
                    <div className="flex gap-2">
                        <Button
                            disabled={page === 1}
                            onClick={() => setPage((p) => p - 1)}
                        >
                            Prev
                        </Button>
                        <Button
                            onClick={() => setPage((p) => p + 1)}
                            disabled={data && data.skip + data.limit >= data.total}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>

            <ProductModal
                open={open}
                onClose={() => setOpen(false)}
                onSubmit={(data) => {
                    if (editing) {
                        updateMutation.mutate({ id: editing.id, data });
                    } else {
                        addMutation.mutate(data);
                    }
                    setOpen(false);
                }}
                initialData={editing ?? undefined}
            />
        </div>
    );
}
