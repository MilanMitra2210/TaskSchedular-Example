import { Request, Response } from "express";
import tasksModel from "../models/tasksModel";
import { dateToCron, executeTask, isValidEmail } from "../helper/taskHelper";
import cron from "node-cron";

const scheduleTaskController = async (
    req: Request,
    res: Response
): Promise<any> => {
    // Fetch all documents from the collection


    try {
        const tasks: any[] = await tasksModel.find({ status: "Pending" });

        let filteredUsers = tasks.filter((task) => {
            return task.priority === 3;
        });
        for (const task of filteredUsers) {
            // console.log(dateToCron(new Date(task.time)));
            let time: string = dateToCron(task.time);

            try {
                cron.schedule(time, () => executeTask(task));
            } catch (error) {
                return res.status(400).send({
                    success: true,
                    message: "Task scheduling not successfull",
                });
            }
        }

        filteredUsers = tasks.filter((task) => {
            return task.priority === 2;
        });
        for (const task of filteredUsers) {
            // console.log(dateToCron(new Date(task.time)));
            let time: string = dateToCron(task.time);

            try {
                cron.schedule(time, () => executeTask(task));
            } catch (error) {
                return res.status(400).send({
                    success: true,
                    message: "Task scheduling not successfull",
                });
            }
        }
        filteredUsers = tasks.filter((task) => {
            return task.priority === 1;
        });
        for (const task of filteredUsers) {
            // console.log(dateToCron(new Date(task.time)));
            let time: string = dateToCron(task.time);

            try {
                cron.schedule(time, () => executeTask(task));
            } catch (error) {
                return res.status(400).send({
                    success: true,
                    message: "Task scheduling not successfull",
                });
            }
        }

        return res.status(200).send({
            success: true,
            message: "Task scheduled successfully",
        });
    } catch (error) {
        return res.status(500).send({
            success: true,
            message: "Task scheduling not successfull",
        });
    }

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
        if (recurring == undefined) {
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
        const priorityValue = [1, 2, 3];
        if (priorityValue.indexOf(priority) === -1) {
            return res.status(400).send({ message: "Priority should be in the range 1-3 and must be number" });
        }
        const isEmail = await isValidEmail(email);
        if (!isEmail) {
            return res.status(400).send({ message: "Please Enter Correct Email" });
        }

        if (typeof (recurring) !== 'boolean') {
            return res.status(400).send({ message: "Please Enter Boolean value of Recurring" });
        }
        console.log(new Date());

        if (!recurring) {
            const date = new Date(time);

            if (new Date(date).toString() === "Invalid Date") {
                return res.status(400).send({ message: "If not reccuring, Please Enter Correct Date and time" })
            }
            if (date <= (new Date())) {
                return res.status(400).send({ message: "The Date must be Bigger or Equal to today date" })
            }
        }
        if (recurring) {
            const recurranceTime: string = time.split(' ')[1];
            // console.log(recurranceTime);
            const arr = ["seconds", "minutes", "hours", "days", "months", "weeks"];

            const subArr = arr.indexOf(recurranceTime);
            // console.log(subArr);

            if (subArr === -1) {
                return res.status(400).send({ message: `If reccuring, Please Enter time in format "--(time) minutes/seconds/hours/days/months/weeks" ` })
            }

        }
        // save
        const user = await new tasksModel({
            task,
            recurring,
            email,
            time,
            priority
        }).save();
        return res.status(200).send({
            success: true,
            message: "Task Successfully Added",
        });
    } catch (error) {
        console.log(error);

        return res.status(500).send({
            success: false,
            message: "Error Occured",
            error,
        });
    }
};


export { scheduleTaskController, addTaskController };