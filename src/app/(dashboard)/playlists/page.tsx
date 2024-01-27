"use client"

import { useSession } from "next-auth/react"
import { PlaylistsService } from "@/services/playlists.service"
import { PlaylistsOverview } from "./_components/PlaylistsOverview"
import { useQuery } from "@tanstack/react-query"
import { Spinner } from "@/components/ui/spinner"

const Playlists = () => {
    const session = useSession()

    const getAllPlaylists = async () => {
        const { items } = await PlaylistsService.GetAllPlaylists({
            limit: 10,
            offset: 0,
            token: session.data?.user.access_token,
        })

        if (items) return items

        return []
    }
    const { data: playlists, isLoading } = useQuery({
        queryFn: () => getAllPlaylists(),
        queryKey: ["playlists"],
    })

    return (
        <>
            <h1>Playlists</h1>
            {isLoading && <Spinner />}
            {playlists && <PlaylistsOverview items={playlists} />}
        </>
    )
}

export default Playlists
