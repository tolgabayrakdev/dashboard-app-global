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
const google_auth_library_1 = require("google-auth-library");
const helper_1 = require("../util/helper");
class AuthController {
    constructor() {
        this.authService = new auth_service_1.AuthService();
        this.googleClientId = process.env.GOOGLE_AUTH_CLIENT_ID;
        this.helper = new helper_1.Helper();
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
         * verify
         */
        this.verify = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.cookies.access_token;
                const verifyToken = this.helper.decodeToken(token);
                res.status(200).json({ user: { verifyToken } });
            }
            catch (err) {
                console.log(err);
                res.status(500).json(err);
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
        /**
         * googleAuth
         */
        this.googleAuth = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const client = new google_auth_library_1.OAuth2Client(this.googleClientId);
                const { id_token } = req.body;
                const ticket = yield client.verifyIdToken({
                    idToken: id_token,
                    audience: this.googleClientId,
                });
                const payload = ticket.getPayload();
                const email = payload === null || payload === void 0 ? void 0 : payload.email;
                // Burada e-posta üzerinden kullanıcı doğrulama veya kayıt işlemini gerçekleştirebilirsiniz.
                // Gerekli kontrolleri yapabilir, gerekli iş mantığını uygulayabilir ve kullanıcıya erişim belirtecini döndürebilirsiniz.
                res
                    .status(200)
                    .json({ success: true, message: 'Google authentication successful' });
            }
            catch (error) {
                res
                    .status(500)
                    .json({ success: false, message: 'Google authentication failed' });
            }
        });
    }
}
exports.AuthController = AuthController;
