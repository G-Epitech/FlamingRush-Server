import Client from "../class/Client";

export interface IEvent<T> {
    readonly name: string;
    handler: (client: Client, body: T) => void;
}
