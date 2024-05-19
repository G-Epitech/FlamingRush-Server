import {GameType, IGame} from "../../interfaces/IGame";
import Room from "../Room";
import {Server} from "../../Server";
import {shuffle} from "../../utils/shuffle";
import User from "../User";

type Position = 0 | 1 | 2 | 3;

type Obstacle = "bird" | "tin-can";

export default class Relay implements IGame {
    type: GameType = "relay";

    private room: Room;
    private server: Server;

    public readonly events: [string, (user: User, payload: any) => void][] = [
        ["collide", this.onCollide.bind(this)],
        ["obstacle-cleanup", this.onObstacleCleanup.bind(this)],
        ["tap", this.onTap.bind(this)],
        ["pass", this.onPass.bind(this)],
    ];

    private runners: Record<string, Position> = {};

    private currentRunner: Position = 1;

    private obstacles: Record<string, Obstacle> = {};

    private remainingTime = 0;

    private nextObstacleTimeout: NodeJS.Timeout | undefined = undefined;

    private distance= 0;

    private transitionZone = false;

    constructor(room: Room, server: Server) {
        this.room = room;
        this.server = server;
    }

    async run() {
        this.scheduleNextObstacle();

        while (this.remainingTime > 0) {
            await this.tick();
        }
        return false;
    }

    public initialize() {
        const positions: Position[] = shuffle([0, 1, 2, 3]);
        for (const user of this.room.users) {
            if (user.client.id)
                this.runners[user.client.id] = positions.pop()!;
        }
        this.currentRunner = 0;
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

    private onTap(user: User, payload: void) {
        console.log(`[RELAY] ${user.name} tapped`);
        if (this.runners[user.client.id!] !== this.currentRunner)
            return;
        this.distance += 1;
        if (this.distance >= 90)
            this.transitionZone = true;
    }

    private onPass(user: User, payload: void) {
        console.log(`[RELAY] ${user.name} passed relay to next runner`);
        if (this.transitionZone) {
            this.currentRunner += 1;
            this.distance = 0;
            this.transitionZone = false;
        }
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
            remainingTime: this.remainingTime,
            distance: this.distance,
            transitionZone: this.transitionZone,
        };
    }
}
