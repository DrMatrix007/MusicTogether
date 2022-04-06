import { Router } from "express";
import SpotifyWebApi from "spotify-web-api-node";
import { config } from "dotenv";
import { generateRandomString } from "../utils";
config();
const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const clientAddress = process.env.CLIENT_ADDRESS;

const scopes = [
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-read-currently-playing",
    "user-read-private",
    "user-read-email",
    "user-follow-modify",
    "user-follow-read",
    "user-library-modify",
    "user-library-read",
    "streaming",
    "app-remote-control",
    "user-read-playback-position",
    "user-top-read",
    "user-read-recently-played",
    "playlist-modify-private",
    "playlist-read-collaborative",
    "playlist-read-private",
    "playlist-modify-public",
];

const api = new SpotifyWebApi({
    clientId: clientID,
    clientSecret: clientSecret,
    redirectUri: clientAddress,
});

const authRouter = Router();

authRouter.get("/signin", (req, res) => {
    const redirectUri = api.createAuthorizeURL(
        scopes,
        generateRandomString(16),
        false
    );

    res.redirect(redirectUri);
});

authRouter.post("/credentials", (req, res) => {
    const { code } = req.body;

    api.authorizationCodeGrant(code)
        .then((data) => {
            const { access_token, refresh_token, expires_in } = data.body;

            res.send({ access_token, refresh_token, expires_in });
        })
        .catch((err) => {
            res.status(400).send(err);
        });
});

authRouter.post("/refresh", (req, res) => {
    const api = new SpotifyWebApi({
        clientSecret,
        clientId: clientID,
		refreshToken: req.body.refresh,
		
	});

	api.refreshAccessToken().then(r=>{
		res.send(r.body);
	})



});

export { authRouter };
