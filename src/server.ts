import * as socket from "socket.io";

export class Server {
  private port: number;
  private io: socket.Server;

  constructor(port: number) {
    this.port = port;
    this.io = new socket.Server(port, {});
  }

  public start() {
    console.log(`🚀 Server started on port ${this.port}.`);

    this.io.on("connection", (socket) => {
      console.log("👤 New user connexion.");
    });
  }
}
