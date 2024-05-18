export type GameType = "canoe" | "relay";

export interface IGame {
  type: GameType;
  start: () => Promise<number>;
  getPayload: () => Object;
}
