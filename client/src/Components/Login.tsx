import React from 'react'
import { getSignInWithSpotifyURL } from '../api'



export default function Login() {

    return (
        <div className='center flex'>
            
            <a href={getSignInWithSpotifyURL()}>
                sign in with spotify
            </a>
        </div>
    )
}
