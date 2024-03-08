import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"
import { PlaylistsService } from "@/services/playlists.service"
import { LucideXSquare } from "lucide-react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { FunctionComponent } from "react"

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
            router.push("/playlists")
        } else {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem removing the playlist. Try it again.",
            })
        }
    }

    return (
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <Dialog>
                <DialogTrigger className="flex w-full items-center gap-2">
                    <LucideXSquare className="h-4 min-w-4 text-neutral-300 transition-colors hover:text-neutral-100" />
                    Remove
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Remove playlist</DialogTitle>
                        <DialogDescription>
                            Are you certain you want to remove this playlist? This action cannot be undone. Click the
                            button below to confirm.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button onClick={removePlaylist}>I&apos;m sure</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </DropdownMenuItem>
    )
}
