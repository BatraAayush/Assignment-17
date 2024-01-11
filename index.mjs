import express from 'express';
import "./db/db.connect.mjs";
import { exerciseRouter } from './routes/exercise.router.mjs';
import { foodRouter } from './routes/food.router.mjs';
import { goalRouter } from './routes/goal.router.mjs';
import cors  from "cors";

const app = express();
app.use(express.json())
app.use(cors());
app.use('/api', exerciseRouter);
app.use('/api', foodRouter);
app.use('/api', goalRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Express server initialized')
});

