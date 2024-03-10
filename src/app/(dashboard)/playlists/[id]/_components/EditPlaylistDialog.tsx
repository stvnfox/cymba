import { FunctionComponent } from "react"
import { useSession } from "next-auth/react"
import { Pencil } from "lucide-react"
import { PlaylistResponse } from "@/services/playlists.service"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { UpdatePlaylistDetailsForm } from "@/components/forms/UpdatePlaylistDetailsForm"
// import { useToast } from "@/components/ui/use-toast"
// import { PlaylistsService } from "@/services/playlists.service"
// import { useRouter } from "next/navigation"

interface EditPlaylistProps {
    playlist: PlaylistResponse
}

export const EditPlaylistDialog: FunctionComponent<EditPlaylistProps> = ({ playlist }) => {
    return (
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <Dialog>
                <DialogTrigger className="flex w-full items-center gap-2">
                    <Pencil className="h-4 min-w-4 text-neutral-300 transition-colors hover:text-neutral-100" />
                    Edit details
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit playlist details</DialogTitle>
                    </DialogHeader>
                    <UpdatePlaylistDetailsForm playlist={playlist} />
                </DialogContent>
            </Dialog>
        </DropdownMenuItem>
    )
}
