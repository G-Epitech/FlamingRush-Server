import User from "../class/User";

export type GameType = "canoe" | "relay";

export interface IGame {
  type: GameType;
  events: [string, (user: User, payload: any) => void][];
  run: () => Promise<boolean>;
  initialize: () => void;
  tearDown: () => void;
  getPayload: () => Object;
}
