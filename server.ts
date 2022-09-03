import dotenv from "dotenv";
import express  from "express";
import cors from "cors";
import {router} from "./src/routes/router"
import {errorHandler} from "./src/middlewares/errorMiddleware"

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);
app.use(errorHandler);

app.listen(process.env.PORT);