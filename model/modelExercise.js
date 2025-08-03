const mongoose = require("mongoose")

const addedExercise = mongoose.Schema({
    userName: String,
    exercises: Array,

})

const savedExecise = mongoose.model("savedWorkouts", addedExercise)
module.exports = savedExecise