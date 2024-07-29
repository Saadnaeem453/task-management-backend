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
exports.loginUser = exports.registerUser = void 0;
const user_model_1 = require("../models/user.model");
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    if (!(name && email && password)) {
        throw new Error("Data is given");
    }
    try {
        const userExists = yield user_model_1.default.findOne({ email });
        if (userExists) {
            res.status(400).json("Username is already registered");
            return;
        }
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
        const newUser = new user_model_1.default({
            name,
            email,
            password,
        });
        yield newUser.save();
        const payload = { userId: newUser.id };
        const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
        res.status(201).json({ token });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error);
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email) {
            throw new Error("Email is required");
        }
        if (!password) {
            throw new Error("Password is required");
        }
        const user = yield user_model_1.default.findOne({ email });
        if (!user) {
            res.status(400).json({ message: "Invalid Credentials" });
            return;
        }
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: 'Invalid credentials' });
            return;
        }
        const payload = { userID: user.id };
        const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
        res.status(201).json({ token });
    }
    catch (error) {
        res.status(400).json({ message: 'Invalid credentials' });
        return;
    }
});
exports.loginUser = loginUser;
