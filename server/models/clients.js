const { Schema, model } = require("mongoose");
const clientSchema = new Schema({
    fio: {
        type: String
    },
    dataBuy: {
        type: String
    },
    firstCame: {
        type: String
    },
    lastCame: {
        type: String
    },
    expired: {
        type: String
    },
    phone: {
        type: String
    },
    status: {
        type: String
    },
    coach: {
        type: String
    }
});

module.exports = model("Client", clientSchema);