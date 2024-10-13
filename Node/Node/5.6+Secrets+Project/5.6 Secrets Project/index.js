// HINTS:
// 1. Import express and axios

// 2. Create an express app and set the port number.

// 3. Use the public folder for static files.

// 4. When the user goes to the home page it should render the index.ejs file.

// 5. Use axios to get a random secret and pass it to index.ejs to display the
// secret and the username of the secret.

// 6. Listen on your predefined port and start the server.

import express from "express"
import axios from "axios"
const app = express()

app.use(express.static("public"));
const port = 3032;



app.get("/", (req, res)=> {
   axios.get("https://secrets-api.appbrewery.com/random").then(data => {
    console.log(data.data);
        res.render("index.ejs", {secret: data.data.secret, user: data.data.username})
    }).catch(error=>res.status(500))
})

app.listen(port, ()=>{
   console.log("listening on port ", port);
});
