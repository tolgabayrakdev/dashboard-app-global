import { Request, Response } from "express";
import { AuthService } from "../service/auth-service";

interface LoginRequestSchema {
    email: string;
    password: string;
}

interface RegisterRequest {
    first_name: string;
    last_name: string;
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
            const { email, password }: LoginRequestSchema = req.body;
            const result: any = await this.authService.login(email, password);
            res.cookie("access_token", result.access_token, {
                httpOnly: true
            })
            res.cookie("refresh_token", result.refresh_token, {
                httpOnly: true
            })
            res.status(200).json({ success: true, message: "Login is succesful" });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    }


    /**
     * register
     */
    public register = async (req: Request, res: Response): Promise<void> => {
        try {
            const userData: RegisterRequest = req.body;
            const result = await this.authService.register(userData);
            console.log(result);
            res.status(201).json({ success: true, message: "User created."})
            
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message })
        }
    }
}