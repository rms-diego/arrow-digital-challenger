import { Router } from "express";
import { Lab } from "../../../data/mongooseModels.js";
import { LabHandler } from "./handler/lab-handler.js";

const router = Router();

const labHandler = new LabHandler(Lab);

router.get("/", labHandler.findMany);
router.get("/:id", labHandler.findById);
router.post("/", labHandler.create);
router.put("/:id", labHandler.update);
router.delete("/:id", labHandler.delete);

export default router;
