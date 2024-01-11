import express from 'express';
import {Food} from "../models/food.model.mjs";

export const foodRouter = express.Router();

const addFood = async(food) => {
  try{
    const newFood = new Food(food);
    if(!newFood.foodName){
      console.error('missing fields');
    } else {
      const savedFood = await newFood.save();
      return savedFood;
    }  
  }catch(e){
    console.error(e)
  }
}

foodRouter.post('/food', async(req, res) => {
  try{
    const newFood = req.body;
    const addedFood = await addFood(newFood);
    if(!addedFood){
      res.status(500).json({message:"Error adding food. maybe missing fields"})
    } else {
      res.status(200).json({message:"food added successfully", addedFood})
    }
  }catch(e){
    res.status(500).json({error:e.message})
  }
});

const getAllFoodItems = async() => {
  try{
    const allFoodItems = await Food.find();
    return allFoodItems;
  }catch(e){
    console.error(e)
  }
}

foodRouter.get('/food', async(req, res) => {
  try{
    const allFoodItems = await getAllFoodItems();
    if(!allFoodItems){
      res.json({message:"please add food items. no item found"})
    } else {
      res.status(200).json({message:"all food items fetched successfully", allFoodItems})
    }
  }catch(e){
    res.status(500).json({error:e.message})
  }
})

const deleteFoodById = async(id) => {
  try{
    const deletedFood = await Food.deleteOne({_id:id});
    return deletedFood;
  }catch(e){
    console.error(e)
  }
}

foodRouter.delete('/food/:foodId', async(req, res) => {
  try{
    const deletedFood = await deleteFoodById(req.params.foodId);
    if(!deletedFood){
      res.json({message:"Wrong Id"})
    } else {
      res.status(200).json({message:"Food deleted successfully"})
    }
  }catch(e){
    res.status(500).json({error:e.message})
  }
})


