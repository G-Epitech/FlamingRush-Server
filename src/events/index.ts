import { NewUser } from "./new-user";
import { Login } from "./login";
import { CreateRoom } from "./rooms/create-room";
import { JoinRoom } from "./rooms/join-room";
import { StartGame } from "./rooms/start-game";

const events = [NewUser, Login, CreateRoom, JoinRoom, StartGame];

export default events;
