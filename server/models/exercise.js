const { Schema, model } = require("mongoose");
const exerciseSchema = new Schema({
    client: {
        type: String
    },
    coach: {
        type: String
    },
    name: {
        type: String
    },
    date: {
        type: String,
    },
    type: {
        type: String
    },
    comment: { 
        type:  String 
    }
});

module.exports = model("Exercises", exerciseSchema);