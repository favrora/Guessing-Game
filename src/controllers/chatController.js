const { botMessages } = require('./botMessages.js');

const usersConnected = new Map();
const MAX_NICKNAME_LENGTH = 24;
const MAX_MESSAGE_LENGTH = 300;

const getOnlineUsers = () => Array.from(usersConnected.values());

// Handle new socket connections
const handleChatConnection = (socket) => {
  socket.on("user nickname", (nickname) => {
    if (typeof nickname !== "string") return;

    const normalizedNickname = nickname.trim().slice(0, MAX_NICKNAME_LENGTH);
    if (normalizedNickname.length < 3) return;

    usersConnected.set(socket.id, normalizedNickname);
    socket.nsp.emit("users-on", getOnlineUsers());
    socket.emit("user-data", normalizedNickname);

    const cancelBotMessages = botMessages(socket);
    socket.once("disconnect", cancelBotMessages);
  });

  socket.on("chat message", ({ nickname, msg }) => {
    if (typeof msg !== "string") return;

    const normalizedMessage = msg.trim().slice(0, MAX_MESSAGE_LENGTH);
    if (!normalizedMessage) return;

    socket.broadcast.emit("chat message", {
      nickname: usersConnected.get(socket.id) || String(nickname).slice(0, MAX_NICKNAME_LENGTH),
      msg: normalizedMessage,
    });
  });

  socket.on("disconnect", () => {
    const disconnectedUser = usersConnected.get(socket.id);
    usersConnected.delete(socket.id);
    socket.nsp.emit("users-on", getOnlineUsers());
    if (disconnectedUser) {
      socket.broadcast.emit("user-disconnected", disconnectedUser);
    }
  });
};

module.exports = {
  handleChatConnection,
};
