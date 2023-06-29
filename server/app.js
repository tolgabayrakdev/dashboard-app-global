import express from "express";
import "dotenv/config";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import "./db.js"
import authRoutes from "./router/auth-router.js"
const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan("short"));

app.use("/api/v1/auth", authRoutes)




app.listen(process.env.APP_PORT || 5000, () => {
    console.log(`Server running on: http://localhost:5000`);
})