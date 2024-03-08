import { createResponse } from "@/lib/utils"
import { SpotifyArtist, SpotifyResponseBase, SpotifyTrack } from "@/models/spotify.base.models"

const recommendationsEndpoint: string = "https://api.spotify.com/v1/me/top/"

export interface RecommendationsParams {
    token: string | undefined
    limit: number
}

interface TrackRecommendationsResponse extends SpotifyResponseBase {
    items: SpotifyTrack[]
}

interface ArtistRecommendationsResponse extends SpotifyResponseBase {
    items: SpotifyArtist[]
}

export const RecommendationsService = {
    GetRecommendendTracks: async (params: RecommendationsParams): Promise<TrackRecommendationsResponse | undefined> => {
        if (!params.token) return

        const response = await fetch(`${recommendationsEndpoint}tracks?limit=${params.limit}`, {
            headers: {
                Authorization: `Bearer ${params.token}`,
            },
        })

        return createResponse(response)
    },

    GetRecommendendArtists: async (
        params: RecommendationsParams
    ): Promise<ArtistRecommendationsResponse | undefined> => {
        if (!params.token) return

        const response = await fetch(`${recommendationsEndpoint}artists?limit=${params.limit}`, {
            headers: {
                Authorization: `Bearer ${params.token}`,
            },
        })

        return createResponse(response)
    },
}
