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

const webUserNamespace = io.of("/web");
const nodesNamespace = io.of("/nodes");

nodesNamespace.use((socket, next) => {
  if (socket.handshake.auth.token) {
    return next();
  }
  next(new Error("invalid token"));
});

nodesNamespace.on("connection", (socket) => {
  // Startup of Node Connection
  socket.nodeId = socket.handshake.auth.nodeId;
  console.log("New Node Connected | Node ID: ", socket.nodeId);
  socket.leaveAll();
  socket.join(socket.nodeId);

  socket.on("disconnect", () => {
    console.log("Node Disconnected | Node ID: ", socket.nodeId);
  });
});

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
  auth: false,
  mode: "development",
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});