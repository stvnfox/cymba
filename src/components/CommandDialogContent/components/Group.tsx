import { FunctionComponent } from "react"
import { SpotifyAlbum, SpotifyArtist, SpotifyTrack } from "@/models/spotify.base.models"
import { GroupItem } from "./GroupItem"

interface GroupProps {
    title: string
    list: SpotifyAlbum[] | SpotifyArtist[] | SpotifyTrack[]
}

export const Group: FunctionComponent<GroupProps> = ({ title, list }) => {
    return (
        <div className="mb-3 text-left last-of-type:mb-0">
            <h3 className="mb-1 text-left text-xs font-semibold text-neutral-500">{title}</h3>
            {list.length > 0 && (
                <ul>
                    {list.map((item) => {
                        return (
                            <li key={item.id}>
                                <GroupItem item={item} />
                            </li>
                        )
                    })}
                </ul>
            )}
            {list.length === 0 && <p className="text-xs text-neutral-200">No items found</p>}
        </div>
    )
}
