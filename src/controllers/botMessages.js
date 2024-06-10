// Function to send bot messages at intervals
const botMessages = (socket) => {
  setTimeout(() => {
    socket.emit("chat message", {
      nickname: "Bot 1",
      msg: "hi guys",
    });
  }, 2000);

  setTimeout(() => {
    socket.emit("chat message", {
      nickname: "Bot 2",
      msg: "hi men",
    });
  }, 5000);

  setTimeout(() => {
    socket.emit("chat message", {
      nickname: "Bot 1",
      msg: "I could play this game for hours!",
    });
  }, 8000);
};

module.exports = {
  botMessages,
};
