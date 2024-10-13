import express from "express";
import {dirname} from "path";
import {fileURLToPath} from "url";
import bodyParser from "body-parser";
const app = express();
const port = 3000;
var bandName = "";

const directName = dirname(fileURLToPath(import.meta.url));
app.use(bodyParser.urlencoded({extended: true}));
app.use(logger);

app.get("/", (req, res)=> {
  res.sendFile(directName + "/public/index.html");
})


app.post("/submit", (req,res)=> {
  res.send(bandName);
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});


function logger(req, res, next){
  bandName = req.body["street"] + req.body["pet"];
  next();
}