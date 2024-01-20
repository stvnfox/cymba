"use client"

import { useParams } from "next/navigation"

const PlaylistDetailPage = () => {
    const params = useParams()

    return (
        <>
            <h1>Playlist Detail Page</h1>
            <p>{params.id}</p>
        </>
    )
}

export default PlaylistDetailPage
