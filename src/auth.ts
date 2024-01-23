import NextAuth from "next-auth"
import authConfig from "./auth.config"

// TODO: Implement refresh token
// const refreshAccessToken = async (token: any) => {
//     try {
//         spotifyApi.setAccessToken(token.accessToken)
//         spotifyApi.setRefreshToken(token.refreshToken)

//         const { body: refreshedToken } = await spotifyApi.refreshAccessToken()
//         return {
//             ...token,
//             accessToken: refreshedToken.access_token,
//             accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000,
//             refreshToken: refreshedToken.refresh_token ?? token.refreshToken
//         }
//     } catch (error) {
//         console.error(error)
//         return {
//             ...token,
//             error: "refresh token error"
//         }
//     }
// }

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    callbacks: {
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.username
                session.accessToken = token.accessToken
                session.refreshToken = token.refreshToken

                return session
            }

            return session
        },
        async jwt({ token, account, user }) {
            if (account && user) {
                return {
                    ...token,
                    accessToken: account.access_token,
                    refreshToken: account.refresh_token,
                    username: account.providerAccountId,
                    accessTokenExpires: account.expires_at ?? 0 * 1000,
                }
            }

            // if (Date.now() < token.accessTokenExpires) {
            //     return token
            // }

            // return await refreshAccessToken(token)

            return token
        },
    },
    session: { strategy: "jwt" },
    ...authConfig,
})
