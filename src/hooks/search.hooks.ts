import { SearchParams, SearchService } from "@/services/search.service"
import { useQuery } from "@tanstack/react-query"

export const useSearch = (params: SearchParams) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["search", params.query],
        queryFn: () =>
            SearchService.GetByQuery({
                query: params.query,
                token: params.token,
                type: params.type,
                limit: params.limit,
            }),
        enabled: !!params.token && !!params.query,
    })

    return {
        data,
        isLoading,
        isError,
    }
}
