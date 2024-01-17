import NodeMailer from 'nodemailer';

//email validation function
const isValidEmail = async (email: string): Promise<boolean> => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return await emailRegex.test(email);
}
const dateToCron = (time: string): string => {
  let result: string = "";
  if (new Date(time).toString() === "Invalid Date") {
    const time_of_recc = time.split(' ');
    const recurranceTime: string = time_of_recc[1];
    if (recurranceTime === 'minutes') {
      result = `*/${time_of_recc[0]} * * * *`;
    }
    if (recurranceTime === 'seconds') {
      result = `*/${time_of_recc[0]} * * * * *`;
    }
    if (recurranceTime === 'hours') {
      result = `* */${time_of_recc[0]} * * *`;
    }
    if (recurranceTime === 'days') {
      result = `* * */${time_of_recc[0]} * *`;
    }
    if (recurranceTime === 'months') {
      result = `* * * */${time_of_recc[0]} *`;
    }
    if (recurranceTime === 'weeks') {
      result = `* * * * */${time_of_recc[0]}`;
    }
  } else {
    const date: Date = new Date(time);
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const days = date.getDate();
    const months = date.getMonth() + 1;
    const dayOfWeek = date.getDay();

    result = `${minutes} ${hours} ${days} ${months} ${dayOfWeek}`;
  }


  return result;
};
//date to cron code conversion
const dateToCron2 = (date: Date): string => {
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const days = date.getDate();
  const months = date.getMonth() + 1;
  const dayOfWeek = date.getDay();

  return `${minutes} ${hours} ${days} ${months} ${dayOfWeek}`;
};

//execution of task
const executeTask = async (task: any) => {

  // Configure nodemailer for sending emails
  const transporter = await NodeMailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'milan.75way@gmail.com',
      pass: 'gjygvjgshfeclqlx',
    },
  });

  // Simulate sending an email
  const mailOptions = {
    from: 'milan.75way@gmail.com',
    to: task.email,
    subject: 'Task Execution Notification',
    text: `Task ${task.task} has been executed successfully.`,
    html: `<h2>Task ${task.task} has been executed successfully.</h2>`,
  };

  //sending mail
  const info = await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      throw error;
    } else {
      console.log('Email sent:', info.response);
    }
  });


}

export { isValidEmail, dateToCron, executeTask };