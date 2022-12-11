import { Router } from "express";
import {
  findAllRentals,
  createRental,
  finalizedRental,
  deleteRental,
} from "../controllers/rentalsController.js";

const router = Router();

router.get("/rentals", findAllRentals);
router.post("/rentals", createRental);
router.post("/rentals/:id/return", finalizedRental);
router.delete("/rentals/:id", deleteRental);

export default router;
