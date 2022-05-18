import { Router } from "express";
import { checkout, orderSuccess } from "../controllers/order.controller.js";

const orderRouter = Router();

orderRouter.post("/order", checkout);
orderRouter.get("/orderSuccess", orderSuccess);

export default orderRouter;
