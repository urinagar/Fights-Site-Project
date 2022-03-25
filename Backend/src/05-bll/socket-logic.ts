import {Server as HttpServer} from "http";
import {Server as SocketIoServer, Socket} from "socket.io";
import VacationModel from "../03-models/vacation-model";

let socketIoServer: SocketIoServer;

function initSocketIo(httpServer: HttpServer): void {
    const options = {
        cors: {
            origin: "*"
        }
    }
    socketIoServer = new SocketIoServer(httpServer, options);

    socketIoServer.sockets.on("connection", (socket: Socket) => {
        console.log("One Client has been connected");

        socket.on("disconnect", () => {
            console.log("One Client has been disconnected"); 
        });
        

    });
}

function emitAddFollower(vacation: VacationModel): void {
    socketIoServer.emit("user-following", vacation);
}

function emitRemoveFollower(vacation: VacationModel): void {
    socketIoServer.emit("user-not-following", vacation);
}

export default  {
    initSocketIo,
    emitAddFollower,
    emitRemoveFollower
}
