import express from "express";
import http from "http";
import { Server } from "socket.io";
import path from "path";
import cors from "cors";
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const { handleChatConnection } = require("./src/controllers/chatController");

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 8080;

// Middleware to enable CORS and serve static files from React app
app.use(cors());
app.use(express.static(path.join(process.cwd(), 'build')));

// Initialize Socket.IO with CORS configuration
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Update with your frontend origin
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  },
});

// Initialize Socket.IO connection handler
io.on("connection", handleChatConnection);

// Serve React app for any unspecified routes
app.get('*', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'build', 'index.html'));
});

// Start the server
server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
