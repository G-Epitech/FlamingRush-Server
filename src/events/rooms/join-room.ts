import { IEvent } from "../../interfaces/IEvent";
import Room from "../../class/Room";

type JoinRoomPayload = {
  profilePicture: number;
  name: string;
  code: string;
}

export const JoinRoom: IEvent<JoinRoomPayload> = {
  name: "joinRoom",
  protected: true,

  handler(client, payload) {
    const room: Room | undefined = client.server.rooms[payload.code];

    if (!room)
      return client.socket.emit("roomNotFound");
    return room.register(client, payload.name, payload.profilePicture);
  }
};
