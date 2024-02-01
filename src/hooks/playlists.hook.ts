import { useInfiniteQuery } from "@tanstack/react-query"
import { PlaylistsService } from "@/services/playlists.service"

let totalResults = 0
let perPage = 12
let playlistItemWidth = 208

const getPerPage = (width: number) => {
    const perRow = width / playlistItemWidth
    return Math.floor(perRow) * 3
}

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

export const usePlaylists = (token: string | undefined, element: HTMLElement | null) => {
    if (element) perPage = getPerPage(element.offsetWidth)

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
