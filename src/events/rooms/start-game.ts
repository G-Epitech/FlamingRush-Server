import games from "../../class/games";
import GameHandler from "../../class/games/Handler";
import { startRound } from "../../emits";
import { IEvent } from "../../interfaces/IEvent";

export const StartGame: IEvent<void> = {
  name: "room/start-round",
  protections: {
    id: true,
    room: true,
  },

  handler(client, payload) {
    const room = client.room!;
    const users = room.users || [];
    const user = users.find((user) => user.client.id === client.id);

    if (!user?.owner) return;

    for (const user of users) {
      if (!user.ready) return;
    }

    users.map((user) => (user.ready = false));

    const handler = new GameHandler(room, client.server);
    handler.start();
  },
};
