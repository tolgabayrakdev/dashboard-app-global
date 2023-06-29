import StatusCodes from "http-status-codes";

import AuthService from "../service/auth-service.js";
const authService = new AuthService();


class AuthController {

    async Login(req, res) {
        try {
            const result = await authService.login(req.body)
            console.log(result);
            res.status(StatusCodes.OK).json("Auth Successfull")

        } catch (err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err)
        }
    }

    async Register(req, res) {
        try {
            
        } catch (err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        }
    }
}


export default AuthController