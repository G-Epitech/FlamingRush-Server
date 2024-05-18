export type GameType = "canoe" | "relay";

export interface IGame {
  type: GameType;
  run: () => Promise<boolean>;
  initialize: () => void;
  tearDown: () => void;
  getPayload: () => Object;
}
