import { Router } from "express";
import { createGames, findAllGames } from "../controllers/gamesController.js";

const router = Router();

router.post("/games", createGames);
router.get("/games", findAllGames);

export default router;
