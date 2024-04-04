module.exports = 
class MetricServer {
    #promRegister;
    #metricsServer;
    constructor() {
        this.#prepare();
        this.metrics = require('./metrics.js') (require('prom-client'));
        const namespaceEvents = require('./namespaceEvents.js');
        this.namespaceEvents = new namespaceEvents(this);
    }
    #prepare() {
        this.promRegister = require('prom-client').register;
        this.metricsServer = require('http').createServer()
        this.metricsServer.on('request', async (request, res) => {
            res.writeHead(200, { 'Content-Type': this.promRegister.contentType });
            res.end(await this.promRegister.metrics());
        });
    }
    start() {
        this.metricsServer.listen(9090, () => {
            console.log('Metrics server listening on *:9090');
        });
    }

    Connection() {
        this.metrics.connectedSockets.inc();
        this.metrics.connectTotal.inc();
    }
    Disconnection() {
        this.metrics.connectedSockets.dec();
        this.metrics.disconnectTotal.inc();
    }
}