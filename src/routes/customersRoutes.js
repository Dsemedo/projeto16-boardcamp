import { Router } from "express";
import {
  findAllCustomers,
  findCustomer,
  createCustomers,
  updateCustomer,
} from "../controllers/customersController.js";

const router = Router();

router.get("/customers", findAllCustomers);
router.get("/customers/:id", findCustomer);
router.post("/customers", createCustomers);
router.put("/customers/:id", updateCustomer);

export default router;
