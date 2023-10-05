import { Router } from "express";
import { Clinic } from "../../../data/mongooseModels.js";
import { ClinicHandler } from "./handler/clinic-handler.js";

const router = Router();

const clinicHandler = new ClinicHandler(Clinic);

router.get("/", clinicHandler.findMany);
router.get("/:id", clinicHandler.findById);
router.post("/", clinicHandler.create);
router.put("/:id", clinicHandler.update);
router.delete("/:id", clinicHandler.delete);

export default router;
