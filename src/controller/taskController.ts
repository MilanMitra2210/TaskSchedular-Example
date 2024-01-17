import { Request, Response } from "express";
import tasksModel from "../models/tasksModel";
import { isValidEmail } from "../helper/taskHelper";

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

    try {
        if (!task) {
            return res.status(400).send({ message: "Task is Required" });
        }
        if (!recurring) {
            return res.status(400).send({ message: "Recurring value is Required" });
        }
        if (!email) {
            return res.status(400).send({ message: "Email is Required" });
        }
        if (!time) {
            return res.status(400).send({ message: "Time is Required" });
        }
        if (!priority) {
            return res.status(400).send({ message: "Priority is Required" });
        }
        const date = new Date(time);
        if(new Date(date).toString() === "Invalid Date" ){
            return res.status(400).send({ message: "Please Enter Correct Time" })
        }

        const isEmail = await isValidEmail(email);
        if (!isEmail) {
            return res.status(400).send({ message: "Please Enter Correct Email" });
        }
        
        if( typeof(recurring) !==  'boolean'){
            return res.status(400).send({ message: "Please Enter Boolean value of Recurring" });
        }

        // save
        const user = await new tasksModel({
            task,
            recurring,
            email,
            time,
            priority
          }).save();
        res.status(200).send({
            success: true,
            message: "Task Successfully Added",
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error Occured",
            error,
          });
    }
};


export { scheduleTaskController, addTaskController };