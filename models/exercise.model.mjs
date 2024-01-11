import mongoose from 'mongoose';

const exerciseSchema = new mongoose.Schema({
  exerciseName: String,
  durationMinutes: Number,
  caloriesBurned: Number
});

export const Exercise = mongoose.model('Exercise', exerciseSchema);

