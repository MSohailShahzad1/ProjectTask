import type { User } from "../types/user";

interface Props {
    user: User;
}

export default function UserCard({ user }: Props) {
    return (
        <div className="p-4 border rounded-lg shadow-sm">
            <h3 className="font-semibold">{user.name}</h3>
            <p className="text-sm text-gray-600">{user.email}</p>
            <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                {user.role}
            </span>
        </div>
    );
}
