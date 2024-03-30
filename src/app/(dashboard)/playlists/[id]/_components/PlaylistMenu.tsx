import { FunctionComponent, useMemo, useState } from "react"
import { useSession } from "next-auth/react"
import { LucideXSquare, MoreVertical, Pencil, UserRoundPlus } from "lucide-react"
import { PlaylistResponse } from "@/services/playlists.service"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { EditPlaylistDialog } from "./EditPlaylistDialog"
import { RemovePlaylistDialog } from "./RemovePlaylistDialog"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

interface PlaylistMenuProps {
    playlist: PlaylistResponse
}

export const PlaylistMenu: FunctionComponent<PlaylistMenuProps> = ({ playlist }) => {
    const [open, setOpen] = useState(false)
    const [showEditDialog, setShowEditDialog] = useState(false)
    const [showRemoveDialog, setShowRemoveDialog] = useState(false)
    const { data: session } = useSession()

    const isOwner = useMemo(() => playlist.owner.id === session?.user.id, [playlist.owner.id, session?.user.id])

    const openEditDialog = () => {
        // Reset eventual remove dialog
        setShowRemoveDialog(false)

        setShowEditDialog(true)
    }

    const openRemoveDialog = () => {
        // Reset eventual edit dialog
        setShowEditDialog(false)

        setShowRemoveDialog(true)
    }

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
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
                    {isOwner && (
                        <DropdownMenuItem
                            className="gap-2"
                            onSelect={openEditDialog}
                        >
                            <DialogTrigger className="flex w-full items-center gap-2">
                                <Pencil className="h-4 min-w-4 text-neutral-300 transition-colors hover:text-neutral-100" />
                                Edit details
                            </DialogTrigger>
                        </DropdownMenuItem>
                    )}
                    <DropdownMenuItem
                        className="gap-2"
                        onSelect={openRemoveDialog}
                    >
                        <DialogTrigger className="flex w-full items-center gap-2">
                            <LucideXSquare className="h-4 min-w-4 text-neutral-300 transition-colors hover:text-neutral-100" />
                            Remove
                        </DialogTrigger>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        disabled
                        className="gap-2"
                    >
                        <UserRoundPlus className="h-4 min-w-4 text-neutral-300 transition-colors hover:text-neutral-100" />
                        Invite collaborators
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <DialogContent className="sm:max-w-[425px]">
                {showEditDialog && (
                    <EditPlaylistDialog
                        playlist={playlist}
                        submit={() => setOpen(false)}
                    />
                )}
                {showRemoveDialog && <RemovePlaylistDialog id={playlist.id} />}
            </DialogContent>
        </Dialog>
    )
}
