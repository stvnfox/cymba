"use client"

// import { getStorageItem } from "@/lib/storage"
import { Dispatch, FunctionComponent, SetStateAction, createContext, useContext, useState } from "react"

type DashboardProviderProps = {
    children: React.ReactNode
}

type DashboardContextType = {
    token: string
    setToken: Dispatch<SetStateAction<string>>
    userId: string
    setUserId: Dispatch<SetStateAction<string>>
    refreshToken: string
    setRefreshToken: Dispatch<SetStateAction<string>>
    expires: string
    setExpires: Dispatch<SetStateAction<string>>
}

const defaultDashboardContext = {
    token: "",
    setToken: () => {},
    userId: "",
    setUserId: () => {},
    refreshToken: "",
    setRefreshToken: () => {},
    expires: "",
    setExpires: () => {},
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
    const [token, setToken] = useState("")
    const [userId, setUserId] = useState("")
    const [refreshToken, setRefreshToken] = useState("")
    const [expires, setExpires] = useState("")

    return (
        <DashboardContext.Provider
            value={{ token, setToken, userId, setUserId, refreshToken, setRefreshToken, expires, setExpires }}
        >
            {children}
        </DashboardContext.Provider>
    )
}
