module.exports = class {
    constructor(metricServer) {
        this.MetricServer = metricServer;
    }

    // nodes Namespace Events

    nodeConnected() {
        this.MetricServer.Connection();
        this.MetricServer.metrics.connectedNodes.inc();
    }

    nodeDisconnected() {
        this.MetricServer.Disconnection();
        this.MetricServer.metrics.connectedNodes.dec();
    }
}
