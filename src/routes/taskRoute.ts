import express, { Router } from 'express';
import { scheduleTaskController } from '../controller/taskController';

const taskRoute: Router = express.Router();

taskRoute.post('/scheduletask', scheduleTaskController);
export default taskRoute;