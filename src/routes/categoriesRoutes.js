import { Router } from "express";
import {
  findAllCategories,
  createCategories,
} from "../controllers/categoriesController.js";

const router = Router();

router.post("/categories", createCategories);
router.get("/categories", findAllCategories);

export default router;
