export type GameType = "kanoe" | "relay";

export interface IGame {
  type: GameType;
  startGame: () => void;
  getPayload: () => Object;
}
