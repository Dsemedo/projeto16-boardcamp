import { connectionDB } from "../baseDados.js";

export async function findAllCustomers(req, res) {
  try {
    const { rows } = await connectionDB.query("SELECT * FROM customers");
    res.send(rows);
  } catch (err) {
    res.status(409).send(err.message);
  }
}
