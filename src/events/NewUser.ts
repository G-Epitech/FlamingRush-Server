import Client from "../class/Client";
import { IEvent } from "../interfaces/IEvent";

export const NewUser: IEvent<void> = {
  name: "newUser",

  handler(client, body) {
  },
};
