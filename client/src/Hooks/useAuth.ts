import  { useEffect, useState } from "react";
import {
    callbackWithCode,
    refreshWithRefreshToken,
} from "../api";

export default function useAuth() {
    const [token, settoken] = useState("");
    const [refresh, setrefresh] = useState("");
    const [expires_in, setexprites_in] = useState(0);

    const setAuth = (token: string, refresh: string, expires_in: number) => {
        settoken(token);
        setrefresh(refresh);
        setexprites_in(expires_in);
    };

    useEffect(() => {
        const code = new URLSearchParams(
            new URL(window.location.href).search
        ).get("code");
        if (code && code !== "") {
            window.history.pushState(
                {},
                "",
                window.location.href.split("?")[0]
            );
            callbackWithCode(code).then((data) => {
                setAuth(...data);
            });
        }

        return () => {};
    }, []);
    useEffect(() => {
        if (!expires_in || !refresh) {
            return;
        }

        const id = setInterval(() => {
            refreshWithRefreshToken(refresh).then((data) => {
                setAuth(...data);
            });
        }, (expires_in - 60) * 1000);
        return () => clearInterval(id);
    }, [expires_in, refresh]);

    return token;
}
