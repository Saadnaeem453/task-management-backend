
import Task from "../models/task.model"
import {Request , Response} from "express"
export const createTask =async (req:Request, res:Response):Promise<void> =>{
try {
    const {title, description} = req.body;
    const newTask = new Task({
        user:req.user,
title,
description, 
    })
    const task = newTask.save();
    res.status(201).json(task);
} catch (error) {
  if(error instanceof Error){
    res.status(500).json({ message: error.message });
  }
}
}
export const getTasks =async (req:Request, res:Response):Promise<void> =>{
    try {
        const tasks= await Task.find({user:req.user})
        res.status(200).json({tasks})
    } catch (error) {
      if(error instanceof Error){
        res.status(500).json({ message: error.message });
      }
    }
}
export const getTaskById = async (req: Request, res: Response): Promise<void> => {
    try {
      const task = await Task.findById(req.params.id);
      if (!task || task.user.toString() !== req.user) {
        res.status(404).json({ message: 'Task not found' });
        return;
      }
      res.status(200).json(task);
    } catch (error) {
      if(error instanceof Error){
        res.status(500).json({ message: error.message });
      }
    }
  };
  
  export const updateTask = async (req: Request, res: Response): Promise<void> => {
    try {
      const task = await Task.findById(req.params.id);
      if (!task || task.user.toString() !== req.user) {
        res.status(404).json({ message: 'Task not found' });
        return;
      }
      task.title = req.body.title || task.title;
      task.description = req.body.description || task.description;
      task.completed = req.body.completed ?? task.completed;
      await task.save();
      res.status(200).json(task);
    } catch (error) {
      if(error instanceof Error){
        res.status(500).json({ message: error.message });
      }
    }
  };
  
  export const deleteTask = async (req: Request, res: Response): Promise<void> => {
    try {
      const task = await Task.findByIdAndDelete(req.params.id);
  
      if (!task) {
     res.status(404).json({ message: 'Task not found' });
     return;
      }
  
      res.json({ message: 'Task removed' });
    } catch (error) {
      if(error instanceof Error){
        res.status(500).json({ message: error.message });
      }
    }
  };