"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const UserCreate = joi_1.default.object({
    first_name: joi_1.default.string().min(3).max(26).required(),
    last_name: joi_1.default.string().min(3).max(30).required(),
    email: joi_1.default.string().email(),
    password: joi_1.default.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
});
exports.default = UserCreate;
