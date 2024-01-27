"use client"

import { useEffect } from "react"
import { useSession } from "next-auth/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { redirectToSpotifyLogin } from "@/lib/utils"
import { SidebarComponent } from "@/components/SidebarComponent"

const queryProvider = new QueryClient()

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const { data } = useSession()

    useEffect(() => {
        if (data?.user.error) {
            redirectToSpotifyLogin(data.user.error)
        }
    }, [data?.user.error])

    return (
        <main className="flex gap-4">
            <QueryClientProvider client={queryProvider}>
                <SidebarComponent />
                <section className="w-4/5">{children}</section>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </main>
    )
}
