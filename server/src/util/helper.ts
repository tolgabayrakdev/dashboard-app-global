import Crypto from 'crypto';
import Jwt from 'jsonwebtoken';

export class Helper {
  /**
   * generateAccessToken
   */
  public generateAccessToken(payload: object) {
    return Jwt.sign(payload, process.env.JWT_SECRET_KEY ?? 'Secret_Key', {
      expiresIn: '1h',
    });
  }
  /**
   * generateRefreshToken
   */
  public generateRefreshToken(payload: object) {
    return Jwt.sign(payload, process.env.JWT_SECRET_KEY ?? 'Secret_Key', {
      expiresIn: '7d',
    });
  }

  /**
   * hashPassword
   */
  public hashPassword(payload: string) {
    return Crypto.createHash('sha256').update(payload).digest('base64');
  }

  /**
   * decodeToken
   */
  public decodeToken(payload: string) {
    try {
      const decodedToken = Jwt.verify(
        payload,
        process.env.JWT_SECRET_KEY ?? 'Secret_Key',
      );
      return decodedToken;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
