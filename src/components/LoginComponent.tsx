"use client";

import { FunctionComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpotify } from '@fortawesome/free-brands-svg-icons'
import { redirectToSpotifyAuth } from '../lib/auth';

export const LoginComponent: FunctionComponent = () => {
    return (
        <div className='bg-neutral-300 font-light rounded-lg shadow-2xl shadow-neutral-900 w-[400px] px-12 py-24'>
            <h1 className="text-2xl text-green-800 tracking-wide mb-12">Cymba</h1>
            <p className="text-green-950 tracking-wide mb-12 lg:w-5/6">
                <b>Welcome back,</b> connect with your Spotify account to continue to Cymba.
            </p>
            <button className='flex items-center gap-3 bg-green-700 hover:bg-green-800 text-neutral-200 tracking-wide rounded-lg transition-colors px-6 py-4' onClick={redirectToSpotifyAuth}>
                <FontAwesomeIcon icon={faSpotify} className='h-8'/>
                Login with Spotify
            </button>
        </div>
    )
}