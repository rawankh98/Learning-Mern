import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import path from "path"
import { fileURLToPath } from 'url';

// Absolute path to your CSV file (update as needed)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "rawan",
  port: 5432,
});

const app = express();
const port = 8000;



// db.connect();

(async function connectDB() {
  try {
    await db.connect();
    console.log("Database connected successfully");
  } catch (err) {
    console.error("Failed to connect to the database", err.stack);
    process.exit(1); // Exit if there's a connection error
  }
})();

let quiz = [];

const csvFilePath = path.join(__dirname, "capitals.csv");
// const copyQuery = `
// COPY capitals (id, country, capital)
// FROM '${csvFilePath}'
// DELIMITER ','
// CSV HEADER;
// `;

// db.query(copyQuery, (err, res) => {
//   if (err) {
//     console.error("Error executing query", err.stack);
//   } else {
//     quiz = res.rows;
//   }
//   db.end();
// });

// db.query(
//   `COPY capitals (id, country, capital) FROM '${csvFilePath}' DELIMITER ',' CSV HEADER;`,
//   (err, res) => {
//     if (err) {
//       console.error("Error executing query", err.stack);
//     } else {
//       console.log("CSV file data inserted successfully.");
//     }
    
//     // Close the connection only after the query is done
//     db.end((err) => {
//       if (err) {
//         console.error("Error closing connection", err.stack);
//       } else {
//         console.log("Database connection closed.");
//       }
//     });
//   }
// );


db.query("SELECT * FROM capitals", (err, res) => {
  if (err) {
    console.error("Error executing query", err.stack);
  } else {
    quiz = res.rows;
  }
  db.end();
});

let totalCorrect = 0;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentQuestion = {};

// GET home page
app.get("/", async (req, res) => {
  totalCorrect = 0;
  await nextQuestion();
  console.log(currentQuestion);
  res.render("index.ejs", { question: currentQuestion });
});

// POST a new post
app.post("/submit", (req, res) => {
  let answer = req.body.answer.trim();
  let isCorrect = false;
  if (currentQuestion.capital.toLowerCase() === answer.toLowerCase()) {
    totalCorrect++;
    console.log(totalCorrect);
    isCorrect = true;
  }

  nextQuestion();
  res.render("index.ejs", {
    question: currentQuestion,
    wasCorrect: isCorrect,
    totalScore: totalCorrect,
  });
});

async function nextQuestion() {
  const randomCountry = quiz[Math.floor(Math.random() * quiz.length)];
  currentQuestion = randomCountry;
}

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
