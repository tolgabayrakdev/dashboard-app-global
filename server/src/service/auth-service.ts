import client from "../db";



export class AuthService {

    /**
     * login
     */
    public login(email: string, password: string) {
        const text = `
        SELECT * FROM users WHERE email = $1 and password = $2
        `
        const result = client.query(text, [email, password])
        
    }

    /**
     * register
     */
    public register(payload: object) {
        const text = `
        INSERT INTO tb_users(id, username, email, password) 
        VALUES ($1, $2, $3, $4)
        `
        return
    }
}