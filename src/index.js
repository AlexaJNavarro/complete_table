const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const SocketIO = require("socket.io");
const path = require("path");
const route = require("./router/data");
require("./database/connection");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
dotenv.config();

app.use(route);

const server = app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}`);
});

const io = SocketIO(server);
let connected = 0;

io.on("connection", (socket) => {
  socket.on("chat:everybody", (data) => {
    io.sockets.emit("chat:everybody", data);
  });
  socket.on("chat:typing", (data) => {
    socket.broadcast.emit("chat:typing", data);
  });

  connected = socket.client.conn.server.clientsCount;

  socket.on("disconnect", () => {
    connected -= 1;
    console.log("Total de usuarios conectados: " + connected);
  });

  console.log("Total de usuarios conectados: " + connected);
});
