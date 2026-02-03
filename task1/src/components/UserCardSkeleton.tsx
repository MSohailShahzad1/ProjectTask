import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"

function UserCardSkeleton() {
    return (
        <Card className="flex items-center gap-4 p-4">
            <Skeleton className="w-16 h-16 rounded-full" />

            <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-3 w-3/4" />
            </div>
        </Card>
    )
}

export default UserCardSkeleton
