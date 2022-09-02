import dotenv from "dotenv";
import express  from "express";
import cors from "cors";
import {cardRouter} from "./src/routes/cardRouter";
import {router} from "./src/routes/router"
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(cardRouter);
app.use(router);

app.listen(process.env.PORT);