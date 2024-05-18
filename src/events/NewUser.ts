import Client from "../class/Client";
import { accountCreated } from "../emits";
import { IEvent } from "../interfaces/IEvent";

export const NewUser: IEvent<void> = {
  name: "newUser",

  handler(client, body) {
    client.id = crypto.randomUUID();
    accountCreated(client);
  },
};
