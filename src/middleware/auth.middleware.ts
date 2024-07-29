import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"

const auth = (req: Request  , res :Response, next:NextFunction):void=> 
    {
const token = req.header("auth-token")
if(!token){
    throw new Error("Authentication failed, Token is not found")
}
try {

    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY!) as {userId  : string}
    req.user= decode.userId;
    next()
} catch (error) {
    if(error instanceof Error){
        res.status(500).json({ message: error.message });
      }
}
}
export default auth;