import { WebSocketServer } from "ws";

function createServer() {
    const server = new WebSocketServer({ port: parseInt(process.env.PORT as string)+1 });


    server.on('error', (err: Error) =>{
        console.error(err)
    });

    server.on("connection",async (ws,r)=>{
        console.log("connected")

        // ws.send(JSON.stringify({
        //     type:"play-song",
        //     track:"dfafdgnsd,gbnksjldghskjghslkj"
        // }));

    })  
    
    server.on("close",()=>{
        console.log("closed")
    })
    

    return server;
}


export {createServer}