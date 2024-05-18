import { accountCreated } from "../emits";
import { IEvent } from "../interfaces/IEvent";

export const NewUser: IEvent<void> = {
  name: "newUser",
  protected: false,

  handler(client, body) {
    client.id = crypto.randomUUID();
    accountCreated(client);
  },
};
