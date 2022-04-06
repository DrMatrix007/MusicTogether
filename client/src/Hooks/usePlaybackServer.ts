import { useEffect, useState } from "react";


interface usePlaybackServerProps {
    playSong: (id: string) => void;

}

export default function usePlaybackServer(props: usePlaybackServerProps) {
    const [conn, setConn] = useState<WebSocket | null>(null);


    useEffect(() => {
        const ws = new WebSocket("ws://localhost:5001");
        setConn(ws);

        ws.onmessage = (e) => {
            const data = JSON.parse(e.data)

            switch (data.title) {
                case "play-song":
                    props.playSong(data.track);
            }



        }

        return () => {
            ws.close();
        };
    }, []);

    return conn;
}
