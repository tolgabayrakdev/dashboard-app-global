import { Request, Response } from "express";
import { AuthService } from "../service/auth-service";

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
            const result = await this.authService.login(email, password);
            console.log(result);
            res.status(200).json({ success: true, message: "Login is succesful" });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    }
}