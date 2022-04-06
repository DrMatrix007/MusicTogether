import { useState } from 'react'
import usePlaybackServer from '../Hooks/usePlaybackServer'
import SpotifyWebPlayer from 'react-spotify-web-playback';
// import SpotifyWebPlayer from 'react-spotify-player';

import Search from './Search';


export default function Dashbord({ token }: { token: string }) {

    const [track, setTrack] = useState("")

    const playSong = (id: string) => {
        setTrack(id);
    }

    usePlaybackServer({
        playSong
    });



    return (
        <>
            <div className=''>

                <Search select={playSong} token={token} />




                <SpotifyWebPlayer
                    token={token}
                    showSaveIcon
                    persistDeviceSelection
                    play={track === "" ? false : true}
                    uris={track === "" ? [] : [track]}
                    styles={{
                        // height: "140px",
                        
                    }}
                    name='Music Together'
                />

            </div>

        </>
    )
}
