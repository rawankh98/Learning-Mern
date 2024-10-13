//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming

import express from "express";
import bodyParser from "body-parser";
import {dirname} from "path";
import {fileURLToPath } from "url";
var userAuth = false;
const app = express();
const __directName = dirname(fileURLToPath(import.meta.url));
app.use(bodyParser.urlencoded({extended: true}));
app.use(CheckAuth);

function CheckAuth(req, res, next){
    if(req.body["password"] == "ILoveProgramming"){
        userAuth = true;
    }
    next();
}

app.get("/", (req, res)=> {
    res.sendFile(__directName + "/public/index.html");
})

app.post("/check", (req, res)=> {
if(userAuth){
    res.sendFile(__directName + "/public/secret.html");
}else{
    res.sendFile(__directName + "/public/index.html");
}
})

app.listen(8000, ()=> {
   console.log("listening on port 8000");
    
});