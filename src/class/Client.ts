import { Socket } from "socket.io";
import { Server } from "../Server";

export default class Client {
    private readonly id?: string;
    private readonly socket: Socket;
    private readonly server: Server;

    constructor(socket: Socket, server: Server) {
        this.id = undefined;
        this.socket = socket;
        this.server = server;
    }
}
