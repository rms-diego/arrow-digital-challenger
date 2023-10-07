import { Router } from "express";
import { Inventory } from "../../../data/mongooseModels.js";
import { InventoryHandler } from "./handler/inventory-handler.js";

const router = Router();

const inventoryHandler = new InventoryHandler(Inventory);

router.get("/", inventoryHandler.findMany);
router.get("/:id", inventoryHandler.findeById);
router.post("/", inventoryHandler.create);
router.put("/:id", inventoryHandler.update);
router.delete("/:id", inventoryHandler.delete);

export default router;
