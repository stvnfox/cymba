import {
    SpotifyEpisode,
    SpotifyExternalUrls,
    SpotifyFollowers,
    SpotifyImage,
    SpotifyTrack,
} from "./spotify.base.models"

export interface SpotifyUser {
    county: string
    display_name: string
    email: string
    explicit_content: { filter_enabled: boolean; filter_locked: boolean }
    external_urls: SpotifyExternalUrls
    followers: SpotifyFollowers
    href: string
    id: string
    images: SpotifyImage[]
    product: string
    type: string
    uri: string
}

//Spotify playlist models
export interface SpotifyPlaylistTrack {
    added_at: string
    added_by: SpotifyUser | null
    is_local: boolean
    track: SpotifyTrack | SpotifyEpisode
    type: string
    uri: string
}
