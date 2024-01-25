import { useDashboardContext } from "@/context/dashboard.context"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { useSession, signIn } from "next-auth/react"
import { useEffect } from "react"

const Profile = () => {
    // const { user } = useDashboardContext()
    const { data } = useSession()

    useEffect(() => {
        if (data?.user.error === "RefreshAccessTokenError") {
            signIn("spotify", { callbackUrl: DEFAULT_LOGIN_REDIRECT }, process.env.NEXT_PUBLIC_SPOTIFY_SCOPE) // Force sign in to hopefully resolve error
        }
    }, [data])

    return (
        <>
            <h1>Profile</h1>
            {/* <p>{user?.display_name}</p>
            <p>{user?.email}</p> */}
        </>
    )
}

export default Profile
