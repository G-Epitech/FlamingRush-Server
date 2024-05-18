import Room from "../../class/Room";
import { IEvent } from "../../interfaces/IEvent";

interface CreateRoomPayload {
    name: string;
    profilePicture: number;
}

function generateRoomCode() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";

    let code = "";
    for (let i = 0; i < 3; i++) {
        code += characters[Math.floor(Math.random() * characters.length)];
    }
    for (let i = 0; i < 3; i++) {
        code += numbers[Math.floor(Math.random() * numbers.length)];
    }

    return code;
}

export const CreateRoom: IEvent<CreateRoomPayload> = {
  name: "createRoom",

  handler(client, payload) {
    const room = new Room(generateRoomCode());

    room.register(client, payload.name, payload.profilePicture);
    client.server.rooms[room.id] = room;
  },
};
