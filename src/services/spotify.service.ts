import { getStorageItem } from "@/lib/storage"

const tokenEndpoint: string = "https://accounts.spotify.com/api/token"
const userEndpoint: string = "https://api.spotify.com/v1/me"
const usersPlaylistsEndpoint: string = "https://api.spotify.com/v1/users/"

interface CreatePlaylistParams {
    token: string | null
    userId: string | undefined
    name: string
    description: string
}

export const SpotifyService = {
    GetToken: async (code: string) => {
        const code_verifier = getStorageItem("code_verifier")

        const response = await fetch(tokenEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            // @ts-expect-error
            body: new URLSearchParams({
                client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
                grant_type: "authorization_code",
                code: code,
                redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URL,
                code_verifier: code_verifier,
            }),
        })

        return await response.json()
    },
    RefreshToken: async (token: string) => {
        const response = await fetch(tokenEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            // @ts-expect-error
            body: new URLSearchParams({
                client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
                grant_type: "refresh_token",
                refresh_token: token,
            }),
        })

        return await response.json()
    },
    GetUserData: async (token: string | null) => {
        if (!token) return

        const response = await fetch(userEndpoint, {
            method: "GET",
            headers: { Authorization: "Bearer " + token },
        })

        return await response.json()
    },
    CreatePlaylist: async (params: CreatePlaylistParams) => {
        const endpoint = usersPlaylistsEndpoint + params.userId + "/playlists"

        const response = await fetch(endpoint, {
            method: "POST",
            headers: { Authorization: "Bearer " + params.token },
            body: JSON.stringify({ name: params.name, description: params.description }),
        })

        return await response.json()
    },
}
