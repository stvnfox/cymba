"use client"
import { FunctionComponent } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { useMutation } from "@tanstack/react-query"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { Textarea } from "@/components/ui/textarea"
import { PlaylistsService } from "@/services/playlists.service"

type CreatePlaylistFormProps = {
    children: React.ReactNode
}

const CreatePlaylistFormSchema = z.object({
    title: z.string().min(2).max(50),
    description: z.string().min(2).max(100),
})

export const CreatePlaylistForm: FunctionComponent<CreatePlaylistFormProps> = ({ children }) => {
    const { data } = useSession()
    const router = useRouter()

    const form = useForm<z.infer<typeof CreatePlaylistFormSchema>>({
        resolver: zodResolver(CreatePlaylistFormSchema),
        defaultValues: {
            title: "",
            description: "",
        },
    })

    const createPlaylist = useMutation({
        mutationFn: async (values: z.infer<typeof CreatePlaylistFormSchema>) => {
            const response = await PlaylistsService.CreatePlaylist({
                userId: data?.user.id,
                token: data?.user.access_token,
                name: values.title,
                description: values.description,
            })

            if (response.id) {
                router.push(`/dashboard/${response.id}`)
            }
        },
    })

    const onSubmit = (values: z.infer<typeof CreatePlaylistFormSchema>) => {
        createPlaylist.mutate(values)
    }

    return (
        <>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    <>
                        {createPlaylist.isSuccess ? (
                            [children]
                        ) : (
                            <>
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
                                <Button
                                    type="submit"
                                    disabled={createPlaylist.isPending}
                                    aria-label="Click here to create your playlist"
                                >
                                    {createPlaylist.isPending && <Spinner />}
                                    Submit
                                </Button>
                            </>
                        )}
                    </>
                    {createPlaylist.isError && (
                        <FormMessage className="!mt-3">
                            Oops! Something went wrong while creating your playlist. Please try again later.
                        </FormMessage>
                    )}
                </form>
            </Form>
        </>
    )
}
