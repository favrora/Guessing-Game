const { botMessages } = require('./botMessages.js');

let usersConnected = new Map();

// Handle new socket connections
const handleChatConnection = (socket) => {
  let { id } = socket.client;

  // Listen for 'user nickname' event
  socket.on("user nickname", (nickname) => {
    usersConnected.set(nickname, [socket.client.id, socket.id]);

    socket.broadcast.emit("users-on", Array.from(usersConnected.keys()));

    socket.emit("user-data", [nickname, socket.client.id]);

    botMessages(socket);
  });

  // Listen for 'chat message' events from the client
  socket.on("chat message", ({ nickname, msg }) => {
    socket.broadcast.emit("chat message", { nickname, msg });
  });

  // Handle socket disconnections
  socket.on("disconnect", () => {
    let tempUserNickname;

    // Find the nickname of the disconnected user
    for (let key of usersConnected.keys()) {
      if (usersConnected.get(key)[0] === id) {
        tempUserNickname = key;
        usersConnected.delete(key);
        break;
      }
    }

    // Broadcast the updated list of connected users
    socket.broadcast.emit("users-on", Array.from(usersConnected.keys()));

    // Broadcast the nickname of the disconnected user
    socket.broadcast.emit("user-disconnected", tempUserNickname);
  });
};

module.exports = {
  handleChatConnection,
};
