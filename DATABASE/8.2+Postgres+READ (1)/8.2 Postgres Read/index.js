import express from "express";
import bodyParser from "body-parser";
import {fileURLToPath} from "url"
import path from "path";
import pg from "pg"

const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
let totalCorrect = 0;


const db = new pg.Client({
  user: "rawankh",
  host: "localhost",
  database: "rawankh",
  password: "rawan",
  port: 5432,
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const csvFilePath = path.join(__dirname, "flags.csv");

let currentQuestion = {};
let quiz = [];
db.connect()

// db.query(
//   `COPY flags (id, name, flag) FROM '${csvFilePath}' DELIMITER ',' CSV HEADER;`,
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
db.query("SELECT * FROM flags", (err, res) => {
  if(err){
    console.log(err.stack)
  }else{
    quiz = res.rows
  }
})

// GET home page
app.get("/", (req, res) => {
  totalCorrect = 0;
  nextQuestion();
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

function nextQuestion() {
  const randomCountry = quiz[Math.floor(Math.random() * quiz.length)];
  currentQuestion = randomCountry;
}

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
