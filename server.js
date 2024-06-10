const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 8080;

let usersConnected = new Map();

io.on("connection", (socket) => {
  let { id } = socket.client;

  socket.on("user nickname", (nickname) => {
    usersConnected.set(nickname, [socket.client.id, socket.id]);
    io.emit("users-on", Array.from(usersConnected.keys()));
    io.emit("user-data", [nickname, socket.client.id]);
    botMessages(socket);
  });

  function botMessages(socket) {
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
  }

  socket.on("chat message", ({ nickname, msg }) => {
    socket.broadcast.emit("chat message", { nickname, msg });
  });

  socket.on("disconnect", () => {
    let tempUserNickname;

    for (let key of usersConnected.keys()) {
      if (usersConnected.get(key)[0] === id) {
        tempUserNickname = key;
        usersConnected.delete(key);
        break;
      }
    }
    io.emit("users-on", Array.from(usersConnected.keys()));
    socket.broadcast.emit("user-disconnected", tempUserNickname);
  });
});

// Middleware to serve static files from React app
app.use(express.static(path.join(__dirname, 'build')));

// Serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

server.listen(PORT, () => console.log(`Listen on *: ${PORT}`));
