import { connectionDB } from "../baseDados.js";

export async function createCategories(req, res) {
  const { name } = req.body;

  if(name == ""){
    res.sendStatus(400)
  }

  try {
    await connectionDB.query("INSERT INTO categories (name) VALUES ($1);", [
      name,
    ]);
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function findAllCategories(req, res) {
  try {
    const { rows } = await connectionDB.query("SELECT * FROM categories");
    res.send(rows);
  } catch (err) {
    res.status(409).send(err.message);
  }
}
