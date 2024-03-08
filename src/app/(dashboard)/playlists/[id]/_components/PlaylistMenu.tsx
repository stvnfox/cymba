import { FunctionComponent } from "react"
import { PlaylistResponse } from "@/services/playlists.service"
import { MoreVertical, Pencil, UserRoundPlus } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { RemovePlaylistDialog } from "./RemovePlaylistDialog"

interface PlaylistMenuProps {
    playlist: PlaylistResponse
}

export const PlaylistMenu: FunctionComponent<PlaylistMenuProps> = ({ playlist }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="focus-visible:outline-dashed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-600">
                <MoreVertical className="h-6 w-6 text-neutral-300 transition-colors hover:text-neutral-100" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                alignOffset={20}
                sideOffset={-8}
                className="w-56"
            >
                <DropdownMenuItem className="cursor-pointer gap-2">
                    {/* TODO: Add Edit dialog to edit image, title and description (change playlist image and details endpoint) */}
                    <Pencil className="h-4 min-w-4 text-neutral-300 transition-colors hover:text-neutral-100" />
                    Edit details
                </DropdownMenuItem>
                {/* TODO: Add Remove dialog to confirm that playlist can be removed (unfollow playlist endpoint) */}
                <RemovePlaylistDialog id={playlist.id} />
                <DropdownMenuItem
                    disabled
                    className="gap-2"
                >
                    <UserRoundPlus className="h-4 min-w-4 text-neutral-300 transition-colors hover:text-neutral-100" />
                    Invite collaborators
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
