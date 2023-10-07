import "dotenv/config.js";
import "express-async-errors";

import express, { json } from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";

import { errorHandler } from "./middlewares/errorHandler.js";
import api from "./api/index.js";

const app = express();

// middlewares
app.use(morgan("dev")); // logging of http calls
app.use(helmet()); // header security
app.use(cors()); // cross-origin resource sharing
app.use(json()); // json parser
app.use(cookieParser()); // enable cookies

// routes
app.use("/api", api); // api routes

// error handling
app.use(errorHandler); // basic error handling

export default app;
