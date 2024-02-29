import { FunctionComponent, useEffect, useMemo, useRef, useState } from "react"
import { useSession } from "next-auth/react"
// import { Search } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu"
// import { Input } from "@/components/ui/input"
import { usePlaylistsForAdding } from "@/hooks/playlists.hook"
import { Button } from "@/components/ui/button"
// import { CreatePlaylistButton } from "@/components/CreatePlaylistButton"
import { Skeleton } from "@/components/ui/skeleton"
// import { MessageComponent } from "@/components/MessageComponent"
import { PlaylistsService } from "@/services/playlists.service"

interface AddToPlaylistProps {
    uri: string
    name: string
}

export const AddToPlaylist: FunctionComponent<AddToPlaylistProps> = ({ uri, name }) => {
    const { data: session } = useSession()
    const { hasNextPage, fetchNextPage, isLoading, isError, playlists } = usePlaylistsForAdding(
        session?.user.access_token
    )
    const [loading, setLoading] = useState(false)
    // const [filteredList, setFilteredList] = useState<SpotifyPlaylist[]>([])

    const { toast } = useToast()
    const addToPlaylist = async (id: string, playlist: string) => {
        const response = await PlaylistsService.AddToPlaylist({
            id: id,
            uri: uri,
            token: session?.user.access_token,
        })

        if (response.snapshot_id) {
            toast({
                description: `${name} is added to ${playlist}`,
            })
        } else {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request. Try it again.",
            })
        }
    }

    const getNextResults = async () => {
        setLoading(true)

        await fetchNextPage()

        setLoading(false)
    }

    // const filterByQuery = (value: string) => {
    //     setFilteredList(playlists.filter((playlist) => playlist.name.toLowerCase().includes(value.toLowerCase())))
    // }

    return (
        <>
            {/* TODO: Find a way to fix the search function */}
            {/* <div
                onKeyDown={(e) => e.stopPropagation()}
                className="relative flex w-full items-center space-x-2 rounded border border-neutral-400 bg-neutral-800 px-2"
            >
                <Search className="mr-1 text-neutral-400" />
                <Input
                    type="text"
                    className="focus-visible:ring-outline-0 border-none pl-0 focus-visible:border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    placeholder="Find a playlist"
                    onChange={(e) => filterByQuery(e.target.value)}
                />
            </div> */}
            {/* <DropdownMenuSeparator /> */}
            <div className="h-56 w-56 overflow-scroll">
                {isLoading && (
                    <div className="my-2 space-y-4 text-center">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <Skeleton
                                key={`skeleton-${i}`}
                                className="h-3 w-[212px] text-center"
                            />
                        ))}
                    </div>
                )}
                {isError && <p className="my-4 text-center text-xs">No results found</p>}
                {playlists &&
                    playlists.map((playlist) => (
                        <DropdownMenuItem
                            key={playlist.id}
                            className="mb-1 cursor-pointer"
                            onSelect={() => addToPlaylist(playlist.id, playlist.name)}
                        >
                            {playlist.name}
                        </DropdownMenuItem>
                    ))}
                {playlists.length === 0 && <p className="my-4 text-center text-xs">No results found</p>}
                {hasNextPage && (
                    <div className="text-center">
                        {hasNextPage}
                        <Button
                            variant="outline"
                            size="sm"
                            className="mb-2"
                            disabled={loading}
                            onClick={getNextResults}
                        >
                            Load more
                        </Button>
                    </div>
                )}
            </div>
        </>
    )
}
