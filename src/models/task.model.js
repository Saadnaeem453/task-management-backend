"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const taskSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User',
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    completed: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});
const Task = mongoose_1.default.model("Task", taskSchema);
exports.default = Task;
