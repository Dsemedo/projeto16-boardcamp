import connectionDB from "../db/baseDados.js";

export async function findAllCustomers(req, res) {
  try {
    const { rows } = await connectionDB.query("SELECT * FROM customers");
    res.send(rows);
  } catch (err) {
    res.status(409).send(err.message);
  }
}

export async function findCustomer(req, res) {
  const { id } = req.params;

  try {
    const { rows } = await connectionDB.query(
      "SELECT *, customers.birthday::text FROM customers WHERE id=$1;",
      [id]
    );

    if (rows.length === 0) {
      res.status(404).send("Não existe este usuário");
    }
    res.send(rows[0]);
  } catch (err) {
    res.status(409).send(err.message);
  }
}

export async function createCustomers(req, res) {
  const { name, phone, cpf, birthday } = req.body;

  try {
    await connectionDB.query(
      "INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4);",
      [name, phone, cpf, birthday]
    );
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function updateCustomer(req, res) {
  const { name, phone, cpf, birthday } = req.body;
  const { id } = req.params;

  try {
    await connectionDB.query(
      "UPDATE customers SET name=$1, phone=$2, cpf=$3, birthday=$4 WHERE id=$5;",
      [name, phone, cpf, birthday, id]
    );
    res.status(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
