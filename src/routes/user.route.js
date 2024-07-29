"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.default.Router();
const userController_1 = require("../controllers/userController");
router.post("/register", userController_1.registerUser);
router.post("/loginUser", userController_1.loginUser);
exports.default = router;
