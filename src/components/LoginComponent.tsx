"use client";

import { FunctionComponent } from 'react';
import { redirectToSpotifyAuth } from '../lib/auth';

export const LoginComponent: FunctionComponent = () => {
    return (
        <button onClick={redirectToSpotifyAuth}>Login with Spotify</button>
    )
}