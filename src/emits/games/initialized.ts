import { Server } from "../../Server";
import Room from "../../class/Room";

export function initialized(room: Room, server: Server) {
  server.io.to(room.id).emit("games/init", room.game?.getPayload());
}
