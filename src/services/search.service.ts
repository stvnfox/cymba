import { createResponse } from "@/lib/utils"
import {
    SpotifyAlbums,
    SpotifyArtists,
    SpotifyAudiobooks,
    SpotifyEpisodes,
    SpotifyPlaylists,
    SpotifyShows,
    SpotifyTracks,
} from "@/models/spotify.search.models"

const searchEndpoint: string = "https://api.spotify.com/v1/search"

export interface SearchParams {
    query: string
    token: string | undefined
    type: string
    limit: number
}

interface SearchResponse {
    tracks: SpotifyTracks
    artists: SpotifyArtists
    albums: SpotifyAlbums
    playlists: SpotifyPlaylists
    shows: SpotifyShows
    episodes: SpotifyEpisodes
    audiobooks: SpotifyAudiobooks
}

export const SearchService = {
    GetByQuery: async (params: SearchParams): Promise<SearchResponse | undefined> => {
        if (!params.token) return

        const response = await fetch(`${searchEndpoint}?q=${params.query}&type=${params.type}&limit=${params.limit}`, {
            headers: {
                Authorization: `Bearer ${params.token}`,
            },
        })

        return createResponse(response)
    },
}
