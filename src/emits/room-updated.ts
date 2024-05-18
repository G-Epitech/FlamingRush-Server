import { Server } from "../Server";
import Room from "../class/Room";

export function roomUpdated(room: Room, server: Server) {
  server.io.to(room.id).emit("roomUpdated", {
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
