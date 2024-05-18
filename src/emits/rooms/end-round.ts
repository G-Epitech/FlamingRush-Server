import { Server } from "../../Server";
import Room from "../../class/Room";

export function endRound(room: Room, server: Server) {
  server.io.to(room.id).emit("room/end-round", {
    type: room.game?.type,
  });
}
