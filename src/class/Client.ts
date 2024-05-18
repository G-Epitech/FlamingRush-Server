import { Socket } from "socket.io";
import { Server } from "../Server";

export default class Client {
    public id?: string;
    public room?: any;
    public readonly socket: Socket;
    private readonly server: Server;

    constructor(socket: Socket, server: Server) {
        this.id = undefined;
        this.socket = socket;
        this.server = server;
        this.room = undefined;
    }

    public disconnect() {
        if (this.room) {
            this.room.leave(this);
        }
    }
}
