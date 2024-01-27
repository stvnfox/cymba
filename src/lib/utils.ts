import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { type ClassValue, clsx } from "clsx"
import { signIn } from "next-auth/react"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const redirectToSpotifyLogin = (error: string | undefined) => {
    if (error === "RefreshAccessTokenError") {
        signIn("spotify", { callbackUrl: DEFAULT_LOGIN_REDIRECT }, process.env.NEXT_PUBLIC_SPOTIFY_SCOPE) // Force sign in to hopefully resolve error
    }
}
