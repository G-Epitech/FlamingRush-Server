import games from ".";
import { Server } from "../../Server";
import { startRound, state } from "../../emits";
import Room from "../Room";
import {initialized} from "../../emits/games/initialized";
import {endRound} from "../../emits/rooms/end-round";

export default class GameHandler {
  private readonly room: Room;
  private readonly server: Server;

  constructor(room: Room, server: Server) {
    this.room = room;
    this.server = server;
  }

  public async start() {
    let score = 3;

    while (score > 0) {
      /// Choose game of round
      const game = games[1];//[Math.floor(Math.random() * games.length)];
      this.room.game = new game(this.room, this.server);

      /// Start round
      startRound(this.room, this.server);

      /// Initialize game
      this.initialize();

      /// Run game
      const stateInterval = this.emitState();
      const won = await this.room.game.run();

      /// Stop game and wait for next round
      clearInterval(stateInterval);
      this.room.game.tearDown();
      this.room.users.map((user) => (user.ready = false));
      endRound(this.room, this.server);

      /// Update score
      if (won) score = score < 3 ? score + 1 : 3;
      else score = score > 0 ? score - 1 : 0;

      // Wait for all users to be ready
      while (this.room.users.some((user) => !user.ready)) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    }
  }

  private emitState() {
    return setInterval(() => {
      state(this.room, this.server);
    }, 30);
  };

  private initialize() {
    this.room.game?.initialize();
    initialized(this.room, this.server);
  }
}
