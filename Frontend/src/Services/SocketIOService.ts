import { vacationsStore } from './../Redux/Store';
import { io, Socket } from "socket.io-client";
import VacationModel from "../Models/VacationModel";
import config from "../Utils/config";
import { updateVacationAction } from '../Redux/VacationsState';

class SocketIoService {
    private socket: Socket;
    
    public connect(): void {
        this.socket = io(config.urls.socketServer);

        this.socket.on("user-following", (vacation: VacationModel) => {
            vacationsStore.dispatch(updateVacationAction(vacation));
        });

        this.socket.on("user-not-following", (vacation: VacationModel) => {
            vacationsStore.dispatch(updateVacationAction(vacation));
        });
    }

    public disconnect(): void {
        this.socket.disconnect();
    }
}

const socketIoService = new SocketIoService();
export default socketIoService;