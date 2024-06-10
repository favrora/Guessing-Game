const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");
const cors = require("cors");
const { handleChatConnection } = require("./src/controllers/chatController");

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 8080;

// Middleware to enable CORS
const allowedOrigins = ["http://localhost:3000"]; // Specify allowed origins

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
  credentials: true,
}));

// Initialize Socket.IO with CORS configuration
const io = socketIo(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  },
});

// Initialize Socket.IO connection handler
io.on("connection", handleChatConnection);

// Middleware to serve static files from React app
app.use(express.static(path.join(__dirname, 'build')));

// Serve React app for any unspecified routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server
server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
