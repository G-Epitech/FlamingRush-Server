import Room from "../../class/Room";
import { Server } from "../../Server";

export function updated(room: Room, server: Server) {
  server.io.to(room.id).emit("room/updated", {
    id: room.id,
    users: room.users.map((user) => ({
      id: user.client.id,
      name: user.name,
      profilePicture: user.profilePicture,
      owner: user.owner,
      ready: user.ready,
    })),
  });
}
