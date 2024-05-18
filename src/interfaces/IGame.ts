export type GameType = "canoe" | "relay";

export interface IGame {
  type: GameType;
  startGame: () => void;
  getPayload: () => Object;
}
