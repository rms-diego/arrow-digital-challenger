import { Router } from "express";
import { PandaScan } from "../../../data/mongooseModels.js";
import { PandaScanHandler } from "./handler/panda-scan-handler.js";

const router = Router();

const pandaScanHandler = new PandaScanHandler(PandaScan);

router.get("/", pandaScanHandler.findMany);
router.get("/:id", pandaScanHandler.findById);
router.post("/", pandaScanHandler.create);
router.put("/:id", pandaScanHandler.update);
router.delete("/:id", pandaScanHandler.delete);

export default router;
