import { FunctionComponent } from "react"
import { PlaylistResponse } from "@/services/playlists.service"
import { DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { UpdatePlaylistDetailsForm } from "@/components/forms/UpdatePlaylistDetailsForm"

interface EditPlaylistProps {
    playlist: PlaylistResponse
    submit: () => void
}

export const EditPlaylistDialog: FunctionComponent<EditPlaylistProps> = ({ playlist, submit }) => {
    const closeDialogsOnSubmit = () => {
        submit()
    }

    return (
        <>
            <DialogHeader>
                <DialogTitle>Edit playlist details</DialogTitle>
            </DialogHeader>
            <UpdatePlaylistDetailsForm
                playlist={playlist}
                submit={closeDialogsOnSubmit}
            />
        </>
    )
}
