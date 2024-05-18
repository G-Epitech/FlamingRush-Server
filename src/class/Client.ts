import { Socket } from "socket.io";

export default class Client {
    private readonly id: string;
    private readonly socket: Socket;

    constructor(id: string, socket: Socket) {
        this.id = id;
        this.socket = socket;
    }
}
