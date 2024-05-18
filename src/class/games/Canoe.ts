import { GameType, IGame } from "../../interfaces/IGame";

export default class Canoe implements IGame {
  type: GameType;
  test: number;

  constructor() {
    this.type = "canoe";
    this.test = 0;
  }

  async start() {
    console.log("Starting Canoe game");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    this.test = 1;
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return 1;
  }

  getPayload() {
    return {
      type: this.type,
      test: this.test,
    };
  }
}
