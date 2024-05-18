import { Server } from "./src/server";
import dotenv from "dotenv";

dotenv.config();

const port = Number(process.env.PORT) || 3000;
const server = new Server(port);
server.start();
