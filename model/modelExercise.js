const mongoose = require("mongoose")

const addedExercise = mongoose.Schema({
    userName: String,
    exercisesNotes: Array,
    id: Number

})

const savedExecise = mongoose.model("savedWorkouts", addedExercise)
module.exports = savedExecise