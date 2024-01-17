import express, { Router } from 'express';
import { addTaskController, scheduleTaskController, getAllTaskController } from '../controller/taskController';

const taskRoute: Router = express.Router();

//Routes
taskRoute.get('/scheduletask', scheduleTaskController);

taskRoute.post('/addtask', addTaskController);

taskRoute.get('/alltask', getAllTaskController);

export default taskRoute;