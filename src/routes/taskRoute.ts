import express, { Router } from 'express';
import { addTaskController, scheduleTaskController } from '../controller/taskController';

const taskRoute: Router = express.Router();

taskRoute.get('/scheduletask', scheduleTaskController);

taskRoute.post('/addtask', addTaskController);

export default taskRoute;