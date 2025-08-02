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
    Exercise: {
        type: Object
    }
})

const UserSaved = mongoose.model("User", DBschema)
module.exports = UserSaved