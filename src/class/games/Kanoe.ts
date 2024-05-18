import { GameType, IGame } from "../../interfaces/IGame";

export default class Kanoe implements IGame {
  type: GameType;

  constructor() {
    this.type = "kanoe";
  }

  startGame() {
    console.log("Starting Kanoe game");
  }

  getPayload() {
    return {
      type: this.type
    };
  }
}
