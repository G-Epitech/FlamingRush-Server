import { Server } from "../../Server";
import Room from "../../class/Room";

export function startRound(room: Room, server: Server) {
  server.io.to(room.id).emit("room/start-round", {
    type: room.game?.type,
  });
}
