import { FunctionComponent } from "react"
import Image from "next/image"
import Link from "next/link"
import { clsx } from "clsx"

import { SpotifyPlaylist } from "@/models/spotify.base.models"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type PlaylistOverviewItemProps = {
    item: SpotifyPlaylist
}

export const PlaylistOverviewItem: FunctionComponent<PlaylistOverviewItemProps> = ({ item }) => {
    return (
        <Card className="h-full">
            <Link
                href={`playlists/${item.id}`}
                aria-label={`Click here to see all details for the playlist: ${item.name}`}
            >
                <CardHeader>
                    <Image
                        src={item.images[0] ? item.images[0].url : "/images/default-playlist-image.svg"}
                        alt={item.name}
                        width={160}
                        height={160}
                        priority={true}
                        placeholder="blur"
                        blurDataURL="/images/default-playlist-image.svg"
                        className={clsx(
                            "aspect-square h-full w-full rounded-lg object-cover",
                            !item.images[0] && "bg-white"
                        )}
                    />
                </CardHeader>
                <CardContent>
                    <CardTitle className="line-clamp-1 text-ellipsis">{item.name}</CardTitle>
                    <CardDescription className="line-clamp-2 text-ellipsis">{item.description}</CardDescription>
                </CardContent>
            </Link>
        </Card>
    )
}
