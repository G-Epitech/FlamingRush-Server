import Client from "../class/Client";

export function accountCreated(client: Client) {
  client.socket.emit("accountCreated", {
    id: client.id,
  });
}
