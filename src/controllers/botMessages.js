// Function to send bot messages at intervals
const botMessages = (socket) => {
  const messages = [
    { delay: 2000, nickname: "Bot 1", msg: "Welcome to the arena!" },
    { delay: 5000, nickname: "Bot 2", msg: "Choose your multiplier carefully." },
    { delay: 8000, nickname: "Bot 1", msg: "Good luck in the next round!" },
  ];

  const timers = messages.map(({ delay, ...message }) =>
    setTimeout(() => socket.emit("chat message", message), delay),
  );

  return () => timers.forEach(clearTimeout);
};

module.exports = {
  botMessages,
};
