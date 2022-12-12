import connectionDB from "../db/baseDados.js";
import dayjs from "dayjs";

export async function findAllRentals(req, res) {
  const { gameId, customerId } = req.query;

  try {
    if (customerId && !gameId) {
      const onlyCustomerRentals = await connectionDB.query(
        `SELECT rentals.*, JSON_BUILD_OBJECT('id', customers.id,
        'name', customers.name) AS customer, 
        JSON_BUILD_OBJECT('id', games.id, 
        'name', games.name, 
        'categoryId', games."categoryId",
        'categoryName', categories.name) as game 
        FROM rentals 
        JOIN customers 
        ON customers.id="customerId"
        JOIN games 
        ON games.id="gameId"
        JOIN categories
        ON categories.id=games."categoryId" WHERE "customerId"=$1;`,
        [customerId]
      );

      res.send(onlyCustomerRentals.rows);
    } else if (!customerId && gameId) {
      const onlyGameRentals = await connectionDB.query(
        `SELECT rentals.*, JSON_BUILD_OBJECT('id', customers.id,
        'name', customers.name) AS customer, 
        JSON_BUILD_OBJECT('id', games.id, 
        'name', games.name, 
        'categoryId', games."categoryId",
        'categoryName', categories.name) as game 
        FROM rentals 
        JOIN customers 
        ON customers.id="customerId"
        JOIN games 
        ON games.id="gameId"
        JOIN categories
        ON categories.id=games."categoryId" WHERE "gameId"=$1;`,
        [gameId]
      );
      res.send(onlyGameRentals.rows);
    } else {
      const allRentals = await connectionDB.query(
        `SELECT rentals.*, JSON_BUILD_OBJECT('id', customers.id,
        'name', customers.name) AS customer, 
        JSON_BUILD_OBJECT('id', games.id, 
        'name', games.name, 
        'categoryId', games."categoryId",
        'categoryName', categories.name) as game 
        FROM rentals 
        JOIN customers 
        ON customers.id="customerId"
        JOIN games 
        ON games.id="gameId"
        JOIN categories
        ON categories.id=games."categoryId"`
      );
      res.send(allRentals.rows);
    }
  } catch (err) {
    res.status(409).send(err.message);
  }
}

export async function finalizedRental(req, res) {}

export async function createRental(req, res) {
  const { customerId, gameId, daysRented } = req.body;

  const customer = await connectionDB.query(
    "SELECT * FROM customers WHERE id=$1;",
    [customerId]
  );

  const game = await connectionDB.query("SELECT * FROM games WHERE id=$1;", [
    gameId,
  ]);

  try {
    const originalPrice = daysRented * game.rows[0].pricePerDay;

    await connectionDB.query(
      'INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [
        customerId,
        gameId,
        dayjs().format("YYYY/MM/DD"),
        daysRented,
        null,
        originalPrice,
        null,
      ]
    );

    res.sendStatus(201);
  } catch (err) {
    res.status(409).send(err.message);
  }
}

export async function deleteRental(req, res) {}
