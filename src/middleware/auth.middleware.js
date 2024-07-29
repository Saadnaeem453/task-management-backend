"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const auth = (req, res, next) => {
    const token = req.header("auth-token");
    if (!token) {
        throw new Error("Authentication failed, Token is not found");
    }
    try {
        const decode = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decode.userId;
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};
exports.default = auth;
