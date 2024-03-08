import {
    SpotifyAlbum,
    SpotifyArtist,
    SpotifyAudiobook,
    SpotifyEpisode,
    SpotifyPlaylist,
    SpotifyResponseBase,
    SpotifyShow,
    SpotifyTrack,
} from "./spotify.base.models"

export interface SpotifyAudiobooks extends SpotifyResponseBase {
    items: SpotifyAudiobook[]
}

export interface SpotifyEpisodes extends SpotifyResponseBase {
    items: SpotifyEpisode[]
}

export interface SpotifyShows extends SpotifyResponseBase {
    items: SpotifyShow[]
}

export interface SpotifyPlaylists extends SpotifyResponseBase {
    items: SpotifyPlaylist[]
}

export interface SpotifyAlbums extends SpotifyResponseBase {
    items: SpotifyAlbum[]
}

export interface SpotifyArtists extends SpotifyResponseBase {
    items: SpotifyArtist[]
}

export interface SpotifyTracks extends SpotifyResponseBase {
    items: SpotifyTrack[]
}
