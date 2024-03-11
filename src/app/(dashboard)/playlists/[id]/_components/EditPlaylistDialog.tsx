import { FunctionComponent, useEffect, useState } from "react"
import { Pencil } from "lucide-react"
import { PlaylistResponse } from "@/services/playlists.service"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { UpdatePlaylistDetailsForm } from "@/components/forms/UpdatePlaylistDetailsForm"

interface EditPlaylistProps {
    playlist: PlaylistResponse
    submit: () => void
}

export const EditPlaylistDialog: FunctionComponent<EditPlaylistProps> = ({ playlist, submit }) => {
    const [open, setOpen] = useState(false)

    const closeDialogsOnSubmit = () => {
        setOpen(false)
        submit()
    }

    return (
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <Dialog
                open={open}
                onOpenChange={setOpen}
            >
                <DialogTrigger className="flex w-full items-center gap-2">
                    <Pencil className="h-4 min-w-4 text-neutral-300 transition-colors hover:text-neutral-100" />
                    Edit details
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit playlist details</DialogTitle>
                    </DialogHeader>
                    <UpdatePlaylistDetailsForm
                        playlist={playlist}
                        submit={closeDialogsOnSubmit}
                    />
                </DialogContent>
            </Dialog>
        </DropdownMenuItem>
    )
}
