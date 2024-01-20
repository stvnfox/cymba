"use client"
import { FunctionComponent, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { useDashboardContext } from "@/context/dashboard.context"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { SpotifyService } from "@/services/spotify.service"
import { useRouter } from "next/navigation"

const CreatePlaylistFormSchema = z.object({
    title: z.string().min(2).max(50),
    description: z.string().min(2).max(100),
})

export const CreatePlaylistForm: FunctionComponent = () => {
    const { token, user } = useDashboardContext()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [submitFailed, setSubmitFailed] = useState(false)

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
            const response = await SpotifyService.CreatePlaylist({
                userId: user.id,
                token,
                name: values.title,
                description: values.description,
            })

            router.push(`/playlists/${response.id}`)
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
                        Submit
                    </Button>
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
