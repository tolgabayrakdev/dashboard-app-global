import express from "express";
import AuthController from "../controller/auth-controller.js";

const router = express.Router();
const authController = new AuthController();

router.get("/login", authController.Login)



export default router;