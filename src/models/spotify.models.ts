export interface SpotifyExternalUrls {
    spotify: string
}

export interface SpotifyFollowers {
    href: string | null
    total: number
}

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

export interface SpotifyImage {
    height: number | null
    url: string
    width: number | null
}

export interface SpotifyPlaylistOwner {
    display_name: string
    external_urls: SpotifyExternalUrls
    href: string
    id: string
    type: string
    uri: string
}

interface SpotifyRestrictions {
    reason: string
}

interface SpotifySimplifiedArtist {
    external_urls?: SpotifyExternalUrls
    href?: string
    id?: string
    name?: string
    type?: string
    uri?: string
}

interface SpotifyAlbum {
    album_type: string
    total_tracks: number
    available_markets: string[]
    external_urls: SpotifyExternalUrls
    href: string
    id: string
    images: SpotifyImage[]
    name: string
    release_date: string
    release_date_precision: string
    restrictions?: SpotifyRestrictions
    type: string
    uri: string
    artists: SpotifySimplifiedArtist[]
}

interface SpotifyArtist {
    external_urls: SpotifyExternalUrls
    followers: SpotifyFollowers
    genres: string[]
    href: string
    id: string
    images: SpotifyImage[]
    name: string
    popularity: number
    type: string
    uri: string
}

interface SpotifyTrack {
    album: SpotifyAlbum
    artists: SpotifyArtist[]
    available_markets: string[]
    disc_number: number
    duration_ms: number
    explicit: boolean
    external_ids: { isrc: string; ean: string; upc: string }
    external_urls: SpotifyExternalUrls
    href: string
    id: string
    is_playable: boolean
    linked_from: unknown
    restrictions?: SpotifyRestrictions
    name: string
    popularity: number
    preview_url: string | null
    track_number: number
    type: string
    uri: string
    is_local: boolean
}

interface SpotifyCopyright {
    text: string
    type: string
}

interface SpotifyShow {
    available_markets: string[]
    copyrights: SpotifyCopyright[]
    description: string
    html_description: string
    explicit: boolean
    external_urls: SpotifyExternalUrls
    href: string
    id: string
    images: SpotifyImage[]
    is_externally_hosted: boolean
    languages: string[]
    media_type: string
    name: string
    publisher: string
    type: string
    uri: string
    total_episodes: number
}

interface SpotifyEpisode {
    audio_preview_url: string | null
    description: string
    html_description: string
    duration_ms: number
    explicit: boolean
    external_urls: SpotifyExternalUrls
    href: string
    id: string
    images: SpotifyImage[]
    is_externally_hosted: boolean
    is_playable: boolean
    language?: string
    languages: string[]
    name: string
    release_date: string
    release_date_precision: string
    resume_point: { fully_played: boolean; resume_position_ms: number }
    type: string
    uri: string
    restrictions?: SpotifyRestrictions
    show: SpotifyShow
}

export interface SpotifyPlaylistTrack {
    added_at: string
    added_by: SpotifyUser | null
    is_local: boolean
    track: SpotifyTrack | SpotifyEpisode
    type: string
    uri: string
}

interface SimplifiedPlaylistTracks {
    href: string
    total: number
}

export interface SimplifiedSpotifyPlaylist {
    collaborative: boolean
    description: string
    external_urls: SpotifyExternalUrls
    href: string
    id: string
    images: SpotifyImage[]
    name: string
    owner: SpotifyPlaylistOwner
    public: boolean
    snapshot_id: string
    tracks: SimplifiedPlaylistTracks
    type: string
    uri: string
}
