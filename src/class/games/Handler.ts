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


    public async start() {
        let gameIndex = 0;

        while (this.room.lives > 0) {
            /// Choose game of round
/*            const previousGameIndex = gameIndex;
            while (gameIndex === previousGameIndex)
                gameIndex = Math.floor(Math.random() * games.length);*/
            const game = games[1];
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
            this.room.updateLives(won);

            /// Update score
            console.log(`[ROOM] Room ${this.room.id} won: ${won}`);
            endRound(this.room, this.server);
            console.log(`[ROOM] Room ${this.room.id} lives: ${this.room.lives}`);
            console.log(`[ROOM] Room ${this.room.id} round: ${this.room.round}`);


            // Wait for all users to be ready
            while (this.room.users.some((user) => !user.ready)) {
                await new Promise((resolve) => setTimeout(resolve, 100));
            }
            this.room.round += 1;
        }

        this.room.users.map((user) => {
            user.client.room = undefined;
        })
        delete this.server.rooms[this.room.id];
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
