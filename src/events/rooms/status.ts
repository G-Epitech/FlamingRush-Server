import { IEvent } from "../../interfaces/IEvent";
import Room from "../../class/Room";
import { updated } from "../../emits";

type JoinRoomPayload = {
  profilePicture: number;
  name: string;
  code: string;
}

export const StatusRoom: IEvent<JoinRoomPayload> = {
  name: "room/status",
  protections: {
    id: true,
    room: true,
  },

  handler(client, payload) {
    const room = client.room!;

    updated(room, client.server);
  }
};
