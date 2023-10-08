import { Router } from "express";
import { User } from "../../../data/mongooseModels.js";
import { UserHandler } from "./handler/user-handler.js";
import { validateToken } from "../../../middlewares/token-validation.js";
import { isAdminMiddleware } from "../../../middlewares/is-admin-validation.js";

const router = Router();

const userHandler = new UserHandler(User);

router.get("/", validateToken, userHandler.findMany);
router.get("/:id", validateToken, userHandler.findById);
router.post("/", validateToken, isAdminMiddleware, userHandler.create);
router.put("/:id", validateToken, isAdminMiddleware, userHandler.update);
router.delete("/:id", validateToken, isAdminMiddleware, userHandler.delete);

export default router;
