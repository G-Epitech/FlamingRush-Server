import Client from "../class/Client";

export interface IEvent {
    readonly name: string;
    handler: (client: Client, body: any) => void;
}
