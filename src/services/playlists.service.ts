import {
    SimplifiedSpotifyPlaylist,
    SpotifyExternalUrls,
    SpotifyFollowers,
    SpotifyImage,
    SpotifyPlaylistOwner,
    SpotifyPlaylistTrack,
} from "@/models/spotify.models"

const usersEndpoint: string = "https://api.spotify.com/v1/users/"
const playlistsEndpoint: string = "https://api.spotify.com/v1/me/playlists"

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
    items: SimplifiedSpotifyPlaylist[]
}

const createResponse = async (response: Response) => {
    switch (response.status) {
        case 200:
            return await response.json()
        case 201:
            return await response.json()
        case 400:
            throw new Error("Bad request")
        case 401:
            throw new Error("Bad or expired token")
        case 403:
            throw new Error("User does not have permission to create playlist")
        case 429:
            throw new Error("Too many requests")
        default:
            throw new Error("Unknown error")
    }
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
}
