export interface SpotifyUser {
    county: string
    display_name: string
    email: string
    explicit_content: { filter_enabled: boolean; filter_locked: boolean }
    external_urls: { spotify: string }
    followers: { href: string | null; total: number }
    href: string
    id: string
    images: unknown[]
    product: string
    type: string
    uri: string
}
