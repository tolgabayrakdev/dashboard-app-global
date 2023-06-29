import Crypto from "crypto";
import Jwt from "jsonwebtoken";


class Helper {
    generateAccessToken(payload) {
        return Jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "1h" })
    }

    generateRefreshToken(payload) {
        return Jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "7d" })
    }

    generateHashPassword(payload) {
        return Crypto.createHash("sha256").update(payload).digest("base64")
    }
}


export default Helper