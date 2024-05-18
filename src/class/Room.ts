import Client from "./Client";
import User from "./User";

export default class Room {
    private users: User[];
    private readonly id: string;

    constructor(id: string) {
        this.users = [];
        this.id = id;
    }

    register(client: Client, name: string, profilePicture: number) {
        const user = new User(client, name, profilePicture);
        this.users.push(user);

        client.socket.join(this.id);
        client.room = this;
        // TODO: Notify other users that this user has joined
    }

    leave(client: Client) {
        const user = this.users.find(user => user.client.id === client.id);
        if (!user) return;

        user.client.socket.leave(this.id);
        user.client.room = undefined;
        this.users = this.users.filter(user => user.client !== client);
        // TODO: Notify other users that this user has left
    }
}
