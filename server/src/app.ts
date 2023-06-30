import express, {Express} from "express";
import "dotenv/config";
import helmet from "helmet";
import cors from "cors"
import morgan from "morgan";
import "./db"
const app: Express = express();


app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("short"));




app.listen(process.env.APP_PORT || 5000, () => {
  console.log("Server is running on 5000");
})