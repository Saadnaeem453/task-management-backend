"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = require("body-parser");
const dotenv_1 = require("dotenv");
const express_1 = require("express");
const cors_1 = require("cors");
const db_1 = require("./config/db");
const user_route_1 = require("./routes/user.route");
const task_route_1 = require("./routes/task.route");
// Initialize dotenv to use environment variables
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
// Connect to the database
(0, db_1.default)();
// Middleware setup
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
// Routes
app.use('/api/user', user_route_1.default);
app.use('/api/task', task_route_1.default);
// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
