const mongoose = require("mongoose")

const addedExercise = new mongoose.Schema({
    userName: String,
    exercisesNotes: Array,
    id: Number,
    posted: {
        type: Boolean,
        default: false

    }

})

const savedExecise = mongoose.model("savedWorkouts", addedExercise)
module.exports = savedExecise