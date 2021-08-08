//track the name, type, weight, sets, reps, and duration of exercise. 
//If the exercise is a cardio exercise, I should be able to track my distance traveled.

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({

day: {
  type: Date,
  default: new Date,
  type: String,
  trim: true,
},

  exercises: [
  {
  type: {
  type: String,
  trim: true,
  required: 'Enter an exercise type',
      },
  name: {
    type: String,
    trim: true,
    required: "Enter a name for transaction"
  },
  weight: {
    type: Number,
    required: "Enter an amount"
  },
  sets: {
    type: Number,
    required: "Enter an amount"
  },
  duration: {
    type: Number,
    required: "Enter Time"
  },

  distance: {
    type: Number,
    required: "Enter distance"
  },
},
  ],
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;