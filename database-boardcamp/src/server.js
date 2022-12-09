import express from "express";
import dotenv from "dotenv";
import pkg from "pg";

const { Pool } = pkg;

dotenv.config();
const app = express();
app.use(express.json());

const connection = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.get("/categories", async (req, res) => {
  try {
    const { rows } = await connection.query("SELECT * FROM categories");
    res.send(rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running in port ${port}`));
