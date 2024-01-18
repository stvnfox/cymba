import { useMemo, useState } from "react"
import { SpotifyUser } from "@/models/spotify.models"
import { SpotifyService } from "@/services/spotify.service"
import { useToken } from "@/hooks/useToken.hooks"

export const UserComponent = () => {
    const token = useToken()
    const [user, setUser] = useState<SpotifyUser | null>(null)

    useMemo(() => {
        const setUserData = async () => {
            const response = await SpotifyService.GetUserData(token)
    
            setUser(response)
        }
    
        setUserData()
    }, [token])

    return (
        <div>
            <h1>User Component</h1>
            <p>{user?.display_name}</p>
        </div>
    )
}