"use client"

import { SpotifyUser } from "@/models/spotify.models"
import { Dispatch, FunctionComponent, SetStateAction, createContext, useContext, useState } from "react"

type DashboardProviderProps = {
    children: React.ReactNode
}

type DashboardContextType = {
    token: string
    setToken: Dispatch<SetStateAction<string>>
    user: SpotifyUser
    setUser: Dispatch<SetStateAction<SpotifyUser>>
}

const defaultDashboardContext = {
    token: "",
    setToken: () => {},
    user: {} as SpotifyUser,
    setUser: () => {},
}

const DashboardContext = createContext<DashboardContextType>(defaultDashboardContext)

export const useDashboardContext = () => {
    const context = useContext(DashboardContext)

    if (context === undefined) {
        throw new Error("useDashboard must be used within a DashboardProvider")
    }

    return useContext(DashboardContext)
}

export const DashboardProvider: FunctionComponent<DashboardProviderProps> = ({ children }) => {
    const [token, setToken] = useState<string>("")
    const [user, setUser] = useState<SpotifyUser>({} as SpotifyUser)

    return <DashboardContext.Provider value={{ token, setToken, user, setUser }}>{children}</DashboardContext.Provider>
}
