"use client";

import { FunctionComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpotify } from '@fortawesome/free-brands-svg-icons'
import { redirectToSpotifyAuth } from '../lib/auth';

export const LoginComponent: FunctionComponent = () => {
    return (
        <div className='flex flex-col items-center bg-neutral-700 rounded-lg w-[400px] p-12'>
            <h2 className="text-neutral-200 mb-8">
                To enter the world of Cymba we need you to login with your Spotify account
            </h2>
            <button className='flex items-center gap-2 bg-green-700 hover:bg-green-800 text-neutral-200 rounded-lg transition-colors px-6 py-4' onClick={redirectToSpotifyAuth}>
                <FontAwesomeIcon icon={faSpotify} className='h-8'/>
                Login with Spotify
            </button>
        </div>
    )
}