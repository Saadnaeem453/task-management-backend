import express from "express"
import { loginUser, registerUser } from "../controllers/userController";
const router = express.Router();


router.post("/register", registerUser)
router.post("/loginUser", loginUser)
export default router