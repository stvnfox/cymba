"use client"

import { useParams } from "next/navigation"
import { useSession } from "next-auth/react"
import { usePlaylist } from "@/hooks/playlist.hook"
import { XCircle } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PlaylistMenu } from "./_components/PlaylistMenu"

const PlaylistDetailPage = () => {
    const params = useParams()
    const { data: session } = useSession()
    const { data, isLoading, isError } = usePlaylist({
        id: String(params.id),
        token: session?.user.access_token,
    })

    const imageUrl = data?.images[0].url ?? ""

    const deletePlaylist = () => {
        console.log(`delete playlist ${data?.id}`)
    }

    return (
        <>
            {data && !isLoading && (
                <>
                    <div className="mb-6 mt-1 flex items-center justify-between gap-4">
                        <Avatar className="h-24 w-24 rounded-md">
                            <AvatarImage
                                src={imageUrl}
                                alt=""
                                className="object-cover"
                                role="presentation"
                            />
                            <AvatarFallback>{data.name}</AvatarFallback>
                        </Avatar>
                        <div className="flex-grow">
                            <h1 className="text-2xl font-normal text-neutral-300">{data.name}</h1>
                            <p>{data.description}</p>
                        </div>
                        <PlaylistMenu playlist={data} />
                    </div>
                </>
            )}
        </>
    )
}

export default PlaylistDetailPage
