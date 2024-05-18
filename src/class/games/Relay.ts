import { GameType, IGame } from "../../interfaces/IGame";

export default class Relay implements IGame {
  type: GameType;

  constructor() {
    this.type = "relay";
  }

  async startGame() {
    console.log("Starting Relay game");
  }

  getPayload() {
    return {
      type: this.type
    };
  }
}
