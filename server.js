const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");
const fs = require("fs");
const { handleChatConnection } = require("./src/controllers/chatController");

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 8080;
const clientDirectory = path.join(__dirname, "dist");

app.disable("x-powered-by");
app.get("/health", (_request, response) => response.json({ status: "ok" }));

const io = new Server(server);

io.on("connection", handleChatConnection);

if (fs.existsSync(clientDirectory)) {
  app.use(express.static(clientDirectory));
  app.get("*", (_request, response) => {
    response.sendFile(path.join(clientDirectory, "index.html"));
  });
}

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
