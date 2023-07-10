import { Request, Response } from 'express';
import { AuthService } from '../service/auth-service';
import { GoogleAuth, OAuth2Client } from 'google-auth-library';
import { Helper } from '../util/helper';

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
  private googleClientId = process.env.GOOGLE_AUTH_CLIENT_ID;
  public helper = new Helper();
  /**
   * login
   */
  public login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password }: LoginRequestSchema = req.body;
      const result: any = await this.authService.login(email, password);

      res.cookie('access_token', result.access_token, {
        httpOnly: true,
      });
      res.cookie('refresh_token', result.refresh_token, {
        httpOnly: true,
      });
      res.status(200).json({ success: true, message: 'Login is succesful' });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  /**
   * register
   */
  public register = async (req: Request, res: Response): Promise<void> => {
    try {
      const userData: RegisterRequest = req.body;
      const result = await this.authService.register(userData);
      console.log(result);
      res.status(201).json({ success: true, message: 'User created.' });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  /**
   * verify
   */
  public verify = async (req: Request, res: Response) => {
    try {
      const token: string = req.cookies.access_token;
      const verifyToken: any = this.helper.decodeToken(token);
      const userInformation = await this.authService.veriyfUserInformation(
        verifyToken.id,
      );
      res.status(200).json({ user: { userInformation } });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  };

  /**
   * getInformationUser
   */
  public getInformationUser(req: Request, res: Response) {
    try {
      const token: string = req.cookies.access_token;
      const verifyToken = this.helper.decodeToken(token);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  /**
   * logout
   */
  public logout = async (req: Request, res: Response): Promise<void> => {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    res.status(200).json({ success: true, message: 'Log out is sucessfull' });
  };

  /**
   * googleAuth
   */
  public googleAuth = async (req: Request, res: Response): Promise<void> => {
    try {
      const client = new OAuth2Client(this.googleClientId);
      const { id_token }: { id_token: string } = req.body;

      const ticket = await client.verifyIdToken({
        idToken: id_token,
        audience: this.googleClientId,
      });

      const payload = ticket.getPayload();
      const email = payload?.email;

      // Burada e-posta üzerinden kullanıcı doğrulama veya kayıt işlemini gerçekleştirebilirsiniz.
      // Gerekli kontrolleri yapabilir, gerekli iş mantığını uygulayabilir ve kullanıcıya erişim belirtecini döndürebilirsiniz.

      res
        .status(200)
        .json({ success: true, message: 'Google authentication successful' });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: 'Google authentication failed' });
    }
  };
}
