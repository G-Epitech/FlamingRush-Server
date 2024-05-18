import { IEvent } from "../../interfaces/IEvent";
import {updated} from "../../emits";

export const UserReady: IEvent<void> = {
  name: "room/user-ready",
  protections: {
    id: true,
    room: true,
  },

  handler(client, payload) {
    const room = client.room;
    let user = room?.users.find(user => user.client.id === client.id);

    if (room && user) {
      user.ready = true;
      updated(room, client.server);
    }
  }
};
