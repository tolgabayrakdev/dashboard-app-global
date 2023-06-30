"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = __importDefault(require("pg"));
const client = new pg_1.default.Client({
    user: "root",
    database: "postgres",
    password: "root123",
    host: "localhost",
    port: 5432
});
// client nesnesini kullanarak işlemler gerçekleştirme
client.connect(function (err) {
    if (err)
        throw err;
    console.log("⚡️[Database]: PostgreSQL is connected");
});
exports.default = client;
