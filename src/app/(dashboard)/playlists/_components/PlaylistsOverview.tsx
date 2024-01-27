import { SimplifiedSpotifyPlaylist } from "@/models/spotify.models"
import { FunctionComponent } from "react"

type PlaylistsOverviewProps = {
    items: SimplifiedSpotifyPlaylist[]
}

export const PlaylistsOverview: FunctionComponent<PlaylistsOverviewProps> = ({ items }) => {
    if (!items.length) return <div>No playlists found</div>

    return items.map((item) => {
        return <div key={item.id}>{item.name}</div>
    })
}
