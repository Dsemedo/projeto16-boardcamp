import { Router } from "express";
import {
  findAllCategories,
  createCategories,
} from "../controllers/categories.controller.js";

const router = Router();

router.post("/categories", findAllCategories);
router.get("/categories", createCategories);

export default router;
