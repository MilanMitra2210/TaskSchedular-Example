import mongoose, { Schema } from 'mongoose';

const taskSchema = new Schema(
  {
    task: {
      type: String,
      required: true,
      trim: true,
    },
    recurring: {
      type: Boolean,
      required: true,
      unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    time: {
        type: Date,
        required: true,
        unique: true,
    },
    priority: {
        type: Number,
        required: true,
        unique: true,
    },
  },
  { timestamps: true }
);

const tasksModel = mongoose.model('tasks', taskSchema);

export default tasksModel;