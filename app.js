let boxes=document.querySelectorAll(".box");
let msg=document.querySelector("#msg");
let resetbtn=document.querySelector("#reset-btn");
let newgamebtn=document.querySelector("#new-btn");
let msgcontainer=document.querySelector(".msg-container");

let turn0 =true;
let count=0;

const winpatterns =[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8] 
];

const reset = () => {
    count=0;
    turn0=true;
    enableBoxes();
    msgcontainer.classList.add("hide");
}

boxes.forEach((box)=>{
    box.addEventListener("click",() =>{
        count++;
        if(turn0){
            box.innerText="O";
            turn0=false;
        }else{
            box.innerText="X";
            turn0=true;
        }
        box.disabled=true;

        checkwinner();
    });
});

const disableBoxes = () => {
    for(let box of boxes){
        box.disabled=true;
    }
}

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
}

const draw= () => {
    msg.innerText="It is a draw";
    msgcontainer.classList.remove("hide");
    disableBoxes();
}

const showwinner = (winner) => {
    disableBoxes();
    msg.innerText =`Congratulatons, winner is ${winner}`;
    msgcontainer.classList.remove("hide");
};

const checkwinner =() => {
    let winnerFound=false;
    for(let pattern of winpatterns){
           let pos1=boxes[pattern[0]].innerText;
           let pos2=boxes[pattern[1]].innerText;
           let pos3=boxes[pattern[2]].innerText;

           if(pos1!="" && pos2!="" && pos3!=""){
            if(pos1 === pos2 && pos2 === pos3){
                winnerFound=true;
                setTimeout( () => { showwinner(pos1)},1000)
             }
             else if(!winnerFound && count===9){
                setTimeout(draw,300);
             }
        }
    }
};

newgamebtn.addEventListener("click",reset);
resetbtn.addEventListener("click",reset);





