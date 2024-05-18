import Client from "./Client";

export default class User {
    public readonly client: Client;
    public readonly name: string;
    public readonly profilePicture: number;
    public owner: boolean;
    public ready: boolean;

    constructor(client: Client, name: string, profilePicture: number) {
        this.client = client;
        this.name = name;
        this.profilePicture = profilePicture;
        this.owner = false;
        this.ready = false;
    }
}
