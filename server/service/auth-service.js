import client from "../db.js"
import Helper from "../util/helper.js"

const helper = new Helper();
class AuthService {


    async login(email, pasword) {
        const text =
            `
        SELECT * FROM users WHERE email = $1 and password = $2

        `
        try {
            const user = client.query(text, [email, pasword]);
            if (user.rows[0]) {
                const payload = {
                    id: user.id,
                    email: user.email
                }
                return {
                    accessToken: helper.generateAccessToken({ payload }),
                    refreshToken: helper.generateRefreshToken({ payload })
                }
            } else {
                throw new Error("Account not found!")
            }
        } catch (e) {
            return e;
        }
    }

    async register() {

    }
}


export default AuthService