const server = require("http").createServer();
const { Server } = require("socket.io");
const { instrument } = require("@socket.io/admin-ui");

console.log('\nbcdLab Communication Server Started\n');

const io = new Server(server, {
  cors: {
    origin: ["null","https://admin.socket.io","http://192.168.22.48"],
    credentials: true
  }
});

const MetricServer = require('./src/MetricsServer');

const metric = new MetricServer();
metric.start();


require('./src/Namespaces/nodes')(io,metric.namespaceEvents);
require('./src/Namespaces/web')(io,metric.namespaceEvents);

// io.on('connection', (socket) => {
//   console.log('new connection');
//   socket.on('chat message', (msg) => {
//     console.log('message: ' + msg);
//   });
//   socket.on('disconnect', () => {
//     console.log('connection closed');
//   });
// });

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
  console.log('socket.io Server listening on *:3000\n');
});