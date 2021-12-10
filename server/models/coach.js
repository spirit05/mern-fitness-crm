const { Schema, model } = require("mongoose");
const coachSchema = new Schema({
    fio: {
        type: String
    },
    date: {
        type: String
    },
    status: {
        type: String
    },
    comment: {
        type: String
    }
});

module.exports = model("Coaches", coachSchema);