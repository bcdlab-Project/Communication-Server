// ------------ Metric Server ------------ //
module.exports = class {
    constructor(metricServer) {
        this.MetricServer = metricServer;
    }

    // ------------ Nodes Events ------------ //

    // Connected Event
    nodeConnected() {
        this.MetricServer.Connection();
        this.MetricServer.metrics.connectedNodes.inc();
    }

    // Disconnected Event
    nodeDisconnected() {
        this.MetricServer.Disconnection();
        this.MetricServer.metrics.connectedNodes.dec();
    }

    // Auth Failed Event
    nodeAuthFailed() {
        this.MetricServer.metrics.authFailedNodes.inc();
    }
}
