"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Helper = void 0;
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class Helper {
    /**
     * generateAccessToken
     */
    generateAccessToken(payload) {
        var _a;
        return jsonwebtoken_1.default.sign(payload, (_a = process.env.JWT_SECRET_KEY) !== null && _a !== void 0 ? _a : "Secret_Key", { expiresIn: "1h" });
    }
    /**
     * generateRefreshToken
     */
    generateRefreshToken(payload) {
        var _a;
        return jsonwebtoken_1.default.sign(payload, (_a = process.env.JWT_SECRET_KEY) !== null && _a !== void 0 ? _a : "Secret_Key", { expiresIn: "7d" });
    }
    /**
     * hashPassword
     */
    hashPassword(payload) {
        return crypto_1.default.createHash("sha256").update(payload).digest("base64");
    }
}
exports.Helper = Helper;
