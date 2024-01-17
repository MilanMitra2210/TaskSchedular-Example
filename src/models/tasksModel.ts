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
            type: Date,
            required: true,
        },
        priority: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

const tasksModel = mongoose.model('tasks', taskSchema);

export default tasksModel;