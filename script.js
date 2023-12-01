// Fetching all the neccessary components needed from the html 

const cellElements = document.querySelectorAll('[data-cell]');
const resButton = document.getElementById("restartButton");
let board = document.getElementById('board');
let win_msg = document.querySelector('[data-winning-message-text]');
let win_msg_element = document.querySelector('#winningMessage');

let circleTurn; // If true ,circle's turn. If false, X's turn 

// Making variables for code reusability
const X_CLASS = 'x';
const CIRCLE_CLASS='circle';

// All the possible winning combinations
const Win_Comb = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

// Starting the game
startGame();

// Function that starts the game and also resets it  
function startGame(){
    win_msg_element.classList.remove("show");
    circleTurn = false;
    cellElements.forEach(cell=>{
    cell.classList.remove('x');
    cell.classList.remove('circle');
    cell.removeEventListener('click',handleClick);
    cell.addEventListener('click',handleClick,{once:true});})
     showOnHover();
}

// Function for placing the markers 
function placeMark(cell,currentState){
    cell.classList.add(currentState);
  }

// Function to switch turns 
function switchTurns(){
    circleTurn = !circleTurn;
}

// Major function serves as driver to all other functions  
function handleClick(e){
    let cell = e.target;
    let currentState = circleTurn?CIRCLE_CLASS:X_CLASS;
    placeMark(cell,currentState); 
    if(checkForWin(currentState)){
        endGame(false);  
    } 
    else if(isDraw()){
        endGame(true);  
    }
    switchTurns();
    showOnHover();
}

// Function thats check's win 
function checkForWin(currentState){
   return Win_Comb.some(comb=>{
        return comb.every(index=>{
            return cellElements[index].classList.contains(currentState);
    })
   })
}

// Function that decites what to do if game has been drawen or if there is a winner 
function endGame(draw){
    if(draw){
        win_msg.innerText='Draw';
    }else{
        win_msg.innerText=`${circleTurn?"O's":"X's"} Win`;
    }
    win_msg_element.classList.add("show");
}

// Function thats check's draw 
function isDraw(){
  return [...cellElements].every(element=>{
    return element.classList.contains('x') || element.classList.contains('circle');
  })
}

// Function that adds the hover feature 
function showOnHover(){
    board.classList.remove('circle');
    board.classList.remove('x');
    if(circleTurn){
        board.classList.add('circle');
    }
    board.classList.add('x');
}

// Adding functionality to the reset button 
resButton.addEventListener('click',startGame);