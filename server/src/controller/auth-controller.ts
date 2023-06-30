import { Request, Response } from "express";
import { AuthService } from "../service/auth-service";
import { error } from "console";
import { User } from "../schema/auth/User";

interface LoginRequestDTO {
    email: string;
    password: string;
}


export class AuthController {
    private authService = new AuthService();
    /**
     * login
     */
    public login = async (req: Request, res: Response): Promise<void> => {
        try {
            const { email, password }: LoginRequestDTO = req.body;
            await this.authService.login(email, password);
            res.status(200).json({ success: true, message: "Login is succesful" });
        } catch (e) {
            res.status(400).json({ success: false, message: error });
        }
    }
}