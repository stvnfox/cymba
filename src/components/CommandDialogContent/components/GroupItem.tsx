import { FunctionComponent, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Disc3, MoreVertical, Plus, Search } from "lucide-react"
import { SpotifyAlbum, SpotifyArtist, SpotifyTrack } from "@/models/spotify.base.models"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { AddToPlaylist } from "./AddToPlaylist"

const ItemType = {
    Track: "track",
    Album: "album",
    Artist: "artist",
} as const

interface GroupItemProps {
    item: SpotifyAlbum | SpotifyArtist | SpotifyTrack
}

export const GroupItem: FunctionComponent<GroupItemProps> = ({ item }) => {
    const router = useRouter()
    const [selectedItem, setSelectedItem] = useState<SpotifyAlbum | SpotifyArtist | SpotifyTrack | null>(null)

    const imageUrl = useMemo(() => {
        if (item.type === ItemType.Track) {
            return item.album.images[0] ? item.album.images[0].url : "/images/default-playlist-image.svg"
        }

        return item.images[0] ? item.images[0].url : "/images/default-playlist-image.svg"
    }, [item])

    const redirectText = (type: string) => {
        switch (type) {
            case ItemType.Track:
                return "album"
            case ItemType.Album:
                return "album"
            case ItemType.Artist:
                return "artist"
            default:
                return "item"
        }
    }

    const redirectTo = (item: SpotifyAlbum | SpotifyArtist | SpotifyTrack) => {
        switch (item.type) {
            case ItemType.Track:
                router.push(`/search/album/${item.album.id}`)
                break
            case ItemType.Album:
                router.push(`/search/album/${item.id}`)
                break
            case ItemType.Artist:
                router.push(`/search/artist/${item.id}`)
                break
            default:
                break
        }
    }

    const selectItem = (open: boolean, item: SpotifyAlbum | SpotifyArtist | SpotifyTrack) => {
        if (open) {
            setSelectedItem(item)
        } else {
            // Use a timeout to prevent showing the add to playlist option before the dropdown menu closes
            setTimeout(() => {
                setSelectedItem(null)
            }, 100)
        }
    }

    return (
        <DropdownMenu onOpenChange={(open: boolean) => selectItem(open, item)}>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="ghost"
                >
                    <Avatar className="rounded-md">
                        <AvatarImage
                            src={imageUrl}
                            alt=""
                            className="object-cover"
                            role="presentation"
                        />
                        <AvatarFallback />
                    </Avatar>
                    <span className="flex-grow">{item.name}</span>
                    <MoreVertical className="text-neutral-400 transition-colors duration-200 ease-in-out group-hover:text-neutral-200" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                alignOffset={20}
                sideOffset={-8}
                className="w-56"
            >
                <DropdownMenuGroup>
                    {selectedItem?.type !== ItemType.Artist && (
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                                <Plus className="mr-2 h-4 w-4" />
                                Add to playlist
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                                <DropdownMenuSubContent>
                                    <AddToPlaylist
                                        uri={item.uri}
                                        name={item.name}
                                    />
                                </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                        </DropdownMenuSub>
                    )}
                    <DropdownMenuItem
                        className="cursor-pointer"
                        onSelect={() => redirectTo(item)}
                    >
                        <Disc3 className="mr-2 h-4 w-4" />
                        Go to {redirectText(item.type)}
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
