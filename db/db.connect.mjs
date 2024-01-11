import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const mongoURI = process.env.MONGODB;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'Ass17_fitness_tracker'
}).then(() => {
  console.log('Connected to MongoDB')
})
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error)
  });
