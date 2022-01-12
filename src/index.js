const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const SocketIO = require("socket.io");
const path = require("path");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
dotenv.config();

const server = app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}`);
});

const io = SocketIO(server)

io.on('connection', (socket)=>{
    console.log('new connection', socket.id)
    socket.on('chat:everybody',(data)=>{
        io.sockets.emit('chat:everybody', data)
    })
    socket.on('chat:typing',(data)=>{
        socket.broadcast.emit('chat:typing', data)
    })
})