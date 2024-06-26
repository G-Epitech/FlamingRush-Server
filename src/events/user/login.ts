import { IEvent } from "../../interfaces/IEvent";

type LoginPayload = {
  id: string;
}

export const Login: IEvent<LoginPayload> = {
  name: "user/login",
  protections: {
    id: false,
    room: false,
  },

  handler(client, payload) {
    client.id = payload.id;
    console.log(`👤 Client ${client.id} logged in`);
  },
};
