import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

let rooms: Record<string, { users: string[], messages: { user: string, text: string }[] }> = {};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join_room", ({ room, user }) => {
    socket.join(room);
    if (!rooms[room]) rooms[room] = { users: [], messages: [] };
    rooms[room].users.push(user);
    io.to(room).emit("room_users", rooms[room].users);
    io.to(room).emit("message_history", rooms[room].messages);
  });

  socket.on("send_message", ({ room, user, text }) => {
    const message = { user, text };
    rooms[room].messages.push(message);
    io.to(room).emit("receive_message", message);
  });

  socket.on("disconnecting", () => {
    for (const room of socket.rooms) {
      if (rooms[room]) {
        rooms[room].users = rooms[room].users.filter((u) => u !== socket.id);
        io.to(room).emit("room_users", rooms[room].users);
      }
    }
  });
});

server.listen(4000, () => console.log("🚀 Server running on port 4000"));