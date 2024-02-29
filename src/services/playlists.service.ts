import { createResponse } from "@/lib/utils"
import {
    SpotifyExternalUrls,
    SpotifyFollowers,
    SpotifyImage,
    SpotifyPlaylist,
    SpotifyPlaylistOwner,
} from "@/models/spotify.base.models"
import { SpotifyPlaylistTrack } from "@/models/spotify.playlist.models"

const usersEndpoint: string = "https://api.spotify.com/v1/users/"
const playlistsEndpoint: string = "https://api.spotify.com/v1/me/playlists"
const addEndpoint: string = "https://api.spotify.com/v1/playlists/"

interface CreatePlaylistParams {
    token: string | undefined
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

interface GetAllPlaylistsParams {
    limit: number
    offset: number
    token: string | undefined
}

interface GetAllPlaylistsResponse {
    href: string
    limit: number
    next: string | null
    offset: number
    previous: string | null
    total: number
    items: SpotifyPlaylist[]
}

interface AddToPlaylistParams {
    id: string
    uri: string
    token: string | undefined
}

interface AddToPlaylistResponse {
    snapshot_id: string
}

export const PlaylistsService = {
    CreatePlaylist: async (params: CreatePlaylistParams): Promise<CreatePlaylistResponse> => {
        const endpoint = usersEndpoint + params.userId + "/playlists"

        const response = await fetch(endpoint, {
            method: "POST",
            headers: { Authorization: "Bearer " + params.token },
            body: JSON.stringify({ name: params.name, description: params.description }),
        })

        return createResponse(response)
    },
    GetAllPlaylists: async (params: GetAllPlaylistsParams): Promise<GetAllPlaylistsResponse> => {
        const url = `${playlistsEndpoint}?limit=${params.limit}&offset=${params.offset}`

        if (params.token) {
            const response = await fetch(url, {
                method: "GET",
                headers: { Authorization: "Bearer " + params.token },
            })

            return createResponse(response)
        }

        return {} as GetAllPlaylistsResponse
    },
    AddToPlaylist: async (params: AddToPlaylistParams): Promise<AddToPlaylistResponse> => {
        const url = addEndpoint + params.id + "/tracks"

        if (params.token) {
            const response = await fetch(url, {
                method: "POST",
                headers: { Authorization: "Bearer " + params.token },
                body: JSON.stringify({ uris: [params.uri], position: 0 }),
            })

            return createResponse(response)
        }

        return {} as AddToPlaylistResponse
    },
}
