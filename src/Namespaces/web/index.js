// ------------ WebUsers NameSpace ------------ //

// module.exports = function (io) {
//     const webUserNamespace = io.of("/web");
  
//     nodesNamespace.use((socket, next) => {
//         if (socket.handshake.auth.token) {
//           return next();
//         }
//         next(new Error("invalid token"));
//       });
      
//       nodesNamespace.on("connection", (socket) => {
//         // Startup of Node Connection
//         socket.nodeId = socket.handshake.auth.nodeId;
//         console.log("New Node Connected | Node ID: ", socket.nodeId);
//         socket.leaveAll();
//         socket.join(socket.nodeId);
      
//         socket.on("disconnect", () => {
//           console.log("Node Disconnected | Node ID: ", socket.nodeId);
//         });
//       });
//     }