import { FunctionComponent } from "react"
import clsx from "clsx"
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { CreatePlaylistForm } from "./forms/CreatePlaylistForm"

type CreatePlaylistButtonProps = {
    isExpended: boolean
}

export const CreatePlaylistButton: FunctionComponent<CreatePlaylistButtonProps> = ({ isExpended }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="navigation"
                    size={isExpended ? "navigation" : "icon"}
                    className={clsx(isExpended && "justify-start")}
                >
                    <FontAwesomeIcon
                        icon={faPlusCircle}
                        className="!h-5"
                    />
                    {isExpended && "Create playlist"}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                    <DialogTitle>Create new playlist</DialogTitle>
                    <DialogDescription>
                        Ready to curate your perfect music mix? Give it a catchy title and a brief description and click
                        on "Create Playlist,". Whether it's for workouts, chill sessions, or road trips, let your
                        playlist reflect your style. Save it, add your favorite tracks, and enjoy your personalized
                        soundtrack on Spotify! 🎶✨
                    </DialogDescription>
                </DialogHeader>
                <CreatePlaylistForm />
            </DialogContent>
        </Dialog>
    )
}
