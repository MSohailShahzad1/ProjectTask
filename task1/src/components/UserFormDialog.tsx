import { useEffect, useState } from "react";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

interface Props {
    triggerLabel?: string;
    trigger?: React.ReactNode;
    user?: User;
    onSave: (user: User) => void;
}


const ROLES: User["role"][] = ["Admin", "User", "Editor"];

export default function UserFormDialog({
    triggerLabel,
    trigger,
    user,
    onSave
}: Props) {
    const [open, setOpen] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState<User["role"]>("User");

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
        }
    }, [user]);

    const handleSubmit = () => {
        onSave({
            id: user?.id ?? Date.now(),
            name,
            email,
            role
        });

        setOpen(false);
        setName("");
        setEmail("");
        setRole("User");
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger ? (
                    trigger
                ) : (
                    <Button>
                        {triggerLabel}
                    </Button>
                )}
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>
                        {user ? "Edit User" : "Add User"}
                    </DialogTitle>
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

                    <Select value={role} onValueChange={v => setRole(v as User["role"])}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                            {ROLES.map(r => (
                                <SelectItem key={r} value={r}>
                                    {r}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <div className="flex justify-end gap-2 pt-2">
                        <Button variant="outline" onClick={() => setOpen(false)}>
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
