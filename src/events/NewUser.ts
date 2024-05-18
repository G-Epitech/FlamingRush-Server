import Client from "../class/Client";
import { IEvent } from "../interfaces/IEvent";

export const NewUser: IEvent = {
  name: "newUser",

  handler(client: Client, body: any) {
    console.log("New user!");
  },
};
