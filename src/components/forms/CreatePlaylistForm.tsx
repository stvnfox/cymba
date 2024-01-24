"use client"
import { FunctionComponent, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
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
    const [submitted, setSubmitted] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [submitFailed, setSubmitFailed] = useState(false)
    const router = useRouter()

    const form = useForm<z.infer<typeof CreatePlaylistFormSchema>>({
        resolver: zodResolver(CreatePlaylistFormSchema),
        defaultValues: {
            title: "",
            description: "",
        },
    })

    const onSubmit = async (values: z.infer<typeof CreatePlaylistFormSchema>) => {
        setIsLoading(true)
        setSubmitFailed(false)

        try {
            const response = await PlaylistsService.CreatePlaylist({
                userId: data?.user.id,
                token: data?.user.access_token,
                name: values.title,
                description: values.description,
            })

            router.push(`/playlists/${response.id}`)

            setTimeout(() => {
                setSubmitted(true)
            }, 500)
        } catch (error) {
            setSubmitFailed(true)
            console.error(error)
        }

        setIsLoading(false)
    }

    return (
        <>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    <>
                        {submitted ? (
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
                                                <Textarea {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    aria-label="Click here to create your playlist"
                                >
                                    {isLoading && <Spinner />}
                                    Submit
                                </Button>
                            </>
                        )}
                    </>
                    {submitFailed && (
                        <FormMessage className="!mt-3">
                            Oops! Something went wrong while creating your playlist. Please try again later.
                        </FormMessage>
                    )}
                </form>
            </Form>
        </>
    )
}
