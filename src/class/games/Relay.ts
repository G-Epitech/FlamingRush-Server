import {GameType, IGame} from "../../interfaces/IGame";
import Room from "../Room";
import {Server} from "../../Server";
import {shuffle} from "../../utils/shuffle";
import User from "../User";

type Position = 1 | 2 | 3 | 4;

type Obstacle = "bird" | "tin-can";

export default class Relay implements IGame {
    type: GameType = "relay";

    private room: Room;
    private server: Server;

    public readonly events: [string, (user: User, payload: any) => void][] = [
        ["collide", this.onCollide.bind(this)],
        ["obstacle-cleanup", this.onObstacleCleanup.bind(this)]
    ];

    private runners: Record<string, Position> = {};

    private currentRunner: Position = 1;

    private obstacles: Record<string, Obstacle> = {};

    private remainingTime = 0;

    private nextObstacleTimeout: NodeJS.Timeout | undefined = undefined;

    constructor(room: Room, server: Server) {
        this.room = room;
        this.server = server;
    }

    async run() {
        const changingRunnerDelay = this.remainingTime / 4;
        let nextChange = changingRunnerDelay * 3;
        this.scheduleNextObstacle();

        while (this.remainingTime > 0) {
            if (this.remainingTime < nextChange) {
                this.currentRunner++;
                nextChange -= changingRunnerDelay;
            }
            await this.tick();
        }
        return false;
    }

    public initialize() {
        const positions: Position[] = shuffle([1, 2, 3, 4]);
        for (const user of this.room.users) {
            if (user.client.id)
                this.runners[user.client.id] = positions.pop()!;
        }
        this.currentRunner = 1;
        this.remainingTime = 60;
    }

    public async tick() {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        this.remainingTime -= 1;
    }

    public tearDown() {
        clearTimeout(this.nextObstacleTimeout);
    }

    private onCollide(user: User, payload: { obstacle: string }) {
        delete this.obstacles[payload.obstacle];
        /// TODO: Impact runner
        console.log(`Collide with ${payload.obstacle}`);
    }

    private onObstacleCleanup(user: User, payload: { obstacle: string }) {
        delete this.obstacles[payload.obstacle];
        console.log("Obstacle cleanup");
    }

    private generateObstacle() {
        const obstacles: Obstacle[] = ["bird", "tin-can"];
        const obstacle = obstacles[Math.floor(Math.random() * obstacles.length)];
        const obstacleId = crypto.randomUUID();
        this.obstacles[obstacleId] = obstacle;

        console.log(`Generated ${obstacle} with id ${obstacleId}`);
        this.scheduleNextObstacle();
    }

    private scheduleNextObstacle() {
        clearTimeout(this.nextObstacleTimeout);
        const time = Math.floor(Math.random() * 1500) + 1500;
        this.nextObstacleTimeout = setTimeout(() => {
            this.generateObstacle();
            console.log("Next obstacle scheduled");
        }, time);
    }

    getPayload() {
        return {
            type: this.type,
            runners: this.runners,
            currentRunner: this.currentRunner,
            obstacles: this.obstacles,
            time: this.remainingTime,
        };
    }
}
