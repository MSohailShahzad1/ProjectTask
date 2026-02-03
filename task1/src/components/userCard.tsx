import type { User } from "../types/randomUser"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

type UserCardProps = {
    user: User
}

function UserCard({ user }: UserCardProps) {
    return (
        <Card className="flex items-center gap-4 p-4">
            <img
                src={user.picture.large}
                alt={`${user.name.first} ${user.name.last}`}
                className="w-16 h-16 rounded-full"
            />

            <div>
                <CardHeader className="p-0">
                    <CardTitle className="text-base">
                        {user.name.first} {user.name.last}
                    </CardTitle>
                </CardHeader>

                <CardContent className="p-0">
                    <p className="text-sm text-muted-foreground">
                        {user.gender}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        {user.email}
                    </p>
                </CardContent>
            </div>
        </Card>
    )
}

export default UserCard
