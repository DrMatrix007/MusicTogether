import { useEffect, useState } from 'react'
import { searchTracks } from '../api';

interface SearchProps {
    select: (uri: string) => void;
    token: string;
}

export default function Search(props: SearchProps) {
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState("")
    // if (timeoutId ) { 
    //     clearTimeout(timeoutId);
    // }
    if (searchTerm !== "") {
        //     const id = setTimeout(() => {
        searchTracks(searchTerm, 'track', props.token).then((a) => { setSearchResults(a) });
        //     }, 500)
        //     setTimeoutId(id);
    }
    return (
        <div>

            <input
                onChange={a => setSearchTerm(a.target.value)}
                style={{
                    fontSize: "1.5rem",
                    padding: "10px",
                    margin: '15px'
                }}
            />

            <h2>Results:</h2>
            <div className='flex' style={{ height: '100%', overflowY: 'scroll' }}>
                {
                    searchResults.map((d, i) => {
                        return (<button key={i} className='card'>
                            <div className='row'>
                                <div className="image-container">
                                    <img src={d.album.images[2].url} height={d.album.images[2].height} width={d.album.images[2].height} />
                                </div>
                                <div>

                                    <h2 onClick={() => props.select(d.uri)}>{d.album.name} - {d.name}</h2>
                                    <div className='row'>
                                        {(d.artists as any[]).map((a, i) => {
                                            return (
                                                <h3 key={i}>{a.name}</h3>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </button>)
                    })
                }
            </div>
        </div>

    )


}
