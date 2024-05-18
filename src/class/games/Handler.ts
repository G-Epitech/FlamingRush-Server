import games from ".";
import { Server } from "../../Server";
import { startRound, state } from "../../emits";
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

      const stateInterval = this.emitState();
      score = await this.room.game.startGame();

      clearInterval(stateInterval);

      this.room.users.map((user) => (user.ready = false));

      // Wait for all users to be ready
      while (this.room.users.some((user) => !user.ready)) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }
  }

  private emitState() {
    return setInterval(() => {
      state(this.room, this.server);
    }, 30);
  };
}
