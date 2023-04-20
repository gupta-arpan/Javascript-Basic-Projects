let count = 0;

const value = document.querySelector("#value");
var btns = document.querySelectorAll(".btn");

btns.forEach(function(btn){
    btn.addEventListener("click",function(e){
        const styles = e.currentTarget.classList;
        if(styles.contains("increase")){
            count++;
        }
        else if(styles.contains("decrease")){
            count--;
        }
        else{
            count = 0;
        }
        value.textContent = count;
        colorChanger(count);
    })
})

function colorChanger(count){
    if(count<0){
        value.style.color = "red";
    }
    if(count>0){
        value.style.color = "green";
    }
    if(count===0){
        value.style.color = "#222";
    }

}