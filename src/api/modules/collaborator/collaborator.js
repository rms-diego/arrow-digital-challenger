import { Router } from "express";
import { Collaborator } from "../../../data/mongooseModels.js";
import { CollaboratorHandler } from "./handler/collaborator-handler.js";

const router = Router();

const collaboratorHandler = new CollaboratorHandler(Collaborator);

router.get("/", collaboratorHandler.findMany);
router.get("/:id", collaboratorHandler.findById);
router.post("/", collaboratorHandler.create);
router.put("/:id", collaboratorHandler.update);
router.delete("/:id", collaboratorHandler.delete);

export default router;
