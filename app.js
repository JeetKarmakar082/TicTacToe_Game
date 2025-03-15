let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let newGameBtn = document.querySelector("#new-btn");
let drawContainer = document.querySelector(".draw-container");
let draw = document.querySelector("#draw");
let newDrawBtn = document.querySelector("#newDraw-btn");

let turnO = true; // playerX , playerO
let moves = 0;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const resetGame = () => {
    turnO = true;
    moves = 0;
    enbleBoxes();
    msgContainer.classList.add("hide");
    drawContainer.classList.add("drawhide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) { // playerO
            box.innerText = "O";
            turnO = false;
        } else { // playerX
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        checkWinner();
        moves += 1;
        if (moves === 9) {
            drawWinner(moves);
        }
    });
});

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enbleBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};


const showWinner = (winner) => {
    msg.innerText = `Congratulations Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    moves=0;
    disableBoxes();
};

const drawWinner = (moves) => {
    draw.innerText = "Game is Draw , So no Winner";
    drawContainer.classList.remove("drawhide");
    moves = 0;
    disableBoxes();
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                console.log("Winner");
                showWinner(pos1Val);
            }
        }
    }
};

newGameBtn.addEventListener("click", resetGame);
newDrawBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);