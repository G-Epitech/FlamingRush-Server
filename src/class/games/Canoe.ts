import {GameType, IGame} from "../../interfaces/IGame";
import Room from "../Room";
import {Server} from "../../Server";
import {shuffle} from "../../utils/shuffle";
import User from "../User";

const OutOfLine = -1;

type SafeWaterLine = 0 | 1 | 2 | 3;


type WaterLine = SafeWaterLine | typeof OutOfLine;

type Position = {
    x: WaterLine,
    y: WaterLine
};

type Obstacle = "alligator" | "log" | "barrel";

type Obstacles = Record<string, Obstacle>

export default class Canoe implements IGame {
    readonly type: GameType = "canoe";

    public readonly events:[string, (user: User, payload: any) => void][] = [
        ["collide", this.onCollide.bind(this)],
        ["move", this.onMove.bind(this)],
    ];

    private readonly obstaclesLines: [Obstacles, Obstacles, Obstacles, Obstacles];

    private players: Record<string, Position> = {};

    private alligatorsTimeouts: Record<string, NodeJS.Timeout> = {};

    private nbObstacles = 0;

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
        this.onCollide = this.onCollide.bind(this);
    }

    async run() {
        while (this.isRunning()) {
            if (this.nbObstacles > 0)
                await this.scheduleNextObstacle();
        }
        return Object.values(this.players).some((line) => line.x !== OutOfLine || line.y !== OutOfLine);
    }

    public initialize() {
        const x = shuffle<WaterLine>([0, 1, 2, 3]);
        const y = shuffle<WaterLine>([0, 1, 2, 3]);

        for (const user of this.room.users) {
            if (user.client.id)
                this.players[user.client.id] = {
                    x: x.pop() as WaterLine,
                    y: y.pop() as WaterLine,
                }
        }
        this.nbObstacles = 20;
    }

    public tearDown() {
        for (const id in this.alligatorsTimeouts)
            clearTimeout(this.alligatorsTimeouts[id]);
    }

    private generateObstacle() {
        const obstacles: Obstacle[]  = ["alligator", "log", "barrel"];
        const obstacle = obstacles[Math.floor(Math.random() * 3)];
        const obstacleId = crypto.randomUUID();
        const waterLine = Math.floor(Math.random() * 4) as SafeWaterLine;

        if (obstacle === "alligator") {
            const timeout = Math.floor(Math.random() * 500) + 2000;

            this.alligatorsTimeouts[obstacleId] = setTimeout(() => {
                this.alligatorOnMove(obstacleId);
            }, timeout);
        }
        this.obstaclesLines[waterLine][obstacleId] = obstacle;
        console.log(`Obstacle ${obstacle} at line ${waterLine}.`);
        return obstacle;
    }

    private onCollide(user: User, payload: { id: string, obstacle: Obstacle }) {
        if (!user.client.id || !this.players[user.client.id])
            return;
        this.players[user.client.id].y = OutOfLine;
        if (payload.obstacle === "alligator")
            clearTimeout(this.alligatorsTimeouts[payload.id]);
        for (const line of this.obstaclesLines)
            delete line[payload.id];
    }

    private onMove(user: User, payload: { position: Position }) {
        if (!user.client.id || !this.players[user.client.id])
            return;
        if (this.players[user.client.id].y === OutOfLine || this.players[user.client.id].x === OutOfLine)
            return;
        this.players[user.client.id] = payload.position;
    }

    private alligatorOnMove(alligatorId: string) {
        const currentWaterLine = this.obstaclesLines.findIndex((line) => line[alligatorId]);
        const newWaterLine = ((currentWaterLine + 1) % 4) as SafeWaterLine;

        if (currentWaterLine === OutOfLine)
            return;
        this.obstaclesLines[newWaterLine][alligatorId] = this.obstaclesLines[currentWaterLine][alligatorId];
        delete this.obstaclesLines[currentWaterLine][alligatorId];
        console.log(`Alligator ${alligatorId} moved from line ${currentWaterLine} to line ${newWaterLine}.`);
    }

    private async scheduleNextObstacle() {
        const cooldown = Math.floor(Math.random() * 500) + 2000;

        this.generateObstacle();
        this.nbObstacles -= 1;
        return await new Promise((resolve) => { setTimeout(resolve, cooldown) });
    }

    private isRunning() {
        return Object.values(this.players).some(
            (position) => position.x !== OutOfLine || position.y !== OutOfLine
        ) && this.nbObstacles > 0;
    }

    getPayload() {
        return {
            type: this.type,
            players: this.players,
            obstacles: this.obstaclesLines,
        };
    }
}
