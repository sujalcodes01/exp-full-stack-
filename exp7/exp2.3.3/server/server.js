const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// ✅ users store
let users = {};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // ✅ user join
  socket.on("join", (username) => {
    users[socket.id] = username;
    console.log(username + " joined");

    // user list update
    io.emit("user_list", Object.values(users));

    // 🔥 system message (join)
    io.emit("receive_message", `🔵 ${username} joined the chat`);
  });

  // ✅ message send
  socket.on("send_message", (data) => {
    io.emit("receive_message", data);
  });

  // ✅ typing start
  socket.on("typing", (username) => {
    socket.broadcast.emit("typing", username);
  });

  // ✅ typing stop
  socket.on("stop_typing", () => {
    socket.broadcast.emit("stop_typing");
  });

  // ✅ disconnect
  socket.on("disconnect", () => {
    const username = users[socket.id];

    console.log("User disconnected:", socket.id);

    delete users[socket.id];

    // user list update
    io.emit("user_list", Object.values(users));

    // 🔥 system message (leave)
    if (username) {
      io.emit("receive_message", `🔴 ${username} left the chat`);
    }
  });
});

// server start
server.listen(5000, () => {
  console.log("Server running on port 5000");
});