"use client"

import { useRef, useState } from "react"
import { useSession } from "next-auth/react"
import { usePlaylistsForPage } from "@/hooks/playlists.hook"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GridOverview } from "./_components/GridOverview"
import { Spinner } from "@/components/ui/spinner"

const Home = () => {
    const { data: session } = useSession()
    const playlistSection = useRef<HTMLDivElement | null>(null)
    const { hasNextPage, fetchNextPage, isLoading, isError, playlists } = usePlaylistsForPage(
        session?.user.access_token,
        playlistSection.current
    )
    const [loading, setLoading] = useState(false)

    const getNextResults = async () => {
        setLoading(true)

        await fetchNextPage()

        setLoading(false)
    }

    return (
        <div ref={playlistSection}>
            <Tabs defaultValue="table">
                <div className="mb-6 mt-1 flex items-center justify-between">
                    <h1 className="text-2xl font-normal text-neutral-300">Dashboard</h1>
                    <TabsList>
                        <TabsTrigger value="table">Table</TabsTrigger>
                        <TabsTrigger value="grid">Grid</TabsTrigger>
                    </TabsList>
                </div>
                <TabsContent value="table">Make changes to your account here.</TabsContent>
                <TabsContent value="grid">
                    {isLoading && (
                        <div className="mt-16 flex items-center justify-center">
                            <Spinner />
                        </div>
                    )}
                    {isError && <div>error</div>}
                    {playlists && (
                        <GridOverview items={playlists}>
                            {hasNextPage && (
                                <Button
                                    variant="navigation"
                                    disabled={loading}
                                    onClick={getNextResults}
                                >
                                    Load more
                                </Button>
                            )}
                        </GridOverview>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default Home
