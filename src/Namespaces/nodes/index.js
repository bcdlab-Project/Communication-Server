// ------------ Nodes NameSpace ------------ //
module.exports = function (io,metric,db) {
  const nodesNamespace = io.of("/nodes");
  var speakeasy = require("speakeasy");

  // ------------ Authentication Event ------------ //
  nodesNamespace.use(async (socket, next) => {
    // Check Auth
    if (socket.handshake.auth == undefined || socket.handshake.auth.nodeId == undefined || socket.handshake.auth.token == undefined) { return next(new Error("No Auth Provided")); }

    // Check if Node Exists
    if (!await db.isNode(socket.handshake.auth.nodeId)) { return next(new Error("Invalid Auth Provided")); }

    // Check if Node is already connected
    if (await db.isNodeConnected(socket.handshake.auth.nodeId)) { return next(new Error("Node already connected")); }

    // Authenticate Node
    if (speakeasy.totp.verify({
      secret: await db.getNodeToken(socket.handshake.auth.nodeId),
      encoding: 'base32',
      token: socket.handshake.auth.token,
      step: 15,
      digits: 10
    })) { return next(); }

    // Register Failed Auth
    metric.nodeAuthFailed();
    next(new Error("Invalid Auth Provided"));
  });
    
    nodesNamespace.on("connection", async (socket) => {
      // ------------ Connection Event ------------ //

      // Register Node Connection
      metric.nodeConnected();

      // Prepare Node
      socket.nodeId = socket.handshake.auth.nodeId;

      // Register Connection on Database
      await db.setConnection(socket.nodeId, socket.id);

      // Log Connection
      console.log("Node Connected | Node ID: ", socket.nodeId);

      // Prepare Socket Room
      socket.leaveAll();
      socket.join(socket.nodeId);
    
      // ------------ Disconnection Event ------------ //
      socket.on("disconnect", async () => {
        // Register Disconnection
        metric.nodeDisconnected();

        // Register Disconnection on Database
        await db.setDisconnection(socket.nodeId);

        // Log Disconnection
        console.log("Node Disconnected | Node ID: ", socket.nodeId);
      });
    });
  }