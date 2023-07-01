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
class AuthController {
    constructor() {
        this.authService = new auth_service_1.AuthService();
        /**
         * login
         */
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const result = yield this.authService.login(email, password);
                res.cookie('access_token', result.access_token, {
                    httpOnly: true,
                });
                res.cookie('refresh_token', result.refresh_token, {
                    httpOnly: true,
                });
                res.status(200).json({ success: true, message: 'Login is succesful' });
            }
            catch (error) {
                res.status(400).json({ success: false, message: error.message });
            }
        });
        /**
         * register
         */
        this.register = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = req.body;
                const result = yield this.authService.register(userData);
                console.log(result);
                res.status(201).json({ success: true, message: 'User created.' });
            }
            catch (error) {
                res.status(400).json({ success: false, message: error.message });
            }
        });
        /**
         * logout
         */
        this.logout = (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.clearCookie('access_token');
            res.clearCookie('refresh_token');
            res.status(200).json({ success: true, message: 'Log out is sucessfull' });
        });
    }
}
exports.AuthController = AuthController;
