var collect = document.querySelectorAll(".drum").length;
for(i=0; i<collect; i++){
    document.querySelectorAll(".drum")[i].addEventListener("click", addEvent);
    
    // document.querySelectorAll(".drum")[i];
    // console.log(document.querySelectorAll(".drum")[i]);
    }



function addEvent(){
    alert("button has clicked");
    var txt = this.innerHTML;
    makeSound(txt);
    // console.log(txt);
    addAnimation(txt);
}

document.addEventListener("keypress", function (event) {
    alert("key waas pressed");
    // console.log(event.key);
    makeSound(event.key);
    addAnimation(event.key);
})

function makeSound(params) {
    switch (params) {
        case "w":
             var audio1 = new Audio('./sounds/crash.mp3');
             audio1.play();
            break;
            case "a":
                var audio2 = new Audio('./sounds/kick-bass.mp3');
                audio2.play();
               break;
               case "s":
                var audio3 = new Audio('./sounds/snare.mp3');
                audio3.play();
               break;
               case "d":
                var audio4 = new Audio('./sounds/tom-1.mp3');
                audio4.play();
               break;
               case "j":
                var audio5 = new Audio('./sounds/tom-2.mp3');
                audio5.play();
               break;
               case "k":
                var audio6 = new Audio('./sounds/tom-3.mp3');
                audio6.play();
               break;
               case "l":
                var audio7 = new Audio('./sounds/tom-4.mp3');
                audio7.play();
               break;
        default:
           console.log("something went wrong !");
            break;
    }
}

function addAnimation(currentKey) {
    var letto = document.querySelector("."+currentKey);
    console.log(letto);
    letto.classList.add("pressed");
    
    setTimeout(() => {
        letto.classList.remove("pressed");
    }, 100);
}