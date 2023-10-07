import { Router } from "express";
import { Order } from "../../../data/mongooseModels.js";
import { OrderHandler } from "./handler/order-handler.js";

const orderHandler = new OrderHandler(Order);
const router = Router();

// TODO: populate order with dentist and patient from clinic table

router.get("/", orderHandler.findMany);
router.get("/:id", orderHandler.findById);
router.post("/", orderHandler.create);
router.put("/:id", orderHandler.update);
router.delete("/:id", orderHandler.delete);

export default router;
