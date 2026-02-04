import type { User } from "@/types/user";
import UserFormDialog from "./UserFormDialog";

interface Props {
    user: User;
    onEdit: (user: User) => void;
}

export default function UserCard({ user, onEdit }: Props) {
    return (
        <div className="p-4 border rounded-lg space-y-2">
            <div>
                <h3 className="font-semibold">{user.name}</h3>
                <p className="text-sm text-gray-600">{user.email}</p>
                <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                    {user.role}
                </span>
            </div>

            <UserFormDialog
                triggerLabel="Edit"
                user={user}
                onSave={onEdit}
            />
        </div>
    );
}
