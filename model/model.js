const mongoose = require("mongoose")

const DBschema = mongoose.Schema({
    UserName: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    // id: {
    //     type: Number,
    //     required: true,
    //     unique: true,
    // }
})

const UserSaved = mongoose.model("Users", DBschema)
module.exports = UserSaved