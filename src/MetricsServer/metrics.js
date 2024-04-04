module.exports = function (promClient) {
    const { Counter, Gauge } = promClient;
  
    return {
        connectedSockets: new Gauge({
            name: 'socket_io_connected',
            help: 'Number of currently connected sockets'
        }),
    
        // Nodes Metrics

        connectedNodes: new Gauge({
            name: 'socket_io_connected_nodes',
            help: 'Total count of nodes connected'
        }),

        // Web Metrics

        connectedWeb: new Gauge({
            name: 'socket_io_connected_web',
            help: 'Total count of web connected'
        }),

        // Events Metrics

        connectTotal: new Counter({
            name: 'socket_io_connect_total',
            help: 'Total count of socket.io connection requests'
        }),
    
        disconnectTotal: new Counter({
            name: 'socket_io_disconnect_total',
            help: 'Total count of socket.io disconnections'
        }),
    };
}