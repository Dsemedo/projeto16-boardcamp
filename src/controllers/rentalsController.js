import { connectionDB } from "../baseDados.js";

export async function findAllRentals(req, res) {
    try {
      const { rows } = await connectionDB.query("SELECT * FROM rentals");
      res.send(rows);
    } catch (err) {
      res.status(409).send(err.message);
    }
  }
  