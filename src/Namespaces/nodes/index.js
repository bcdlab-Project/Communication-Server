module.exports = function (io,metric) {
  const nodesNamespace = io.of("/nodes");

  nodesNamespace.use((socket, next) => {
      if (socket.handshake.auth.token) {
        return next();
      }
      next(new Error("invalid token"));
    });
    
    nodesNamespace.on("connection", (socket) => {
      metric.nodeConnected();

      // Startup of Node Connection
      socket.nodeId = socket.handshake.auth.nodeId;
      console.log("New Node Connected | Node ID: ", socket.nodeId);
      socket.leaveAll();
      socket.join(socket.nodeId);
    
      socket.on("disconnect", () => {
        metric.nodeDisconnected();
        console.log("Node Disconnected | Node ID: ", socket.nodeId);
      });
    });
  }