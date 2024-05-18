import { NewUser } from "./new-user";
import { Login } from "./login";
import { CreateRoom } from "./rooms/create-room";
import { JoinRoom } from "./rooms/join-room";

const events = [NewUser, Login, CreateRoom, JoinRoom];

export default events;
