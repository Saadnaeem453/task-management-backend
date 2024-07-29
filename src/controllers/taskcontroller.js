"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.getTaskById = exports.getTasks = exports.createTask = void 0;
const task_model_1 = require("../models/task.model");
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description } = req.body;
        const newTask = new task_model_1.default({
            user: req.user,
            title,
            description,
        });
        const task = newTask.save();
        res.status(201).json(task);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.createTask = createTask;
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield task_model_1.default.find({ user: req.user });
        res.status(200).json({ tasks });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getTasks = getTasks;
const getTaskById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield task_model_1.default.findById(req.params.id);
        if (!task || task.user.toString() !== req.user) {
            res.status(404).json({ message: 'Task not found' });
            return;
        }
        res.status(200).json(task);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.getTaskById = getTaskById;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const task = yield task_model_1.default.findById(req.params.id);
        if (!task || task.user.toString() !== req.user) {
            res.status(404).json({ message: 'Task not found' });
            return;
        }
        task.title = req.body.title || task.title;
        task.description = req.body.description || task.description;
        task.completed = (_a = req.body.completed) !== null && _a !== void 0 ? _a : task.completed;
        yield task.save();
        res.status(200).json(task);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.updateTask = updateTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield task_model_1.default.findByIdAndDelete(req.params.id);
        if (!task) {
            res.status(404).json({ message: 'Task not found' });
            return;
        }
        res.json({ message: 'Task removed' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.deleteTask = deleteTask;
