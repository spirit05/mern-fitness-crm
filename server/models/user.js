const { Schema, model } = require("mongoose");
const userSchema = new Schema({
    fio: {
        type: String,
        required: true,
    },
    login: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = model("User", userSchema);