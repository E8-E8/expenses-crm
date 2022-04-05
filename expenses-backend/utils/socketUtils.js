const socketIo = require("socket.io");

exports.sio = (server) => {
  return socketIo(server, {
    transport: ["polling"],
    cors: { origin: "*" },
  });
};

exports.connection = (io) => {
  io.on("connection", (socket) => {
    socket.emit("connection", null);

    socket.on("reload-app", () => {
      io.sockets.emit("reload-page", null);
    });

    socket.on("disconnect", () => {});
  });
};
