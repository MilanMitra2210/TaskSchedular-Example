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
        },
        email: {
            type: String,
            required: true,
        },
        time: {
            type: String,
            required: true,
        },
        priority: {
            type: Number,
            required: true,
            enum: [1, 2, 3],
        },
        status:{
            type: String,
            default: "Pending",
        }
    },
    { timestamps: true }
);

const tasksModel = mongoose.model('tasks', taskSchema);

export default tasksModel;