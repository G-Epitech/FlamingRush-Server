import { IEvent } from "../../interfaces/IEvent";

export const StartGame: IEvent<void> = {
  name: "startGame",
  protections: {
    id: true,
    room: true,
  },

  handler(client, payload) {
    const users = client.room?.users || [];
    const user = users.find((user) => user.client.id === client.id);

    if (!user?.owner)
        return;

    for (const user of users) {
      if (!user.ready && !user.owner) return;
    }
  },
};
