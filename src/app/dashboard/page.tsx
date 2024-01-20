"use client"

import { useMemo, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { setStorageItem } from "@/lib/storage"
import { TokenResponse } from "@/models/auth.models"
import { SpotifyService } from "@/services/spotify.service"
import { useDashboardContext } from "@/context/dashboard.context"

const Dashboard = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const didRunOnce = useRef(false)
    const { expires, setExpires, setRefreshToken, setToken, setUserId } = useDashboardContext()

    useMemo(() => {
        if (didRunOnce.current === false) {
            didRunOnce.current = true

            const getUserId = async (token: string) => {
                const response = await SpotifyService.GetUserData(token)

                // Set user id in local storage
                setStorageItem("userId", response.id)

                // Set user id in context
                setUserId(response)
            }

            const getAndSetTokenData = async () => {
                const code = searchParams.get("code")

                if (code) {
                    const response: TokenResponse = await SpotifyService.GetToken(code)

                    const { access_token, refresh_token, expires_in } = response
                    const now = new Date()
                    const expires = new Date(now.getTime() + expires_in * 1000).toISOString()

                    // Set token data in local storage
                    setStorageItem("access_token", access_token)
                    setStorageItem("refresh_token", refresh_token)
                    setStorageItem("expires_in", expires_in.toString())
                    setStorageItem("expires", expires)

                    // Set token data in context
                    setToken(access_token)
                    setRefreshToken(refresh_token)
                    setExpires(expires)
                    getUserId(access_token)

                    // Redirect to dashboard to remove code from url
                    router.push("/dashboard")
                }
            }

            getAndSetTokenData()
        }
    }, [router, searchParams, setToken, setUserId, setRefreshToken, setExpires])

    return (
        <>
            <h1>Dashboard</h1>
            {expires}
        </>
    )
}

export default Dashboard
