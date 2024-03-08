import { FunctionComponent } from "react"
import { useSession } from "next-auth/react"
import { Group } from "./Group"
import { useRecommendations } from "@/hooks/recommendations.hook"

export const Recommended: FunctionComponent = () => {
    const { data: session } = useSession()
    const { data, isLoading } = useRecommendations({
        token: session?.user.access_token,
        limit: 10,
    })

    const artists = data?.artists?.items || []
    const tracks = data?.tracks?.items || []

    return (
        <>
            <Group
                title="Recommended artists"
                list={artists}
            />
            <Group
                title="Recommended tracks"
                list={tracks}
            />
        </>
    )
}
