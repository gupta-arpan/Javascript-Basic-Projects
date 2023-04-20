const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
var btn = document.getElementById("btn");
var color = document.querySelector(".color");

btn.addEventListener("click",function(){
    var hexString = "#";
    for(var i=0;i<6;i++){
        var randomChar = Math.floor(Math.random()*hex.length);
        hexString += hex[randomChar];
     }
     document.body.style.backgroundColor = hexString;
     color.textContent = hexString;

})
