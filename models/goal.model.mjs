import mongoose from 'mongoose';

const goalSchema = new mongoose.Schema({
  goalName: String,
  description: String,
  targetDate: String,
  targetCaloriesValue: Number,
  status: {
    type: String,
    enum: ['Abandoned', 'In Progress', 'Archived'],
  }
});

export const Goal = mongoose.model('Goal', goalSchema);

