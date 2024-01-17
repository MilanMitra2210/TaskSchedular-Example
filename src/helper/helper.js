// const express = require('express');
// const bodyParser = require('body-parser');
// const cron = require('node-cron');
// const nodemailer = require('nodemailer');

// const app = express();
// const port = 3000;

// // Sample in-memory data store for tasks
// const tasks = [];

// // Configure nodemailer for sending emails
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'your-email@gmail.com',
//     pass: 'your-email-password',
//   },
// });

// // Middleware to parse JSON in requests
// app.use(bodyParser.json());

// // Endpoint to schedule a task
// app.post('/schedule-task', (req, res) => {
//   const { time, recurring, email, priority } = req.body;

//   // Validate input
//   if (!time || !email || !priority) {
//     return res.status(400).json({ error: 'Invalid input' });
//   }

//   // Create a unique identifier for the task
//   const taskId = Math.random().toString(36).substr(2, 9);

//   // Schedule the task using node-cron
//   const cronJob = recurring
//     ? cron.schedule(time, () => executeTask(taskId, email, priority))
//     : cron.scheduleDate(new Date(time), () => executeTask(taskId, email, priority));

//   // Store the task details
//   tasks.push({
//     id: taskId,
//     time,
//     recurring,
//     email,
//     priority,
//     cronJob,
//   });

//   res.json({ message: 'Task scheduled successfully', taskId });
// });

// // Function to execute a task
// function executeTask(taskId, email, priority) {
//   // Simulate task execution time
//   const executionTime = Math.floor(Math.random() * 5000);

  // Simulate sending an email
  setTimeout(() => {
    const mailOptions = {
      from: 'your-email@gmail.com',
      to: email,
      subject: 'Task Execution Notification',
      text: `Task ${taskId} has been executed successfully.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
  }, executionTime);

//   // Remove the task from the tasks array after execution
//   const index = tasks.findIndex((task) => task.id === taskId);
//   tasks.splice(index, 1);
// }

// // Endpoint to get the list of scheduled tasks
// app.get('/scheduled-tasks', (req, res) => {
//   res.json({ tasks });
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
