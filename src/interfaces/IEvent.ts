import Client from "../class/Client";

export interface IEvent<T> {
    readonly name: string;
    readonly protected: boolean;
    handler: (client: Client, payload: T) => void;
}
