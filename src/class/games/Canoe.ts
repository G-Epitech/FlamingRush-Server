import { GameType, IGame } from "../../interfaces/IGame";

export default class Canoe implements IGame {
  type: GameType;

  constructor() {
    this.type = "canoe";
  }

  async startGame() {
    console.log("Starting Canoe game");
  }

  getPayload() {
    return {
      type: this.type
    };
  }
}
