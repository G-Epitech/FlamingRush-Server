import GameHandler from "../../class/games/Handler";
import { IEvent } from "../../interfaces/IEvent";

export const StartGame: IEvent<void> = {
  name: "room/start-round",
  protections: {
    id: true,
    room: true,
  },

  handler(client, payload) {
    const room = client.room;
    if (!room) return;

    const users = room.users || [];
    const user = users.find((user) => user.client.id === client.id);

    if (!user?.owner) return;

    for (const user of users) {
      if (!user.ready) return;
    }

    const handler = new GameHandler(room, client.server);
    handler.start();
  },
};
