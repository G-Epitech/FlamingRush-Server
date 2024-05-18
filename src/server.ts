import * as socket from "socket.io";
import Client from "./client";

export class Server {
  private readonly port: number;
  private io: socket.Server;
  private clients: { [key: string]: Client } = {};

  constructor(port: number) {
    this.port = port;
    this.io = new socket.Server(port, {});
  }

  public start() {
    console.log(`🚀 Server started on port ${this.port}.`);

    this.io.on("connection", (socket) => {
      console.log("👤 New user connection.");
      this.clients[socket.id] = new Client(socket.id, socket);

        socket.on("disconnect", () => {
            console.log("👤 User disconnected.");
            delete this.clients[socket.id];
        });
    });
  }
}
