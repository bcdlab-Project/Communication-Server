// ------------ Communication Server Configuration ------------ //
module.exports = function () {
    return {
        webUi_username: "<USERNAME>",
        webUi_password: "<PASSWORD>", // encrypted with bcrypt
        webUi_readonly: true,
        webUi_mode    : "development",
        cors          : ["https://admin.socket.io"]
    }
};

// ------------ How to set Configuration ------------ //
// Set the Communication Server configuration and rename this file to config.js