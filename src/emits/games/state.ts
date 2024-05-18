import { Server } from "../../Server";
import Room from "../../class/Room";

export function state(room: Room, server: Server) {
  server.io.to(room.id).emit("games/state", room.game?.getPayload());
}
