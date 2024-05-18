import { IEvent } from "../../interfaces/IEvent";
import Room from "../../class/Room";

type JoinRoomPayload = {
  profilePicture: number;
  name: string;
  code: string;
}

export const JoinRoom: IEvent<JoinRoomPayload> = {
  name: "room/join",
  protections: {
    id: true,
    room: false,
  },

  handler(client, payload) {
    const room: Room | undefined = client.server.rooms[payload.code];

    if (!room)
      return client.socket.emit("roomNotFound");
    return room.register(client, payload.name, payload.profilePicture);
  }
};
