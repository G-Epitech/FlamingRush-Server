import { GameType, IGame } from "../../interfaces/IGame";

export default class Relay implements IGame {
  type: GameType;

  constructor() {
    this.type = "relay";
  }

  async start() {
    console.log("Starting Relay game");
    return 10;
  }

  getPayload() {
    return {
      type: this.type
    };
  }
}
