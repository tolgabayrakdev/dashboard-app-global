"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    var _a;
    try {
        const AuthHeader = req.cookies.access_token;
        if (AuthHeader) {
            jsonwebtoken_1.default.verify(AuthHeader, (_a = process.env.JWT_SECRET_KEY) !== null && _a !== void 0 ? _a : 'SECRET', (error, user) => {
                if (error) {
                    return res.status(403).json({ message: 'Token is not valid!' });
                }
                req.user = user;
                next();
            });
        }
        else {
            res.status(401).json({ message: 'You are not authenticated!' });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
exports.verifyToken = verifyToken;
