import { IEvent } from "../interfaces/IEvent";

type LoginPayload = {
  id: string;
}

export const Login: IEvent<LoginPayload> = {
  name: "login",

  handler(client, payload) {
    client.id = payload.id;
  },
};
