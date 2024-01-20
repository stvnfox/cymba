"use client"

import { FunctionComponent } from "react"
import clsx from "clsx"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { faArrowRightToBracket, faPause, faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useDashboardContext } from "@/context/dashboard.context"
import { navigationItems } from "@/lib/navigation"
import { removeUserDataFromStorage } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { CreatePlaylistButton } from "@/components/CreatePlaylistButton"
import { Separator } from "@/components/ui/separator"

export const SidebarComponent: FunctionComponent = () => {
    const { setExpires, setRefreshToken, setUserId, setToken } = useDashboardContext()
    const currentPath = usePathname()
    const router = useRouter()
    const isExpended = true

    const signOff = () => {
        removeUserDataFromStorage()
        setToken("")
        setUserId("")
        setExpires("")
        setRefreshToken("")

        router.push("/")
    }

    return (
        <aside className="flex min-h-screen flex-col items-center border-r border-neutral-600 p-6">
            <h2 className="mb-12 flex items-center gap-3 text-2xl tracking-wide text-neutral-300">
                <FontAwesomeIcon
                    icon={faPause}
                    className="!h-10"
                />
                Cymba
            </h2>
            <CreatePlaylistButton isExpended={isExpended} />
            <Button
                variant="navigation"
                size={isExpended ? "navigation" : "icon"}
                className={clsx(isExpended && "justify-start")}
            >
                <FontAwesomeIcon
                    icon={faSearch}
                    className="!h-5"
                />
                {isExpended && "Search"}
            </Button>
            <Separator />
            <nav className="w-full flex-grow">
                <ul className="space-y-4">
                    {navigationItems.map((item, index) => {
                        return (
                            <li key={`navigation-item-${index}`}>
                                <Button
                                    variant="navigation"
                                    size={isExpended ? "navigation" : "icon"}
                                    className={clsx(
                                        item.path === currentPath
                                            ? "bg-neutral-700 text-neutral-50"
                                            : "text-neutral-200 hover:bg-neutral-700",
                                        isExpended && "justify-start"
                                    )}
                                    asChild
                                >
                                    <Link
                                        href={item.path}
                                        aria-label={item.alt}
                                    >
                                        <FontAwesomeIcon
                                            icon={item.icon}
                                            className="!h-5"
                                        />
                                        {isExpended && item.name}
                                    </Link>
                                </Button>
                            </li>
                        )
                    })}
                </ul>
            </nav>
            <Button
                variant="navigation"
                size={isExpended ? "navigation" : "icon"}
                className={clsx(isExpended && "justify-start")}
                onClick={signOff}
            >
                <FontAwesomeIcon
                    icon={faArrowRightToBracket}
                    className="!h-5"
                />
                {isExpended && "Sign out"}
            </Button>
        </aside>
    )
}
