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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const db_1 = __importDefault(require("../db"));
const helper_1 = require("../util/helper");
class AuthService {
    constructor() {
        this.helper = new helper_1.Helper();
    }
    /**
     * login
     */
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = this.helper.hashPassword(password);
            const text = `
        SELECT * FROM users WHERE email = $1 and password = $2
        `;
            const result = yield db_1.default.query(text, [email, hashedPassword]);
            if (result.rows.length === 0) {
                throw new Error('User not found!');
            }
            const user = result.rows[0];
            const payload = {
                id: user.id,
                email: user.email,
            };
            const accessToken = this.helper.generateAccessToken(payload);
            const refreshToken = this.helper.generateRefreshToken(payload);
            return {
                access_token: accessToken,
                refresh_token: refreshToken,
            };
        });
    }
    /**
     * register
     */
    register(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { first_name, last_name, email, password } = payload;
            const hashPassword = this.helper.hashPassword(password);
            const text = `
        INSERT INTO users(first_name, last_name, email, password) 
        VALUES ($1, $2, $3, $4)
        `;
            try {
                yield db_1.default.query('BEGIN');
                const newUser = yield db_1.default.query(text, [
                    first_name,
                    last_name,
                    email,
                    hashPassword,
                ]);
                yield db_1.default.query('COMMIT');
                return newUser;
            }
            catch (error) {
                yield db_1.default.query('ROLLBACK');
                throw new Error(error);
            }
        });
    }
    /**
     * resetPassword
     */
    resetPassword(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkText = `
     SELECT
    `;
        });
    }
}
exports.AuthService = AuthService;
