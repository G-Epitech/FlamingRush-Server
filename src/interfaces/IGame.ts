export type GameType = "canoe" | "relay";

export interface IGame {
  type: GameType;
  startGame: () => Promise<number>;
  getPayload: () => Object;
}
