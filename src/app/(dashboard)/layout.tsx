"use client"

import { useEffect } from "react"
import { useSession } from "next-auth/react"
import { redirectToSpotifyLogin } from "@/lib/utils"
import { SidebarComponent } from "@/components/SidebarComponent"

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const { data } = useSession()

    useEffect(() => {
        redirectToSpotifyLogin(data?.user.error)
    }, [data])

    return (
        <main className="flex gap-4">
            <SidebarComponent />
            <section className="w-4/5">{children}</section>
        </main>
    )
}
