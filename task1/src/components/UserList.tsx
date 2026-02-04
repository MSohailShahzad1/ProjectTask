"use client";

import { useDeferredValue, useState } from "react";
import type { User } from "@/types/user";
import UserCard from "./UserCard";

interface Props {
    users: User[];
    onEdit: (user: User) => void;
}

export default function UserList({ users, onEdit }: Props) {
    const [search, setSearch] = useState("");
    const deferredSearch = useDeferredValue(search);

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(deferredSearch.toLowerCase())
    );

    return (
        <div className="space-y-4">
            <input
                className="border p-2 rounded w-full"
                placeholder="Search users..."
                value={search}
                onChange={e => setSearch(e.target.value)}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredUsers.map(user => (
                    <UserCard
                        key={user.id}
                        user={user}
                        onEdit={onEdit}
                    />
                ))}
            </div>
        </div>
    );
}
