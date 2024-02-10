import { FunctionComponent, useState } from "react"
import { useSession } from "next-auth/react"
import { useDebounce } from "@uidotdev/usehooks"
import { CommandInput, CommandList } from "@/components/ui/command"
import { useSearch } from "@/hooks/search.hooks"
import { Spinner } from "../ui/spinner"
import { Group } from "./components/Group"

export const CommandDialogContent: FunctionComponent = () => {
    const { data: session } = useSession()
    const [query, setQuery] = useState("")
    const debouncedQuery = useDebounce(query, 300)

    const { data, isLoading } = useSearch({
        query: debouncedQuery,
        token: session?.user.access_token,
        type: "album,artist,track",
        limit: 10,
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formattedValue = e.target.value.toLowerCase()

        setQuery(formattedValue)
    }

    const albums = data?.albums.items.filter((album) => album.name.toLowerCase() !== debouncedQuery) || []

    const artists = data?.artists.items.filter((artist) => artist.name.toLowerCase() !== debouncedQuery) || []

    const tracks = data?.tracks.items.filter((track) => track.name.toLowerCase() !== debouncedQuery) || []

    return (
        <>
            <CommandInput
                placeholder="Type a command or search..."
                onChangeCapture={handleInputChange}
            />
            <CommandList className="p-3 text-center">
                {isLoading && <Spinner />}
                {!debouncedQuery && (
                    <>
                        <Group
                            title="Recommended artists"
                            list={artists}
                        />
                        <Group
                            title="Recomended albums"
                            list={albums}
                        />
                        <Group
                            title="Recommended tracks"
                            list={tracks}
                        />
                    </>
                )}
                {debouncedQuery && !isLoading && (
                    <>
                        <Group
                            title="Artists"
                            list={artists}
                        />
                        <Group
                            title="Albums"
                            list={albums}
                        />
                        <Group
                            title="Tracks"
                            list={tracks}
                        />
                    </>
                )}
            </CommandList>
        </>
    )
}
