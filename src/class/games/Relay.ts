import {GameType, IGame} from "../../interfaces/IGame";
import Room from "../Room";
import {Server} from "../../Server";

export default class Relay implements IGame {
    type: GameType = "relay";

    private room: Room;
    private server: Server;

    constructor(room: Room, server: Server) {
        this.room = room;
        this.server = server;
    }

    async run() {
        console.log("Starting Relay game");
        return false;
    }

    public initialize() {
        console.log("Initializing Relay game");
    }

    public tearDown() {

    }

    getPayload() {
        return {
            type: this.type
        };
    }
}
