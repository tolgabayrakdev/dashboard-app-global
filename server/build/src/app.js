"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
require("./db");
const auth_router_1 = __importDefault(require("./router/auth-router"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: true, credentials: true }));
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)('short'));
app.use((0, cookie_parser_1.default)());
/*
--- Routes ----
*/
app.use('/api/v1/auth', auth_router_1.default);
app.listen(process.env.APP_PORT || 5000, () => {
    console.log('Server is running on 5000');
});
