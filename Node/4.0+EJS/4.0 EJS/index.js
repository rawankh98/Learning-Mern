import express from "express";


const app = express();


app.get("/", (req, res)=> {
    const today = new Date();
    console.log(today.getDate());
    const day = "a weekday";
    const adv = ", it's a time to work hard !";
    if(today == 5 || today == 6){
        day = "a weekend";
        adv = ", it's time to get fun !";
    }
    res.render("solution.ejs", {
        dayTypes: day,
        advTypes: adv
    })
    
})

app.listen(9000, ()=> {
    console.log("server started at 900 port");
    
});