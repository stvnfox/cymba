import {
    SpotifyExternalUrls,
    SpotifyFollowers,
    SpotifyImage,
    SpotifyPlaylistOwner,
    SpotifyPlaylistTrack,
} from "@/models/spotify.models"

const usersPlaylistsEndpoint: string = "https://api.spotify.com/v1/users/"

interface CreatePlaylistParams {
    token: string | null
    userId: string | undefined
    name: string
    description: string
}

interface CreatePlaylistResponse {
    collaborative: boolean
    description: string | null
    external_urls: SpotifyExternalUrls
    followers: SpotifyFollowers
    href: string
    id: string
    images: SpotifyImage[]
    name: string
    owner: SpotifyPlaylistOwner
    primary_color: string | null
    public: boolean
    snapshot_id: string
    tracks: SpotifyPlaylistTrack
    type: string
    uri: string
}

export const PlaylistsService = {
    CreatePlaylist: async (params: CreatePlaylistParams): Promise<CreatePlaylistResponse> => {
        const endpoint = usersPlaylistsEndpoint + params.userId + "/playlists"

        const response = await fetch(endpoint, {
            method: "POST",
            headers: { Authorization: "Bearer " + params.token },
            body: JSON.stringify({ name: params.name, description: params.description }),
        })

        return await response.json()
    },
}
