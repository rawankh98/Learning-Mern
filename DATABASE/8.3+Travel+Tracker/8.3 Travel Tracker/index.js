import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({
user:"rawankh",
host:"localhost",
database:"sql",
password:"rawankh",
port:5432
})

db.connect();
app.get("/", async (req, res) => {
  //Write your code here.
  db.query('SELECT * FROM visited_countries', (err, ress) =>{
    if(err){
      console.log("Error getting the data from the database", err.stack);
    }else{
      // console.log(ress.rows);
      let result = [];
      ress.rows.forEach((data) => {
        result.push(data.country_code)
      })
      console.log(result)
      res.render("index.ejs", {total: result.length, countries: result});
    }
  })
  
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
