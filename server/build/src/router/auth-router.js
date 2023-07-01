"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controller/auth-controller");
const verify_token_1 = require("../middleware/verify-token");
const verify_validate_1 = require("../middleware/verify-validate");
const user_1 = __importDefault(require("../validation/user"));
const router = express_1.default.Router();
const authController = new auth_controller_1.AuthController();
router.post('/login', authController.login);
router.post('/register', (0, verify_validate_1.verifyValidate)(user_1.default), authController.register);
router.post('/logout', verify_token_1.verifyToken, authController.logout);
exports.default = router;
