import express, { Express } from 'express';
import 'dotenv/config';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import './db';
import authRouter from './router/auth-router';

const app: Express = express();

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(helmet());
app.use(morgan('short'));
app.use(cookieParser());

/* 
--- Routes ----
*/
app.use('/api/v1/auth', authRouter);

app.listen(process.env.APP_PORT || 5000, () => {
  console.log('Server is running on 5000');
});
