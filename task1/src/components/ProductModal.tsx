import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import type { Product } from "@/types/product";

interface Props {
    open: boolean;
    onClose: () => void;
    initialData?: Product;
    onSubmit: (data: any) => void;
}

export const ProductModal = ({
    open,
    onClose,
    initialData,
    onSubmit,
}: Props) => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState("");

    useEffect(() => {
        if (!open) return;
        setTitle(initialData?.title || "");
        setPrice(initialData?.price || 0);
        setCategory(initialData?.category || "");
    }, [open, initialData]);

    return (
        <Dialog
            open={open}
            onOpenChange={(nextOpen) => {
                if (!nextOpen) onClose();
            }}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {initialData ? "Edit Product" : "Add Product"}
                    </DialogTitle>
                </DialogHeader>

                <Input
                    placeholder="Product title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <Input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                />

                <Input
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />

                <Button
                    onClick={() =>
                        onSubmit({
                            title,
                            price,
                            category: category || "misc",
                            description: "Dummy product",
                            thumbnail: "",
                        })
                    }
                >
                    Save
                </Button>
            </DialogContent>
        </Dialog>
    );
};
