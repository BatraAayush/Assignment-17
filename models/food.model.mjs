import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema({
  foodName:String,
  calories:Number,
  proteinGrams:Number,
  carbohydrates:Number,
  fatGrams:Number
});

export const Food = mongoose.model('Food', foodSchema);

