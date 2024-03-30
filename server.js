const { createServer } = require("http");
const { Server } = require("socket.io");
const { instrument } = require("@socket.io/admin-ui");

const server = createServer();

const io = new Server(server, {
  cors: {
    origin: ["null","https://admin.socket.io","http://192.168.22.48"],
    credentials: true
  }
});

require('./namespaces')(io);

io.on('connection', (socket) => {
  console.log('new connection');
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
  });
  socket.on('disconnect', () => {
    console.log('connection closed');
  });
});

instrument(io, {
  auth: {
    type: "basic",
    username: "admin",
    password: "$2b$10$heqvAkYMez.Va6Et2uXInOnkCT6/uQj1brkrbyG3LpopDklcq7ZOS" // "changeit" encrypted with bcrypt
  },
  readonly: true,
  mode: "development",
});

server.listen(3000, () => {
  console.log('\nbcdLab Communication Server Started')
  console.log('listening on *:3000\n');
});