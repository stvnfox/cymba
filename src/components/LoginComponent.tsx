"use client"

import { FunctionComponent } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpotify } from "@fortawesome/free-brands-svg-icons"
import { redirectToSpotifyAuth } from "../lib/auth"

export const LoginComponent: FunctionComponent = () => {
    return (
        <div className="w-[400px] rounded-lg bg-neutral-300 px-12 py-24 font-light shadow-2xl shadow-neutral-900">
            <h1 className="mb-12 text-2xl tracking-wide text-green-800">Cymba</h1>
            <p className="mb-12 tracking-wide text-green-950 lg:w-5/6">
                <b>Welcome back,</b> connect with your Spotify account to continue to Cymba.
            </p>
            <button
                className="flex items-center gap-3 rounded-lg bg-green-700 px-6 py-4 tracking-wide text-neutral-200 transition-colors hover:bg-green-800"
                onClick={redirectToSpotifyAuth}
            >
                <FontAwesomeIcon
                    icon={faSpotify}
                    className="h-8"
                />
                Login with Spotify
            </button>
        </div>
    )
}
