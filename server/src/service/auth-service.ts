import client from "../db";
import { Helper } from "../util/helper";


export class AuthService {
    private helper = new Helper();

    /**
     * login
     */
    public async login(email: string, password: string): Promise<object> {
        const hashedPassword = this.helper.hashPassword(password);
        const text = `
        SELECT * FROM users WHERE email = $1 and password = $2
        `
        const result = await client.query(text, [email, hashedPassword])
        if (result.rows.length === 0) {
            throw new Error("User not found!");
        }
        const user = result.rows[0];
        return user;
    }

    /**
     * register
     */
    public register(payload: object) {
        const text = `
        INSERT INTO tb_users(id, username, email, password) 
        VALUES ($1, $2, $3, $4)
        `
        return client.query(text, [payload])
    }
}