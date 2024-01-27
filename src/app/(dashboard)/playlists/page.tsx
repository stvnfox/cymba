"use client"

import { useSession } from "next-auth/react"
import { useQuery } from "@tanstack/react-query"
import { PlaylistsService } from "@/services/playlists.service"
import { PlaylistsOverview } from "./_components/PlaylistsOverview"
import { Spinner } from "@/components/ui/spinner"

const Playlists = () => {
    const { data: session } = useSession()

    const getAllPlaylists = async () => {
        const { items } = await PlaylistsService.GetAllPlaylists({
            limit: 10,
            offset: 0,
            token: session?.user.access_token,
        })

        if (!items) return []

        return items
    }

    const { data: playlists, isLoading } = useQuery({
        queryFn: () => getAllPlaylists(),
        queryKey: ["playlists"],
        enabled: !!session?.user.access_token,
    })

    return (
        <>
            <h1>Playlists</h1>
            {isLoading && <Spinner />}
            {/* TODO: Add error state + pagination */}
            {playlists && <PlaylistsOverview items={playlists} />}
        </>
    )
}

export default Playlists
