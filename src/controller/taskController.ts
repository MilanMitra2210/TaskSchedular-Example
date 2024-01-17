import { Request, Response } from "express";
import tasksModel from "../models/tasksModel";

const scheduleTaskController = async (
    req: Request,
    res: Response
): Promise<any> => {


};

const addTaskController = async (
    req: Request,
    res: Response
): Promise<any> => {

    const { task, recurring, email, time, priority } = req.body;
    
    if(!task){
        return res.status(400).send({ message: "Task is Required" });
    }
    if(!recurring){
        return res.status(400).send({ message: "Recurring value is Required" });
    }
    if(!email){
        return res.status(400).send({ message: "Email is Required" });
    }
    if(!time){
        return res.status(400).send({ message: "Time is Required" });
    }
    if(!priority){
        return res.status(400).send({ message: "Priority is Required" });
    }

    

    // save
    const user = await new tasksModel({
        task,
        recurring,
        email,
        time,
        priority
      }).save();

};


export { scheduleTaskController, addTaskController };