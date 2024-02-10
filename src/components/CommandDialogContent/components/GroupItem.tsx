import { FunctionComponent, useMemo } from "react"
import { SpotifyAlbum, SpotifyArtist, SpotifyTrack } from "@/models/spotify.base.models"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const ItemType = {
    Track: "track",
    Album: "album",
    Artist: "artist",
} as const

interface GroupItemProps {
    item: SpotifyAlbum | SpotifyArtist | SpotifyTrack
}

export const GroupItem: FunctionComponent<GroupItemProps> = ({ item }) => {
    const imageUrl = useMemo(() => {
        if (item.type === ItemType.Track) {
            return item.album.images[0] ? item.album.images[0].url : "/images/default-playlist-image.svg"
        }

        return item.images[0] ? item.images[0].url : "/images/default-playlist-image.svg"
    }, [item])

    const openMenu = (item: SpotifyAlbum | SpotifyArtist | SpotifyTrack) => {
        console.log(item)
    }

    return (
        <button
            key={item.id}
            className="-mx-1.5 flex w-full items-center gap-3 rounded-md px-1.5 py-1.5 text-left text-sm text-neutral-200 transition-colors duration-200 ease-in-out hover:bg-neutral-600 focus:bg-neutral-700 focus:outline-none active:bg-transparent"
            onClick={() => openMenu(item)}
        >
            <Avatar className="rounded-md">
                <AvatarImage
                    src={imageUrl}
                    alt=""
                    role="presentation"
                />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            {item.name}
        </button>
    )
}
