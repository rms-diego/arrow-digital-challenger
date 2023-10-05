import { Router } from "express";
import { User } from "../../../data/mongooseModels.js";
import { UserHandler } from "./handler/user-handler.js";

const router = Router();

const userHandler = new UserHandler(User);

router.get("/", userHandler.findMany);
router.get("/:id", userHandler.findById);
router.post("/", userHandler.create);
router.put("/:id", userHandler.update);
router.delete("/:id", userHandler.delete);

export default router;
