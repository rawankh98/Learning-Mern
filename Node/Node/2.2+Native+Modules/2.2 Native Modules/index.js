const fs = require("fs");

// fs.writeFile("try.txt", "hey there", (err)=>{
//     if(err) throw err;
//     console.log("the file has been saved");
// })


fs.readFile("./message.txt","utf8", (err, data)=> {
    if(err) throw err;
    console.log(data);
})