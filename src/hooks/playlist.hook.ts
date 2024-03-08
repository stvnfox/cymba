import { GetPlaylistByIdParams, PlaylistsService } from "@/services/playlists.service"
import { useQuery } from "@tanstack/react-query"

const getPlaylistById = async (params: GetPlaylistByIdParams) => {
    const response = await PlaylistsService.GetPlaylistById({
        id: params.id,
        token: params.token,
    })

    return response
}

export const usePlaylist = (params: GetPlaylistByIdParams) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["playlist"],
        queryFn: () => getPlaylistById({ token: params.token, id: params.id }),
        enabled: !!params.token,
    })

    return {
        data,
        isLoading,
        isError,
    }
}
