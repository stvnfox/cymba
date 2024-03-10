import { FunctionComponent } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useSession } from "next-auth/react"
import { useMutation } from "@tanstack/react-query"
import { createBase64Image } from "@/lib/utils"
import { PlaylistResponse, PlaylistsService } from "@/services/playlists.service"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Spinner } from "../ui/spinner"

interface UpdatePlaylistDetailsFormProps {
    playlist: PlaylistResponse
}

const FormSchema = z.object({
    title: z
        .string()
        .min(1, { message: "Title is required." })
        .max(100, { message: "Title must not be longer than 100 characters." }),
    description: z
        .string()
        .min(1, { message: "Description is required." })
        .max(500, { message: "Description must not be longer than 500 characters." }),
    image: z.instanceof(FileList),
})

export const UpdatePlaylistDetailsForm: FunctionComponent<UpdatePlaylistDetailsFormProps> = ({ playlist }) => {
    const { data: session } = useSession()
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            title: playlist.name ?? "",
            description: playlist.description ?? "",
            image: undefined,
        },
    })

    const fileRef = form.register("image")

    const updatePlaylist = useMutation({
        mutationFn: async (values: z.infer<typeof FormSchema>) => {
            let imageUrl = ""
            if (values.image.length > 0) {
                imageUrl = await createBase64Image(values.image[0])
            }

            const response = await PlaylistsService.UpdatePlaylistDetails({
                id: playlist.id,
                token: session?.user.access_token,
                name: values.title,
                description: values.description,
                image: imageUrl.replace("data:image/jpeg;base64,", ""),
            })

            console.log(response)
        },
    })

    const onSubmit = (values: z.infer<typeof FormSchema>) => {
        updatePlaylist.mutate(values)
    }

    return (
        // TODO: Fix weird space bug..
        // TODO: Add toast when update succeded or failed
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
            >
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Image</FormLabel>
                            <FormControl>
                                <Input
                                    type="file"
                                    accept="image/jpg, image/jpeg"
                                    {...fileRef}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    type="submit"
                    disabled={updatePlaylist.isPending}
                >
                    {updatePlaylist.isPending && <Spinner />}
                    Submit
                </Button>
            </form>
        </Form>
    )
}
