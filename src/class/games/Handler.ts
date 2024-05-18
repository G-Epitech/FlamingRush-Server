import games from ".";
import { Server } from "../../Server";
import { startRound } from "../../emits";
import Room from "../Room";

export default class GameHandler {
  private readonly room: Room;
  private readonly server: Server;

  constructor(room: Room, server: Server) {
    this.room = room;
    this.server = server;
  }

  public async start() {
    let score = 10;

    while (score > 0) {
      const newGame = games[Math.floor(Math.random() * games.length)];
      this.room.game = new newGame();

      startRound(this.room, this.server);
      score = await this.room.game.startGame();

      // Wait for all users to be ready
      while (this.room.users.some((user) => !user.ready)) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }
  }
}
