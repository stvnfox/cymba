import { useQuery } from "@tanstack/react-query"
import { RecommendationsParams, RecommendationsService } from "@/services/recommendations.service"

const getRecommendations = async (params: RecommendationsParams) => {
    const artists = await RecommendationsService.GetRecommendendArtists(params)
    const tracks = await RecommendationsService.GetRecommendendTracks(params)

    return {
        artists,
        tracks,
    }
}

export const useRecommendations = (params: RecommendationsParams) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["recommendations", params.token, params.limit],
        queryFn: () => getRecommendations({ token: params.token, limit: params.limit }),
        enabled: !!params.token,
    })

    return {
        data,
        isLoading,
        isError,
    }
}
