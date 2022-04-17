import { io } from "socket.io-client";

const SERVER = "http://localhost:5000";

const socket = io.connect(SERVER);

export default socket;
