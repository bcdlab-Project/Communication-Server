const server         = require("http").createServer();
const { Server }     = require("socket.io");
const { instrument } = require("@socket.io/admin-ui");

// Service Start Message
console.log('\nbcdLab Communication Server Started\n');

// ------------ Prepare Configs ------------ //
const config = require('./config')();

// ------------ Prepare Socket.IO Server with CORS ------------ //
const io = new Server(server, {
  cors: {
    origin: config.cors,
    credentials: true
  }
});

// ------------ Prepare and Start Metrics Server ------------ //
const MetricServer = require('./src/MetricsServer');
const metric = new MetricServer();
metric.start();

// ------------ Prepare and Connect to Database ------------ //
const DataBase = require('./src/Database');
const db = new DataBase();
db.connect();

// Reset currently running nodes
db.resetNodes();

// ------------ Define NameSpaces ------------ //
require('./src/Namespaces/nodes')(io,metric.namespaceEvents,db.namespaces.nodes);
//require('./src/Namespaces/web')(io,metric.namespaceEvents,db);

// Refuse Main NameSpace Connections
io.use((socket, next) => {
  return next(new Error("Not Authorized"));
});

// ------------ Config for Admin UI ------------ //
instrument(io, {
  auth: {
    type: "basic",
    username: config.webUi_username,
    password: config.webUi_password // "changeit" encrypted with bcrypt
  },
  readonly: config.webUi_readonly,
  mode: config.webUi_mode,
});

// ------------ Start the Server ------------ //
server.listen(3000, () => {
  console.log('socket.io Server listening on *:3000\n');
});