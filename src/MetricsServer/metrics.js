// ------------ Metrics Server Configuration ------------ //
module.exports = function (promClient) {
    // Prepare Metrics
    const { Counter, Gauge } = promClient;
  
    return {
        // ------------ Metrics Configuration ------------ //

        // Global Metrics
        connectedSockets: new Gauge({
            name: 'socket_io_connected',
            help: 'Number of currently connected sockets'
        }),
    
        // Nodes Metrics
        connectedNodes: new Gauge({
            name: 'socket_io_connected_nodes',
            help: 'Number of currently connected nodes'
        }),

        authFailedNodes: new Counter({
            name: 'socket_io_auth_failed_nodes',
            help: 'Total count of failed auth attempts on nodes'
        }),

        // Web Metrics
        connectedWeb: new Gauge({
            name: 'socket_io_connected_web',
            help: 'Number of currently connected web users'
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