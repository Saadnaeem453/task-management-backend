import express from "express"
const router = express.Router();
import { createTask,getTasks,getTaskById,updateTask,deleteTask } from "../controllers/taskcontroller";
import auth from "../middleware/auth.middleware"
router.post("/createTask", createTask)

router.post('/', auth, createTask);
router.get('/', auth, getTasks);
router.get('/:id', auth, getTaskById);
router.put('/:id', auth, updateTask);
router.delete('/:id', auth, deleteTask);

export default router;