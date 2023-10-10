/*
api/models/index.js mounts all routes inside the models folder
these routes are mounted in ../../server.js on the route '/api/models'
*/
import { Router } from "express";

import lab from "../modules/lab/lab.js";
import clinic from "../modules/clinic/clinic.js";
import collaborator from "../modules/collaborator/collaborator.js";
import inventory from "../modules/inventory/inventory.js";
import order from "../modules/order/order.js";
import service from "../modules/service/service.js";
import user from "../modules/user/user.js";
import pandaScan from "../modules/panda-scan/panda-scan.js";

const router = Router();

router.use("/lab", lab);
router.use("/clinic", clinic);
router.use("/collaborator", collaborator);
router.use("/inventory", inventory);
router.use("/order", order);
router.use("/service", service);
router.use("/user", user);
router.use("/pandaScan", pandaScan);

export default router;
