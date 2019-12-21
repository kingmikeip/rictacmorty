// let playerRick; // player 1
// let playerMorty; // player 2
let gameBoard = document.querySelectorAll('.ticbox'); // sets up the gameboard
let playerMove = firstMove(); // determines whose turn it is false = p1, true = p2
let boxCounter = 0; // checks to see if all boxes played



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
        checkWinner();
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
        checkWinner();
        boxCounter++;
        this.hasClicked=true;
        }
    }
    
    if (boxCounter==9){
        setTimeout(()=>{alert("It's a Draw! Game Over");}, 400);
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

function checkWinner(){ // function to check for a winner - hard coded for now
    if ((gameBoard[0].boxValue==gameBoard[1].boxValue&&gameBoard[1].boxValue==gameBoard[2].boxValue)||
       (gameBoard[3].boxValue==gameBoard[4].boxValue&&gameBoard[4].boxValue==gameBoard[5].boxValue)||
       (gameBoard[6].boxValue==gameBoard[7].boxValue&&gameBoard[7].boxValue==gameBoard[8].boxValue)||
       (gameBoard[0].boxValue==gameBoard[3].boxValue&&gameBoard[3].boxValue==gameBoard[6].boxValue)||
       (gameBoard[1].boxValue==gameBoard[4].boxValue&&gameBoard[4].boxValue==gameBoard[7].boxValue)||
       (gameBoard[2].boxValue==gameBoard[5].boxValue&&gameBoard[5].boxValue==gameBoard[8].boxValue)||
       (gameBoard[0].boxValue==gameBoard[4].boxValue&&gameBoard[4].boxValue==gameBoard[8].boxValue)||
       (gameBoard[2].boxValue==gameBoard[4].boxValue&&gameBoard[4].boxValue==gameBoard[6].boxValue)){
           alert("You win!");
       } else {
           console.log("no winner");
       }
}

function isEquals(val1, val2, val3){ // function to check 3 values, tbc...

}

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

