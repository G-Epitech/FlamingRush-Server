import {NewUser} from "./user/new-user";
import {Login} from "./user/login";
import {CreateRoom} from "./rooms/create-room";
import {JoinRoom} from "./rooms/join-room";
import {StartGame} from "./rooms/start-game";
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
