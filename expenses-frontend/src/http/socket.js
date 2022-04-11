import { io } from "socket.io-client";

const SERVER = "https://nodejs.rbs.md:5000";

const socket = io.connect(SERVER);

export default socket;
