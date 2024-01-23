import Spotify from "next-auth/providers/spotify"

import type { NextAuthConfig } from "next-auth"

export default {
    providers: [
        Spotify({
            clientId: process.env.SPOTIFY_CLIENT_ID,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        }),
    ],
} satisfies NextAuthConfig
