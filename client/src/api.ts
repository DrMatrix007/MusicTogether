import axios from "axios";

const serverAdress = "http://localhost:5000";

const getSignInWithSpotifyURL = () => {
    return `${serverAdress}/auth/signin`;
};
const callbackWithCode = async (code: string) => {
    const r = await axios.post(`${serverAdress}/auth/credentials`, { code });
    return [r.data.access_token, r.data.refresh_token, r.data.expires_in] as [
        string,
        string,
        number
    ];
};

const refreshWithRefreshToken = async (refresh_token: string) => {
    const r = await axios.post(`${serverAdress}/auth/refresh`, {
        refresh_token,
    });

    return [r.data.access_token, r.data.refresh_token, r.data.expires_in] as [
        string,
        string,
        number
    ];
};

const searchTracks = async (term:string,type:'album'|'track',token:string)=>{
    const r = await axios.get(`https://api.spotify.com/v1/search?q=${term}&type=${type}`,{
        headers:{ 
            Authorization: `Bearer ${token}`
        }
    })
    // console.log(r.data)
    if(type==="track"){
        return r.data?.tracks?.items;
    }else if(type==="album"){
        return r.data?.albums?.items;
    }
}

export { getSignInWithSpotifyURL, serverAdress, callbackWithCode ,refreshWithRefreshToken,searchTracks};
