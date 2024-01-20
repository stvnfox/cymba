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
    const { setToken, setUser } = useDashboardContext()

    useMemo(() => {
        if (didRunOnce.current === false) {
            didRunOnce.current = true

            const getUserData = async (token: string) => {
                const response = await SpotifyService.GetUserData(token)

                setUser(response)
            }

            const getAndSetTokenData = async () => {
                const code = searchParams.get("code")

                if (code) {
                    const response: TokenResponse = await SpotifyService.GetToken(code)

                    const { access_token, refresh_token, expires_in } = response
                    const now = new Date()
                    const expires = new Date(now.getTime() + expires_in * 1000).toString()

                    // Set token data in local storage
                    setStorageItem("access_token", access_token)
                    setStorageItem("refresh_token", refresh_token)
                    setStorageItem("expires_in", expires_in.toString())
                    setStorageItem("expires", expires)

                    setToken(access_token)
                    getUserData(access_token)

                    // Redirect to dashboard to remove code from url
                    router.push("/dashboard")
                }
            }

            getAndSetTokenData()
        }
    }, [router, searchParams, setToken, setUser])

    return (
        <>
            <h1>Dashboard</h1>
        </>
    )
}

export default Dashboard
