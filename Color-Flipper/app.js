const colors = ["green", "red", "rgba(133,122,200)", "#f15025"];
var btn = document.getElementById("btn");
var color = document.querySelector(".color");

btn.addEventListener("click",function(){
     var randomColor = Math.floor(Math.random()*colors.length);
     document.body.style.backgroundColor = colors[randomColor];
     color.textContent = colors[randomColor];

})
