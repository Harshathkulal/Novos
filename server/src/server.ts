import "./config/env";
import connectDB from "./db/database";
import app from "./app";
import http from "http";
import { Server } from "socket.io";
import { setupSocket } from "./socket/socket";

const PORT = process.env.PORT!;

connectDB();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL!,
    methods: ["GET", "POST"],
  },
});

setupSocket(io);

io.on("connection", (socket) => {
  console.log("socket connected:", socket.id);
});

server.listen(PORT, () => {
  console.log(`Server running on Port:${PORT}`);
});
