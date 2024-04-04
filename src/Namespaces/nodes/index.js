module.exports = function (io,metric) {
  const nodesNamespace = io.of("/nodes");

  nodesNamespace.use(async (socket, next) => {
    let formdt = new FormData();
    formdt.append("connectionId", socket.id);
    formdt.append("nodeId", socket.handshake.auth.nodeId);
    formdt.append("token", socket.handshake.auth.token);

    var response = await fetch("http://192.168.22.48/api/nodes/auth", {
      method: "POST",
      body: formdt
    })

    if (response.status == 200) {
      return next();
    }
    metric.nodeAuthFailed();
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