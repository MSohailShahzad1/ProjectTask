import { useEffect, useState } from "react"
import type { User, RandomUserApiResponse } from "../types/randomUser"
import UserCard from "../components/userCard"
import UserCardSkeleton from "../components/UserCardSkeleton"

function UserList() {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetch("https://randomuser.me/api/?results=10")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch users")
                }
                return response.json()
            })
            .then((data: RandomUserApiResponse) => {
                setUsers(data.results)
                setLoading(false)
            })
            .catch(err => {
                setError(err.message)
                setLoading(false)
            })
    }, [])

    if (loading) {
        return (
            <div className="grid gap-4 sm:grid-cols-2">
                {Array.from({ length: 6 }).map((_, index) => (
                    <UserCardSkeleton key={index} />
                ))}
            </div>
        )
    }

    if (error) {
        return <p className="text-center text-red-500">{error}</p>
    }

    return (
        <div className="grid gap-4 sm:grid-cols-2">
            {users.map(user => (
                <UserCard key={user.login.uuid} user={user} />
            ))}
        </div>
    )
}

export default UserList
