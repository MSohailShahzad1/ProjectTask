"use client";

import { useState } from "react";
import type { User } from "@/types/user";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
    onAdd: (user: User) => void;
}

export default function AddUserModal({ onAdd }: Props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [open, setOpen] = useState(false);

    const handleSubmit = () => {
        onAdd({
            id: Date.now(),
            name,
            email,
            role
        });

        // reset + close
        setName("");
        setEmail("");
        setRole("");
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Add User</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Add New User</DialogTitle>
                </DialogHeader>

                <div className="space-y-3">
                    <Input
                        placeholder="Name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <Input
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Input
                        placeholder="Role"
                        value={role}
                        onChange={e => setRole(e.target.value)}
                    />

                    <div className="flex justify-end gap-2 pt-2">
                        <Button
                            variant="outline"
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit}>
                            Save
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
