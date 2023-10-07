import { Router } from "express";
import { Service } from "../../../data/mongooseModels.js";
import { ServiceHandler } from "./handler/service-handle.js";

const router = Router();

const serviceHandler = new ServiceHandler(Service);

router.get("/", serviceHandler.findMany);
router.get("/:id", serviceHandler.findById);
router.post("/", serviceHandler.create);
router.put("/:id", serviceHandler.update);
router.delete("/:id", serviceHandler.delete);

export default router;
