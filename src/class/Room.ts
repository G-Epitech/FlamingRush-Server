import { updated } from "../emits";
import { IGame } from "../interfaces/IGame";
import Client from "./Client";
import User from "./User";

export default class Room {
    private _users: User[];
    public readonly id: string;
    public game?: IGame;

    constructor(id: string) {
        this._users = [];
        this.id = id;
        this.game = undefined;
    }

    get users() {
        return this._users;
    }

    private set users(users: User[]) {
        this._users = users;
    }

    register(client: Client, name: string, profilePicture: number) {
        if (this.users.length >= 4 || !client.id)
            return;
        const user = new User(client, name, profilePicture);
        this.users.push(user);

        if (this.users.length === 1) {
            user.owner = true;
            user.ready = true;
        }

        client.socket.join(this.id);
        client.room = this;
        updated(this, client.server);
    }

    leave(client: Client) {
        const user = this.users.find(user => user.client.id === client.id);
        if (!user) return;

        user.client.socket.leave(this.id);
        user.client.room = undefined;
        this.users = this.users.filter(user => user.client !== client);
        updated(this, client.server);
    }

    initializeGame() {
        if (!this.game) return;
        for (const [event, callback] of this.game.events) {
            for (const user of this.users) {
                if (user.client.id) {
                    user.client.socket.on(
                        `games/${this.game.type}/${event}`,
                        (payload: any) => callback(user, payload)
                    );
                }
            }
        }
        this.game.initialize();
    }

    tearDownGame() {
        if (!this.game) return;
        for (const [event] of this.game.events) {
            for (const user of this.users) {
                if (user.client.id)
                    user.client.socket.removeAllListeners(`games/${this.game.type}/${event}`);
            }
        }
        this.game.tearDown();
    }
}
