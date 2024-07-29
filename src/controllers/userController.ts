import { Request,Response } from "express";
import User from "../models/user.model"
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken"
export const registerUser =async (req:Request, res:Response) :Promise<void> =>{

    const {name, email, password}= req.body 
    if(!(name && email && password)){
throw new Error("Data is given")
    }
    try {
        
   
    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400).json("Username is already registered");
        return;
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword =await bcrypt.hash(password, salt)

    const newUser = new User({
        name,
        email,
        password,
    })
    await newUser.save();
    const payload = {userId: newUser.id};
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY!,{expiresIn:"1h"})
    res.status(201).json({token})
} catch (error) {
  if(error instanceof Error){
    res.status(500).json({ message: error.message });
  }
}
}

export const loginUser =async (req:Request, res:Response) :Promise<void>=>{
    try {
        
   
const {email, password} = req.body;
if (!email) {
    throw new Error("Email is required");
  }
  if (!password) {
    throw new Error("Password is required");
  }

const user = await User.findOne({email})
if(!user){
  res.status(400).json({message:"Invalid Credentials"})
  return;
}
 const isMatch =await bcrypt.compare(password, user.password)
 if (!isMatch) {
    res.status(400).json({ message: 'Invalid credentials' });
    return;
  }

  const payload = {userID: user.id}
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY!,{expiresIn:"1h"})

  res.status(201).json({token})
} catch (error) {
  if(error instanceof Error){
    res.status(500).json({ message: error.message });
  }
    return;
}
}

