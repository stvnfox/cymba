"use client"

import { FunctionComponent } from "react"
import clsx from "clsx"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { faArrowRightToBracket, faPause } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { DEFAULT_LOGOUT_REDIRECT } from "@/routes"
import { navigationItems } from "@/lib/navigation"
import { Button } from "@/components/ui/button"
import { CreatePlaylistButton } from "@/components/CreatePlaylistButton"
import { OpenSearchButton } from "@/components/OpenSearchButton"
import { Separator } from "@/components/ui/separator"

export const SidebarComponent: FunctionComponent = () => {
    const currentPath = usePathname()
    const isExpended = true

    return (
        <aside className="fixed flex h-screen w-[226px] flex-col items-center border-r border-neutral-600 p-6">
            <h2 className="mb-12 flex items-center gap-3 text-2xl tracking-wide text-neutral-300">
                <FontAwesomeIcon
                    icon={faPause}
                    className="!h-10"
                />
                Cymba
            </h2>
            <CreatePlaylistButton isExpended={isExpended} />
            <OpenSearchButton isExpended={isExpended} />
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
                onClick={() => signOut({ callbackUrl: DEFAULT_LOGOUT_REDIRECT })}
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
