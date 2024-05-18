import { created } from "../../emits";
import { IEvent } from "../../interfaces/IEvent";

export const NewUser: IEvent<void> = {
  name: "user/new",
  protections: {
    id: false,
    room: false,
  },

  handler(client, body) {
    client.id = crypto.randomUUID();
    created(client);
    console.log(`👤 Client ${client.id} register`);
  },
};
