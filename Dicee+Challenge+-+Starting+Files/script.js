var randomNumber1 = Math.floor(Math.random()*6)+1;
var addNewDice = "dice" + randomNumber1 + ".png";
var randomImage = "/images/" + addNewDice;
document.querySelectorAll("img")[0].setAttribute("src", randomImage);

var randomNumber2 = Math.floor(Math.random()*6)+1;
var addNewDice1 = "dice" + randomNumber2 + ".png";
var randomImage1 = "/images/" + addNewDice1;
document.querySelectorAll("img")[1].setAttribute("src", randomImage1);

if(randomNumber1 > randomNumber2){
    document.querySelector("h1").innerHTML="Player 1 wins !";
}else if(randomNumber2 > randomNumber1){
    document.querySelector("h1").innerHTML="Player 2 wins !";
}else{
    document.querySelector("h1").innerHTML="Draw !";
}