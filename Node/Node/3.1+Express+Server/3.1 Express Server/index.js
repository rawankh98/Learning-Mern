import express from "express"; 
const app = express(); /// to use express


app.get("/", (req, res)=> {
  console.log(req);
  res.send("hello !");
})

app.get("/about", (req, res)=> {
  console.log(req);
  res.send("about page");
})

app.get("/contact", (req, res)=> {
  console.log(req);
  res.send("contact page !");
})
app.listen(8080, ()=> {
  console.log("server running on" + 8080);
  
});

// create app to listen
// specify port which the location of the server that will listen for the request from the client side
// callback function that will be triggered when the server setup 
