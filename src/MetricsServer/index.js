// ------------ Metrics Server ------------ //
module.exports = class MetricServer {
    #metricsServer;
    constructor() {
        // ------------ Prepare Metrics Server ------------ //
        const promRegister = require('prom-client').register;
        this.#metricsServer = require('http').createServer()

        // Metrics Server Error Handler
        this.#metricsServer.on('error', (err) => {
            console.error(err);
        });

        // Metrics Server Web Request Handler
        this.#metricsServer.on('request', async (request, res) => {
            res.writeHead(200, { 'Content-Type': promRegister.contentType });
            res.end(await promRegister.metrics());
        });

        // Prepare Metrics Configuration
        this.metrics = require('./metrics.js') (require('prom-client'));

        // Prepare Metrics Events
        this.namespaceEvents = new (require('./namespaceEvents.js'))(this);
    }

    // ------------ Metrics Server Functions ------------ //

    // Start Metrics Server
    start() {
        this.#metricsServer.listen(9090, () => {
            console.log('Metrics server listening on *:9090');
        });
    }

    // Register Connection
    Connection() {
        this.metrics.connectedSockets.inc();
        this.metrics.connectTotal.inc();
    }

    // Register Disconnection
    Disconnection() {
        this.metrics.connectedSockets.dec();
        this.metrics.disconnectTotal.inc();
    }
}