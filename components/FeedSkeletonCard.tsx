import {Skeleton} from "@/components/ui/skeleton"

export function FeedSkeletonCard() {
    return (
        <div
            className="flex flex-col space-y-3 p-5 shadow bg-white dark:bg-dark-second dark:text-dark-txt mt-4 rounded-lg">
            <Skeleton className="h-[125px] w-auto rounded-xl"/>
            <div className="space-y-2">
                <Skeleton className="h-4 w-[90%]"/>
                <Skeleton className="h-4 w-[80%]"/>
                <Skeleton className="h-4 w-[40%]"/>
            </div>
        </div>
    )
}