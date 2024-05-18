import {GameType, IGame} from "../../interfaces/IGame";
import Room from "../Room";
import {Server} from "../../Server";
import {shuffle} from "../../utils/shuffle";

type ObstacleType = "alligator" | "log";

type TypedObstacle = {
    readonly type: ObstacleType;
}

type Alligator = TypedObstacle & {
    readonly type: "alligator";
    teeth: number;
    direction: "left" | "right";
}

type Log = TypedObstacle & {
    readonly type: "log";
    length: number;
}

type Obstacle = Alligator | Log;

type Obstacles = Record<string, Obstacle>

type WaterLine = 0 | 1 | 2 | 3;

export default class Canoe implements IGame {
    readonly type: GameType = "canoe";

    private obstaclesLines: [Obstacles, Obstacles, Obstacles, Obstacles];

    private players: Record<string, WaterLine> = {};

    private room: Room;

    private server: Server;

    constructor(room: Room, server: Server) {
        this.room = room;
        this.server = server;
        this.obstaclesLines = [
            {} as Obstacles,
            {} as Obstacles,
            {} as Obstacles,
            {} as Obstacles,
        ];
    }

    async run() {

        return true;
    }

    public initialize() {
        let positions = shuffle<WaterLine>([0, 1, 2, 3]);

        for (const user of this.room.users) {
            if (user.client.id)
                this.players[user.client.id] = positions.pop()!;
        }
    }

    public tearDown() {
        /// TODO: Custom teardown
    }

    getPayload() {
        return {
            type: this.type,
            players: this.players,
        };
    }
}
