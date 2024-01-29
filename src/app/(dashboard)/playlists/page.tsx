"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { usePlaylists } from "@/hooks/playlists.hook"
import { Button } from "@/components/ui/button"
import { PlaylistsOverview } from "./_components/PlaylistsOverview"
import { Spinner } from "@/components/ui/spinner"

const Playlists = () => {
    const { data: session } = useSession()
    const { hasNextPage, fetchNextPage, isLoading, isError, playlists } = usePlaylists(session?.user.access_token)
    const [loading, setLoading] = useState(false)

    const getNextResults = async () => {
        setLoading(true)

        await fetchNextPage()

        setLoading(false)
    }

    return (
        <div>
            <h1 className="mb-6 mt-1 text-2xl font-normal text-neutral-300">Playlists</h1>
            {isLoading && (
                <div className="mt-16 flex items-center justify-center">
                    <Spinner />
                </div>
            )}
            {isError && <div>error</div>}
            {playlists && (
                <PlaylistsOverview items={playlists}>
                    {hasNextPage && (
                        <Button
                            variant="navigation"
                            disabled={loading}
                            onClick={getNextResults}
                        >
                            Load more
                        </Button>
                    )}
                </PlaylistsOverview>
            )}
        </div>
    )
}

export default Playlists
