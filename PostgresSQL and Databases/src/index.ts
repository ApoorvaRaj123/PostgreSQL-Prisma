import express from "express";
import { Client } from "pg";

const app = express();
app.use(express.json());

const pgClient = new Client(
  "postgresql://neondb_owner:npg_TW0GPpUKg6bO@ep-calm-frog-b34d9w2s-pooler.c-4.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
);

pgClient.connect();

app.post("/signup", async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  const response = await pgClient.query(
    `INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id;`,
    [username, email, password],
  );

  console.log(response);

  res.json({ message: "User signed up successfully", data: response.rows });
});

app.listen(3000);
