import connectionDB from "../db/baseDados.js";

export async function createGames(req, res) {
  const { name, image, stockTotal, categoryId, pricePerDay } = req.body;

  try {
    await connectionDB.query(
      'INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5);',
      [name, image, stockTotal, categoryId, pricePerDay]
    );
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function findAllGames(req, res) {
  try {
    const { rows } = await connectionDB.query("SELECT * FROM games");
    res.send(rows);
  } catch (err) {
    res.status(409).send(err.message);
  }
}
