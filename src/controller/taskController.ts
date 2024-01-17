import { Request, Response } from "express";

const scheduleTaskController = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    
      const { name, email, password, phone, address, gender, hobbies } = req.body;
  
      
  };

  export {scheduleTaskController};