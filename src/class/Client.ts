import { Socket } from "socket.io";
import { Server } from "../Server";

export default class Client {
    public id?: string;
    public readonly socket: Socket;
    private readonly server: Server;

    constructor(socket: Socket, server: Server) {
        this.id = undefined;
        this.socket = socket;
        this.server = server;
    }
}
