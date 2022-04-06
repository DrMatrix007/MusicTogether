import bodyParser from 'body-parser';
import express from 'express'
import { authRouter } from './controllers/auth';
import cors from 'cors'
import { createServer } from './ws/PlaybackServer';
const app = express();


const wsServer = createServer()


app.use(cors())



app.use(bodyParser.json());


app.use("/auth",authRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.listen(parseInt(process.env.PORT as string));

console.log("listtennign on port 5000");