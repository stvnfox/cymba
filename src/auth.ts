import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { JWT } from "next-auth/jwt"

const refreshAccessToken = async (token: JWT) => {
    try {
        const response = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                grant_type: "refresh_token",
                refresh_token: token.refresh_token as string,
                client_id: process.env.SPOTIFY_CLIENT_ID as string,
            }),
        })

        const tokens = await response.json()

        if (!response.ok) throw tokens

        return {
            ...token,
            access_token: tokens.access_token,
            expires_at: Math.floor(Date.now() / 1000 + tokens.expires_in),
            refresh_token: tokens.refresh_token ?? token.refresh_token,
        }
    } catch (error) {
        console.error("Error refreshing access token", error)
        // The error property will be used client-side to handle the refresh token error
        return { ...token, error: "RefreshAccessTokenError" as const }
    }
}

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    callbacks: {
        async jwt({ token, account }) {
            if (account) {
                return {
                    access_token: account.access_token,
                    refresh_token: account.refresh_token,
                    username: account.providerAccountId,
                    expires_at: account.expires_in ? Math.floor(Date.now() / 1000 + account.expires_in) : null,
                }
            } else if (Date.now() < (token.expires_at as number) * 1000) {
                return token
            } else {
                return refreshAccessToken(token)
            }
        },
        // Token type is not correct in this beta version of next-auth so thats why we need ts-expect-error
        // @ts-expect-error
        async session({ session, token }) {
            if (session.user) {
                return {
                    ...session,
                    user: {
                        ...session.user,
                        id: token.username,
                        access_token: token.access_token,
                        refresh_token: token.refresh_token,
                    },
                }
            }

            return session
        },
    },
    session: { strategy: "jwt" },
    ...authConfig,
})
