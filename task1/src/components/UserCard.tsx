import type { User } from "@/types/user";
import UserFormDialog from "./UserFormDialog";
import { Pencil } from "lucide-react";

interface Props {
    user: User;
    onEdit: (user: User) => void;
}

export default function UserCard({ user, onEdit }: Props) {
    return (
        <div className="relative p-4 border rounded-lg space-y-2">
            <div className="absolute top-11 right-5">
                <UserFormDialog
                    triggerLabel=""
                    user={user}
                    onSave={onEdit}
                    trigger={
                        <button className="text-gray-500 hover:text-black">
                            <Pencil size={16} />
                        </button>
                    }
                />
            </div>

            {/* User Info */}
            <div>
                <h3 className="font-semibold">{user.name}</h3>
                <p className="text-sm text-gray-600">{user.email}</p>
                <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                    {user.role}
                </span>
            </div>
        </div>
    );
}
