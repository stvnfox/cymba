import { useInfiniteQuery } from "@tanstack/react-query"
import { PlaylistsService } from "@/services/playlists.service"

const perPage = 12
let totalResults = 0

const getAllPlaylists = async (page: number, token: string) => {
    const { items, total } = await PlaylistsService.GetAllPlaylists({
        limit: perPage,
        offset: perPage * page,
        token: token,
    })

    totalResults = total

    if (!items) return []

    return items
}

export const usePlaylists = (token: string | undefined) => {
    const { data, hasNextPage, fetchNextPage, isLoading, isError } = useInfiniteQuery({
        queryKey: ["playlists"],
        queryFn: ({ pageParam = 0 }) => getAllPlaylists(pageParam, token as string),
        initialPageParam: 0,
        enabled: !!token,
        getNextPageParam: (lastPage, allPages) => {
            return totalResults > lastPage.length * allPages.length ? allPages.length : null
        },
    })

    const playlists = data?.pages?.flat() ?? []

    return {
        data,
        hasNextPage,
        fetchNextPage,
        isLoading,
        isError,
        playlists,
    }
}
