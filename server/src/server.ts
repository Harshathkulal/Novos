import app from "./app";
import connectDB from "./db/database";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import { setupSocket } from "./socket/socket";

dotenv.config();

const PORT = process.env.PORT || 5001;

connectDB();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

setupSocket(io);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
