import { FunctionComponent } from "react"
import { SpotifyPlaylist } from "@/models/spotify.base.models"
import { GridOverviewItem } from "./GridOverviewItem"
import { MessageComponent } from "@/components/MessageComponent"
import { CreatePlaylistButton } from "@/components/CreatePlaylistButton"

type GridOverviewProps = {
    items: SpotifyPlaylist[]
    children: React.ReactNode
}

export const GridOverview: FunctionComponent<GridOverviewProps> = ({ items, children }) => {
    return (
        <>
            {!items && (
                <MessageComponent message="Oops! No playlists found. Start creating your first one now!">
                    <div className="w-fit">
                        <CreatePlaylistButton isExpended={true} />
                    </div>
                </MessageComponent>
            )}
            {items && (
                <>
                    <ul className="grid grid-cols-auto-fit gap-4">
                        {items.map((item) => {
                            return (
                                <li
                                    key={item.id}
                                    className="h-full w-[200px]"
                                >
                                    <GridOverviewItem item={item} />
                                </li>
                            )
                        })}
                    </ul>
                    <div className="mt-8 flex justify-center">{children}</div>
                </>
            )}
        </>
    )
}
