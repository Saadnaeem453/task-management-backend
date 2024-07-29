import mongoose, { Schema } from "mongoose";

export interface ITask extends Document {
  user: mongoose.Schema.Types.ObjectId;
  title: string;
  desc?: string;
  completed: boolean;
  createdAt: Date;
}

const taskSchema:Schema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
     type: String,
     required: true 
    },

  description:
   {
     type: String
     },
  completed: 
  {
    type: Boolean,
    default: false 
    },
  createdAt: 
  { 
    type: Date,
    default: Date.now 
    },
});

const Task = mongoose.model<ITask>("Task", taskSchema);
