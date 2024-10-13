/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import readQr from "qr-image";
import inquirer from "inquirer";
import fs from "fs";

inquirer
  .prompt([
    /* Pass your questions in here */
    {
      message: "Type in your URL: ",
      name: "URL",
    },
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
    const qrCode = answers.URL;
    var qr_svg = readQr.image(qrCode);
    qr_svg.pipe(fs.createWriteStream("love_qr.png"));
    fs.writeFile("URL.txt",qrCode, (err)=> {
        if(err) throw err;
        console.log("Done !")
    })
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
