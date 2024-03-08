import { FunctionComponent } from "react"
import { useSession } from "next-auth/react"
import { useSearch } from "@/hooks/search.hooks"
import { Group } from "./Group"
import { Spinner } from "@/components/ui/spinner"

type SearchResultsProps = {
    query: string
}

export const SearchResults: FunctionComponent<SearchResultsProps> = ({ query }) => {
    const { data: session } = useSession()
    const { data, isLoading } = useSearch({
        query: query,
        token: session?.user.access_token,
        type: "album,artist,track",
        limit: 10,
    })

    const albums = data?.albums.items.filter((album) => album.name.toLowerCase() !== query) || []
    const artists = data?.artists.items || []
    const tracks = data?.tracks.items.filter((track) => track.name.toLowerCase() !== query) || []

    return (
        <div className="text-neutral-200">
            {isLoading && <Spinner />}
            {!isLoading && (
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
        </div>
    )
}
