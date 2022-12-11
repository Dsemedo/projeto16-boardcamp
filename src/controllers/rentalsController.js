import connectionDB from "../baseDados.js";

export async function findAllRentals(req, res) {
  try {
    const { rows } = await connectionDB.query("SELECT * FROM rentals");
    res.send(rows);
  } catch (err) {
    res.status(409).send(err.message);
  }
}

export async function finalizedRental(req, res) {}

export async function createRental(req, res) {}

export async function deleteRental(req, res) {}
