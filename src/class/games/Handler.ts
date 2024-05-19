import games from ".";
import {Server} from "../../Server";
import {startRound, state} from "../../emits";
import Room from "../Room";
import {initialized} from "../../emits/games/initialized";
import {endRound} from "../../emits/rooms/end-round";

export default class GameHandler {
    private readonly room: Room;
    private readonly server: Server;

    constructor(room: Room, server: Server) {
        this.room = room;
        this.server = server;
    }

    private readonly levels = [
        {level: 1, from: 1},
        {level: 2, from: 5},
        {level: 3, from: 10},
        {level: 4, from: 15},
        {level: 5, from: 25}
    ];

    private getLevel(score: number) {
        return this.levels.find((level) => score >= level.from)!.level;
    }

    public async start() {
        let gameIndex = 0;

        while (this.room.lives > 0) {
            /// Choose game of round
            const level = this.getLevel(this.room.round);
            const previousGameIndex = gameIndex;
            while (gameIndex === previousGameIndex)
                gameIndex = Math.floor(Math.random() * games.length);
            const game = games[gameIndex];
            this.room.game = new game(this.room, this.server);

            /// Start round
            startRound(this.room, this.server);

            /// Initialize game
            this.initialize();

            /// Run game
            const stateInterval = this.emitState();
            const won = await this.room.game.run();

            /// Stop game and wait for next round
            clearInterval(stateInterval);
            this.room.tearDownGame();
            this.room.users.map((user) => (user.ready = false));
            endRound(this.room, this.server);

            /// Update score
            this.room.updateLives(won);

            // Wait for all users to be ready
            while (this.room.users.some((user) => !user.ready)) {
                await new Promise((resolve) => setTimeout(resolve, 100));
            }
            this.room.round += 1;
        }
    }

    private emitState() {
        return setInterval(() => {
            state(this.room, this.server);
        }, 30);
    };

    private initialize() {
        this.room.initializeGame();
        initialized(this.room, this.server);
    }
}
