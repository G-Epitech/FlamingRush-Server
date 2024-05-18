import {NewUser} from "./user/new";
import {Login} from "./user/login";
import {CreateRoom} from "./rooms/create";
import {JoinRoom} from "./rooms/join";
import {StartGame} from "./rooms/start-round";
import {UserReady} from "./rooms/user-ready";

const events = [
    NewUser,
    Login,
    CreateRoom,
    JoinRoom,
    StartGame,
    UserReady
];

export default events;
