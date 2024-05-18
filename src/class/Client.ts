import { Socket } from "socket.io";
import { Server } from "../Server";
import Room from "./Room";

export default class Client {
    public id?: string;
    public room?: Room;
    public readonly socket: Socket;
    public readonly server: Server;

    constructor(socket: Socket, server: Server) {
        this.id = undefined;
        this.socket = socket;
        this.server = server;
        this.room = undefined;
    }

    public disconnect() {
        this.room?.leave(this);
    }
}
