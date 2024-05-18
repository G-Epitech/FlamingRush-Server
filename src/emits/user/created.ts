import Client from "../../class/Client";

export function created(client: Client) {
  client.socket.emit("user/created", {
    id: client.id,
  });
}
