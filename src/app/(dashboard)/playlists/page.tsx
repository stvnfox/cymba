"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { SimplifiedSpotifyPlaylist } from "@/models/spotify.models"
import { PlaylistsService } from "@/services/playlists.service"
import { PlaylistsOverview } from "./_components/PlaylistsOverview"

const Playlists = () => {
    const { data } = useSession()
    const [playlists, setPlaylists] = useState<SimplifiedSpotifyPlaylist[] | null>(null)

    useEffect(() => {
        const getPlaylists = async () => {
            const response = await PlaylistsService.GetAllPlaylists({
                limit: 10,
                offset: 0,
                token: data?.user.access_token,
            })

            setPlaylists(response.items)
        }

        getPlaylists()
    }, [data?.user.access_token])

    return (
        <>
            <h1>Playlists</h1>
            {playlists && <PlaylistsOverview items={playlists} />}
        </>
    )
}

export default Playlists
