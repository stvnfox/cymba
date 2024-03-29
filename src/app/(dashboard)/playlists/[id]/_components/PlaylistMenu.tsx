import { FunctionComponent, useMemo, useState } from "react"
import { useSession } from "next-auth/react"
import { MoreVertical, UserRoundPlus } from "lucide-react"
import { PlaylistResponse } from "@/services/playlists.service"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { EditPlaylistDialog } from "./EditPlaylistDialog"
import { RemovePlaylistDialog } from "./RemovePlaylistDialog"

interface PlaylistMenuProps {
    playlist: PlaylistResponse
}

export const PlaylistMenu: FunctionComponent<PlaylistMenuProps> = ({ playlist }) => {
    const [open, setOpen] = useState(false)
    const {data: session} = useSession()

    const isOwner = useMemo(() => playlist.owner.id === session?.user.id, [playlist.owner.id, session?.user.id])

    return (
        <DropdownMenu
            open={open}
            onOpenChange={setOpen}
        >
            <DropdownMenuTrigger className="focus-visible:outline-dashed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-600">
                <MoreVertical className="h-6 w-6 text-neutral-300 transition-colors hover:text-neutral-100" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                alignOffset={20}
                sideOffset={-8}
                className="w-56"
            >
                {
                    isOwner &&
                    <EditPlaylistDialog
                        playlist={playlist}
                        submit={() => setOpen(false)}
                    />
                }
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
