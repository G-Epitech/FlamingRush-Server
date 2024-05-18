import { IEvent } from "../../interfaces/IEvent";

interface CreateRoomPayload {
    name: string;
    profilePicture: number;
}

export const CreateRoom: IEvent<CreateRoomPayload> = {
  name: "createRoom",

  handler(client, payload) {
  },
};
