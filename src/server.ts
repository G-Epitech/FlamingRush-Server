import * as socket from "socket.io";
import Client from "./class/Client";
import events from "./events";
import Room from "./class/Room";

export class Server {
  private readonly port: number;
  public readonly io: socket.Server;
  private clients: { [key: string]: Client } = {};
  public rooms: { [key: string]: Room } = {};

  constructor(port: number) {
    this.port = port;
    this.io = new socket.Server(port, {});
  }

  public start() {
    console.log(`🚀 Server started on port ${this.port}.`);

    this.io.on("connection", (socket) => {
      this.clients[socket.id] = new Client(socket, this);
      console.log("👤 New user connection.");

      socket.on("disconnect", () => {
        this.clients[socket.id].disconnect();
        delete this.clients[socket.id];
        console.log("👤 User disconnected.");
      });

      events.map((event) => {
        socket.on(event.name, (payload) => {
          const client = this.clients[socket.id];
          if (!client.id && event.protected) {
            console.log("🔒 User not authenticated for route.", event.name);
          }

          event.handler(client, JSON.parse(payload || "{}"));
        });
      });
    });
  }
}
