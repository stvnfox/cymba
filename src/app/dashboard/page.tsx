"use client"

import { useEffect } from "react"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { signIn, useSession } from "next-auth/react"

const Dashboard = () => {
    const { data } = useSession()

    useEffect(() => {
        if (data?.user.error === "RefreshAccessTokenError") {
            signIn("spotify", { callbackUrl: DEFAULT_LOGIN_REDIRECT }, process.env.NEXT_PUBLIC_SPOTIFY_SCOPE) // Force sign in to hopefully resolve error
        }
    }, [data])

    return (
        <>
            <h1>Dashboard</h1>
            <pre>{JSON.stringify(data)}</pre>
        </>
    )
}

export default Dashboard
