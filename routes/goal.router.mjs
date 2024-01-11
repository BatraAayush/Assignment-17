import express from 'express';
import { Goal } from "../models/goal.model.mjs";

export const goalRouter = express.Router();

const addGoal = async (goal) => {
  try {
    const newGoal = new Goal(goal);
    console.log(newGoal)
    if (!newGoal.goalName || !newGoal.description || !newGoal.targetDate || !newGoal.targetCaloriesValue || !newGoal.status) {
      console.log(newGoal)
      console.error('missing fields');
    } else {
      const savedGoal = await newGoal.save();
      return savedGoal;
    }
  } catch (e) {
    console.error(e)
  }
}


goalRouter.post('/goals', async (req, res) => {
  try {
    const newGoal = req.body;
    const addedGoal = await addGoal(newGoal);
    if (!addedGoal) {
      res.status(500).json({ message: "Error adding goals. maybe missing fields" })
    } else {
      res.status(200).json({ message: "goals added successfully", addedGoal })
    }
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
});

const getAllGoalItems = async () => {
  try {
    const allGoals = await Goal.find();
    return allGoals;
  } catch (e) {
    console.error(e)
  }
}

goalRouter.get('/goals', async (req, res) => {
  try {
    const allGoals = await getAllGoalItems();
    if (!allGoals) {
      res.json({ message: "please add goals items. no item found" })
    } else {
      res.status(200).json({ message: "all goals fetched successfully", allGoals })
    }
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

const deleteGoalById = async (id) => {
  try {
    const deletedGoal = await Goal.deleteOne({ _id: id });
    if (deletedGoal) {
      return deletedGoal
    } else {
      console.error('wrong id maybe')
    }
    return deletedGoal;
  } catch (e) {
    console.error(e)
  }
}

goalRouter.delete('/goals/:goalId', async (req, res) => {
  try {
    const deletedGoal = await deleteGoalById(req.params.goalId);
    if (!deletedGoal) {
      res.json({ message: "Wrong Id" })
    } else {
      res.status(200).json({ message: "Goal deleted successfully" })
    }
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})


