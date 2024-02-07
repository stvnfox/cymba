import {
    SpotifyAlbum,
    SpotifyArtist,
    SpotifyAudiobook,
    SpotifyEpisode,
    SpotifyPlaylist,
    SpotifyShow,
    SpotifyTrack,
} from "./spotify.base.models"

interface SpotifySearchResponseBase {
    href: string
    limit: number
    next: string | null
    offset: number
    previous: string | null
    total: number
}

export interface SpotifyAudiobooks extends SpotifySearchResponseBase {
    items: SpotifyAudiobook[]
}

export interface SpotifyEpisodes extends SpotifySearchResponseBase {
    items: SpotifyEpisode[]
}

export interface SpotifyShows extends SpotifySearchResponseBase {
    items: SpotifyShow[]
}

export interface SpotifyPlaylists extends SpotifySearchResponseBase {
    items: SpotifyPlaylist[]
}

export interface SpotifyAlbums extends SpotifySearchResponseBase {
    items: SpotifyAlbum[]
}

export interface SpotifyArtists extends SpotifySearchResponseBase {
    items: SpotifyArtist[]
}

export interface SpotifyTracks extends SpotifySearchResponseBase {
    items: SpotifyTrack[]
}
