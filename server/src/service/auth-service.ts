import client from '../db';
import { Helper } from '../util/helper';

interface UserCreateSchema {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export class AuthService {
  private helper = new Helper();

  /**
   * login
   */
  public async login(email: string, password: string): Promise<object> {
    const hashedPassword = this.helper.hashPassword(password);
    const text = `
        SELECT * FROM users WHERE email = $1 and password = $2
        `;
    const result = await client.query(text, [email, hashedPassword]);
    if (result.rows.length === 0) {
      throw new Error('User not found!');
    }
    const user = result.rows[0];
    const payload = {
      id: user.id,
      email: user.email,
    };
    const accessToken = this.helper.generateAccessToken(payload);
    const refreshToken = this.helper.generateRefreshToken(payload);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  /**
   * register
   */
  public async register(payload: UserCreateSchema): Promise<object> {
    const { first_name, last_name, email, password } = payload;
    const hashPassword = this.helper.hashPassword(password);

    const text = `
        INSERT INTO users(first_name, last_name, email, password) 
        VALUES ($1, $2, $3, $4)
        `;
    try {
      await client.query('BEGIN');
      const newUser = await client.query(text, [
        first_name,
        last_name,
        email,
        hashPassword,
      ]);
      await client.query('COMMIT');
      return newUser;
    } catch (error: any) {
      await client.query('ROLLBACK');
      throw new Error(error);
    }
  }


  /**
   * resetPassword
   */
  public async resetPassword(email: string): Promise<void> {
    const checkText = `
     SELECT
    `
  }
}
