import express, { Router } from 'express';

const taskRoute: Router = express.Router();

taskRoute.post('/scheduletask', scheduleTaskController);
export default taskRoute;