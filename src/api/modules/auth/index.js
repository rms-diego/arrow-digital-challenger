/*
api/auth/index.js mounts all routes inside the models folder
these routes are mounted in ../../server.js on the route '/api/auth'
*/
import { Router } from "express";
import { AuthHandler } from "./handler/auth.js";
import { User } from "../../../data/mongooseModels.js";
import jwt from "../../../util/jwt.js";

const authHandler = new AuthHandler(User, jwt);

const router = Router();
router.post("/", authHandler.login);

export default router;
