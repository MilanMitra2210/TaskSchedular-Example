import express, { Application, Request, Response } from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import taskRoute from './routes/taskRoute';
import connectDB from './config/db';
import cron from "node-cron";


// configure env
dotenv.config();

// database config
connectDB();

// rest object
const app : Application = express();

app.use(cors());
app.use(express.json());

// routes
app.use('/api/v1/', taskRoute);

app.get('/', (req: Request, res: Response ) => {// rest api
  res.send('Server running');
});

// PORT
const PORT: number = parseInt(process.env.PORT!) || 8080;


// run listen
app.listen(PORT, () => {
  console.log(`Server is running on mode ${process.env.DEV_MODE} on port ${PORT}`);
  
});
