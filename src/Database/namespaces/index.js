// ------------ Database Namespaces Declaration ------------ //
module.exports = class {
    constructor(db) {
        // Prepare Database
        this.db = db;

        // ------------ NameSpaces Declaration ------------ //
        this.nodes = new (require('./nodes'))(this.db);
    }
};