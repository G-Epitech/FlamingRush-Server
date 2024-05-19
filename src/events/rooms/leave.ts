import { IEvent } from "../../interfaces/IEvent";
import Room from "../../class/Room";

export const LeaveRoom: IEvent<void> = {
  name: "room/leave",
  protections: {
    id: true,
    room: true,
  },

  handler(client, payload) {
    client.room?.leave(client);
  }
};
