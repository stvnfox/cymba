import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { faHouseChimney, faCirclePlay, faUser } from "@fortawesome/free-solid-svg-icons"

export type NavigationItem = {
    name: string
    path: string
    icon: IconProp
    alt: string
}

export const navigationItems = [
    {
        name: "Dashboard",
        path: "/dashboard",
        icon: faHouseChimney,
        alt: "Click here to go to the dashboard",
    },
    {
        name: "Playlists",
        path: "/playlists",
        icon: faCirclePlay,
        alt: "Click here to go to your playlists",
    },
    {
        name: "Profile",
        path: "/profile",
        icon: faUser,
        alt: "Click here to go to your profile",
    },
] as NavigationItem[]
