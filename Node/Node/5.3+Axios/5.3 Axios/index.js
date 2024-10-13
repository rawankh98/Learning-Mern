import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Step 1: Make sure that when a user visits the home page,
//   it shows a random activity.You will need to check the format of the
//   JSON data from response.data and edit the index.ejs file accordingly.
app.get("/", (req, res) => {
  axios
    .get("https://bored-api.appbrewery.com/random")
    .then((data) => {
      console.log(data.data);
      
      res.render("index.ejs", { data: data.data });
    })
    .catch((err) => res.render("index.ejs", { err: err.message }));
});

app.post("/", async (req, res) => {
  // console.log(req.body["type"] + req.body["participants"]);

  // Step 2: Play around with the drop downs and see what gets logged.
  // Use axios to make an API request to the /filter endpoint. Making
  // sure you're passing both the type and participants queries.
  // Render the index.ejs file with a single *random* activity that comes back
  // from the API request.
  // Step 3: If you get a 404 error (resource not found) from the API request.
  // Pass an error to the index.ejs to tell the user:
  // "No activities that match your criteria."
  try{
    const myRes = await axios.get(`https://bored-api.appbrewery.com/filter?type=${req.body.type}&participants=${req.body.participants}`)
    console.log("doneeeeeee", myRes.data)
  res.render("index.ejs", {myRes: myRes.data[Math.floor(Math.random()*myRes.data.length)]})
  }catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: "No activities that match your criteria.",
    });

  }});
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
