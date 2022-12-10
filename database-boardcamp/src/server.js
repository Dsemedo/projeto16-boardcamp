import express from "express";
import categoriesRoutes from "../src/routes/categories.routes.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(categoriesRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running in port ${port}`));
