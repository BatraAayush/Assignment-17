import express from 'express';
import {Exercise} from "../models/exercise.model.mjs";

export const exerciseRouter = express.Router();


const addExercise = async(exercise) => {
  try{
    const newExercise = new Exercise(exercise);
    if(!newExercise.exerciseName || !newExercise.durationMinutes || !newExercise.caloriesBurned){
      console.error('missing fields');
    } else {
      const savedExercise = await newExercise.save();
      return savedExercise;
    }  

  }catch(e){
    console.error(e)
  }
}


exerciseRouter.post('/exercises', async(req, res) => {
  try{
    const newExercise = req.body;
    console.log(req.body);
    const addedExercise = await addExercise(newExercise);
    if(!addedExercise){
      res.status(500).json({message:"Error adding exercise. Missing fields"})
    } else {
      res.status(200).json({message:"Exercise added successfully", addedExercise})
    }
  }catch(e){
    res.status(500).json({error:e.message})
  }
});

const getAllExercises = async() => {
  try{
    const allExercises = await Exercise.find();
    return allExercises;
  }catch(e){
    console.error(e)
  }
}

exerciseRouter.get('/exercises', async(req, res) => {
  try{
    const allExercises = await getAllExercises();
    if(!allExercises){
      res.json({message:"please add exercise. no exercise found"})
    } else {
      res.status(200).json({message:"all exercises fetched successfully", allExercises})
    }
  }catch(e){
    res.status(500).json({error:e.message})
  }
})

const deleteExerciseById = async(id) => {
  try{
    const deletedExercise = await Exercise.deleteOne({_id:id});
    return deletedExercise;
  }catch(e){
    console.error(e)
  }
}

exerciseRouter.delete('/exercises/:exerciseId', async(req, res) => {
  try{
    const deletedExercise = await deleteExerciseById(req.params.exerciseId);
    if(!deletedExercise){
      res.json({message:"Wrong Id"})
    } else {
      res.status(200).json({message:"Exercise deleted successfully"})
    }
  }catch(e){
    res.status(500).json({error:e.message})
  }
})

