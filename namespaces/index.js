module.exports = function (io) {
    require("./nodes")(io);
    require("./web")(io);
}