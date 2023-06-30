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
exports.AuthController = void 0;
const auth_service_1 = require("../service/auth-service");
const console_1 = require("console");
class AuthController {
    constructor() {
        this.authService = new auth_service_1.AuthService();
        /**
         * login
         */
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                yield this.authService.login(email, password);
                res.status(200).json({ success: true, message: "Login is succesful" });
            }
            catch (e) {
                res.status(400).json({ success: false, message: console_1.error });
            }
        });
    }
}
exports.AuthController = AuthController;
