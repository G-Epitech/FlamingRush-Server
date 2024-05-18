import Client from "../class/Client";

export interface IEvent<T> {
    readonly name: string;
    readonly protections: {
        id: boolean;
        room: boolean;
    };
    handler: (client: Client, payload: T) => void;
}
