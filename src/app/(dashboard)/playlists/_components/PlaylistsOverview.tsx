import { SimplifiedSpotifyPlaylist } from "@/models/spotify.models"
import { FunctionComponent } from "react"

type PlaylistsOverviewProps = {
    items: SimplifiedSpotifyPlaylist[]
}

export const PlaylistsOverview: FunctionComponent<PlaylistsOverviewProps> = ({ items }) => {
    return items.map((item) => {
        return <div key={item.id}>{item.name}</div>
    })
}
