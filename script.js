// let playerRick; // player 1
// let playerMorty; // player 2
let gameBoard = document.querySelectorAll('.ticbox'); // sets up the gameboard
let playerMove = firstMove(); // determines whose turn it is false = p1, true = p2
let boxCounter = 0; // checks to see if all boxes played
let score = []; // score tracker currently unused


gameBoard.forEach(element =>{ // adds click event listener
    element.addEventListener('click',currentMove);
    element.boxValue = Math.random(); // sets initial box values to random num
    element.hasClicked = false;
});

function currentMove(){ // places current marker in box
    if (playerMove){
        if (this.hasClicked){
            alert("You've already played this box");
        } else {
        let playerMorty = document.createElement('div');
        playerMorty.classList.add('player-2');
        this.append(playerMorty);
        this.boxValue = 'Morty';
        document.getElementById('ohman').play();
        checkWinner(this.boxValue);
        boxCounter++;
        // console.log(boxCounter);
        this.hasClicked=true;
        }
    } else {
        if (this.hasClicked){
            alert("You've already played this box");
        } else {
        let playerRick = document.createElement('div');
        playerRick.classList.add('player-1');
        this.append(playerRick);
        this.boxValue = 'Rick';
        document.getElementById('wub').play();
        
        checkWinner(this.boxValue);
        boxCounter++;
        this.hasClicked=true;
        }
    }
    
    if (boxCounter==9){
        setTimeout(()=>{document.getElementById('whatever').play();}, 600);
         // it's a draw
    }

    playerMove = nextTurn(); // sets up next move
    // console.log(playerMove);
}

function firstMove(){ //determines who goes first
    return Math.random()>=0.5;
}

function nextTurn(){ //who goes next
    return !playerMove
}

function checkWinner(winner){ // function to check for a winner - hard coded for now
    if ((gameBoard[0].boxValue==gameBoard[1].boxValue&&gameBoard[1].boxValue==gameBoard[2].boxValue)||
       (gameBoard[3].boxValue==gameBoard[4].boxValue&&gameBoard[4].boxValue==gameBoard[5].boxValue)||
       (gameBoard[6].boxValue==gameBoard[7].boxValue&&gameBoard[7].boxValue==gameBoard[8].boxValue)||
       (gameBoard[0].boxValue==gameBoard[3].boxValue&&gameBoard[3].boxValue==gameBoard[6].boxValue)||
       (gameBoard[1].boxValue==gameBoard[4].boxValue&&gameBoard[4].boxValue==gameBoard[7].boxValue)||
       (gameBoard[2].boxValue==gameBoard[5].boxValue&&gameBoard[5].boxValue==gameBoard[8].boxValue)||
       (gameBoard[0].boxValue==gameBoard[4].boxValue&&gameBoard[4].boxValue==gameBoard[8].boxValue)||
       (gameBoard[2].boxValue==gameBoard[4].boxValue&&gameBoard[4].boxValue==gameBoard[6].boxValue)){
        setTimeout(()=>{document.getElementById('like').play();},1000); 
        setTimeout(()=>{confirm(`Player${winner} is the winner! Would you like to play again?`);}, 1500);
           
       } else {
           console.log("no winner");
       }
}

function isEquals(val1, val2, val3){ // function to check 3 values, tbc...

}

function gameIntro(){ // function to start game tbc

    let gameStart = document.querySelector('main');
    gameStart.style.display="flex";
    let intro = document.querySelector('.introsplash');
    intro.style.display = "none";
}

gameIntro();

/* Intro Screen
 * Load Board
 * Player Move Randomized
 * Check for Winner - winner logic
 * Keep Score
 * 
 * winner logic: only 8 winning combinations (3 in a row)
 * - 3 across [0,1,2], [3,4,5], [6,7,8]
 * - 3 up and down [0,3,6], [1,4,7], [2,5,8]
 * - 2 diagonal [0,4,8], [2,4,6]
 * if all boxes filled - it's a draw
 * */

