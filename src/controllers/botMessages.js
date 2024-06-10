// Function to send bot messages at intervals
export const botMessages = (socket) => {
  setTimeout(() => {
    socket.emit("chat message", {
      nickname: "CPU 1",
      msg: "hi guys",
    });
  }, 2000);

  setTimeout(() => {
    socket.emit("chat message", {
      nickname: "CPU 2",
      msg: "hi men",
    });
  }, 5000);

  setTimeout(() => {
    socket.emit("chat message", {
      nickname: "CPU 1",
      msg: "I could play this game for hours!",
    });
  }, 8000);
};
