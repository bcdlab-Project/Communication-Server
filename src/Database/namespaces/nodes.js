// ------------ Database Nodes Namespace Functions ------------ //
module.exports = class {
    #db;
    constructor(db) {
        // Prepare Database
        this.#db = db;
    }

    // ------------ Nodes Namespace Functions ------------ //

    // Check if Node Exists
    async isNode(nodeId) {
        return (await this.#db.promise().query("SELECT COUNT(*) AS 'Exists' FROM Nodes WHERE id = ?", [nodeId]))[0][0].Exists == 1;
    }

    // Get Node Token
    async getNodeToken(nodeId) {
        return (await this.#db.promise().query("SELECT secret FROM Nodes WHERE id = ?", [nodeId]))[0][0].secret;
    }

    // Check if Node is Connected
    async isNodeConnected(nodeId) {
        var connected = (await this.#db.promise().query("SELECT connected FROM RunningNodes WHERE id = ?", [nodeId]))[0]
        return Boolean(connected.length == 1 && connected[0].connected == 1);
    }

    // Set Node Connection
    async setConnection(nodeId, socketId) {
        if ((await this.#db.promise().query("SELECT COUNT(*) AS 'Exists' FROM RunningNodes WHERE id = ?", [nodeId]))[0][0].Exists == 0) {
            await this.#db.promise().query("INSERT INTO RunningNodes (id, connection_id) VALUES (?, ?)", [nodeId, socketId]);
          } else {
            await this.#db.promise().query("UPDATE RunningNodes SET connection_id = ?, connected = 1 WHERE id = ?", [socketId, nodeId]);
          }
    }

    // Set Node Disconnection
    async setDisconnection(nodeId) {
        await this.#db.promise().query("UPDATE RunningNodes SET connected = 0 WHERE id = ?", [nodeId]);
    }
}