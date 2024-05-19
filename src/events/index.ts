import {NewUser} from "./user/new";
import {Login} from "./user/login";
import {CreateRoom} from "./rooms/create";
import {JoinRoom} from "./rooms/join";
import {StartGame} from "./rooms/start-round";
import {UserReady} from "./rooms/user-ready";
import { StatusRoom } from "./rooms/status";
import {LeaveRoom} from "./rooms/leave";

const events = [
    NewUser,
    Login,
    CreateRoom,
    JoinRoom,
    StartGame,
    UserReady,
    StatusRoom,
    LeaveRoom
];

export default events;
