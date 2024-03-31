import { FunctionComponent } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { PlaylistsService } from "@/services/playlists.service"
import { Button } from "@/components/ui/button"
import {
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"

interface RemovePlaylistProps {
    id: string
}

export const RemovePlaylistDialog: FunctionComponent<RemovePlaylistProps> = ({ id }) => {
    const { data } = useSession()
    const { toast } = useToast()
    const router = useRouter()

    const removePlaylist = async () => {
        const response = await PlaylistsService.RemovePlaylist({ id, token: data?.user.access_token })

        if (response.status === 200) {
            router.push("/dashboard")
        } else {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem removing the playlist. Try it again.",
            })
        }
    }

    return (
        <>
            <DialogHeader>
                <DialogTitle>Remove playlist</DialogTitle>
                <DialogDescription>
                    Are you certain you want to remove this playlist? This action cannot be undone. Click the button
                    below to confirm.
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <DialogClose asChild>
                    <Button onClick={removePlaylist}>I&apos;m sure</Button>
                </DialogClose>
            </DialogFooter>
        </>
    )
}
