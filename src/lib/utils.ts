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

export const createResponse = async (response: Response) => {
    switch (response.status) {
        case 200:
            return await response.json()
        case 201:
            return await response.json()
        case 400:
            throw new Error("Bad request")
        case 401:
            // Redirect to dashboard to start token refresh flow
            window.location.href = "/dashboard"
            break
        case 403:
            throw new Error("User does not have permission to create playlist")
        case 429:
            throw new Error("Too many requests")
        default:
            throw new Error("Unknown error")
    }
}

export const createBase64Image = (file: File) => {
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader()

        reader.onload = () => {
            resolve(reader.result as string)
        }

        reader.onerror = (error) => {
            reject(error)
        }

        reader.readAsDataURL(file)
    })
}
