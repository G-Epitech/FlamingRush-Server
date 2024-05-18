import { IEvent } from "../../interfaces/IEvent";

export const StartGame: IEvent<void> = {
  name: "startGame",
  protections: {
    id: true,
    room: true,
  },

  handler(client, payload) {
    for (const user of client.room?.users || []) {
      if (!user.ready && !user.owner) return;
    }
  },
};
