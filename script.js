
/* Intro Screen -> hit start -> player move determined -> cromulon ->
 * Load Board
 * Check for Winner - winner logic
 * Win or Draw - prompted for replay
 * Keep Score
 * 
 * winner logic: only 8 winning combinations (3 in a row)
 * - 3 across [0,1,2], [3,4,5], [6,7,8]
 * - 3 up and down [0,3,6], [1,4,7], [2,5,8]
 * - 2 diagonal [0,4,8], [2,4,6]
 * if all boxes filled - it's a draw
 * */


 // to add - initial and current move, score (used with local storage), AI/1p option


// let playerRick; // player 1
// let playerMorty; // player 2
let gameBoard = document.querySelectorAll('.ticbox'); // sets up the gameboard
let playerMove = firstMove(); // determines whose turn it is false = p1, true = p2
let boxCounter = 0; // checks to see if all boxes played
let score = []; // score tracker currently unused
let replay = false;

gameBoard.forEach(element =>{ // adds click event listener
    element.addEventListener('click',currentMove);
    element.boxValue = Math.random(); // sets initial box values to random num
    element.hasClicked = false;
});

gameSplash(); // game starts here
// playerSelect();


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
        boxCounter++;
        checkWinner(this.boxValue);
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
        boxCounter++;
        checkWinner(this.boxValue);
        this.hasClicked=true;
        }
    }
    
    // if (boxCounter==9){
    //     setTimeout(()=>{document.getElementById('whatever').play();}, 1200);
    //     setTimeout(()=>{confirm(`It's a draw! Would you like to play again?`);}, 1500);
    //      // it's a draw
    // }

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
        setTimeout(()=>{replay = confirm(`Player${winner} is the winner! Would you like to play again?`);}, 2000); 
        setTimeout(()=>{
        if (replay){ // needs to get rid of time out for this to work
            console.log('start new game');
            location.reload(); // reloads the game
        }}, 2000);

       } else if (boxCounter==9){
        setTimeout(()=>{document.getElementById('whatever').play();}, 1800);
        setTimeout(()=>{replay = confirm(`It's a draw! Would you like to play again?`);}, 2000);
         // it's a draw
        setTimeout(()=>{
            if (replay){ // needs to get rid of time out for this to work
                console.log('start new game');
                location.reload(); // reloads the game
            }}, 2000);
        } else {
           console.log("no winner");
        }
}

function isEquals(val1, val2, val3){ // function to check 3 values, tbc...
/**************
 * 0 * 3 * 6 *
 * 1 * 4 * 7 *
 * 2 * 5 * 8 *
 *************
 * Every time a spot is played check the up/down, left/right, diagonal
 */
}

function gameSplash(){ // function to display splash
    // show splash screen
    // gameboard hidden
    // player hits start
    // cromulon shows up "show me what you got"
    // splash disappears
    // gameboard appears
    // make better splash screen
    let beginGame = document.querySelector("#startbutton"); 
    beginGame.addEventListener('click', playerSelect); // game start listener
}

function playerSelect(){ //visually shows players who goes first
    
    let splashImg = document.querySelector('.introsplash'); // splash screen
    splashImg.style.display = 'none'; // makes splash go away
    let showSelect = document.querySelector(".playerselect");
    showSelect.style.display = "flex";

    let selector = document.querySelector("#armselector");
    let playerName;
    if(firstMove()){
        setTimeout(()=>{
            selector.style.transform = 'rotate(20.40turn)'; // morty
            playerName = 'Morty';
        },500);
    } else {
        setTimeout(()=>{
            selector.style.transform = 'rotate(20.85turn)'; // rick
            playerName = 'Rick';
        }, 500);
    }
    setTimeout(()=>{
        let playerMove = document.querySelector('.playergoes');
        let newPlayer = document.createElement('h3');
        newPlayer.innerText = `Player${playerName} Goes First!`;
        playerMove.append(newPlayer);
    },3500)
    
}



function gameStart(){ // show me what you got! (display cromulon increase size massively)
    let gameStart = document.querySelector('main');
    let visibleLoad = document.querySelector('#cromulonload'); // loads cromulon
    let splashImg = document.querySelector('.introsplash'); // splash screen
    splashImg.style.display = 'none'; // makes splash go away
    visibleLoad.style.display = 'flex'; // makes cromulon visible
    setTimeout(()=>{ // SHOW ME WHAT YOU GOT
        visibleLoad.style.transform = "scale(20)";
        visibleLoad.style.opacity = 0;
        document.querySelector('#showme').play();
    },500);

    setTimeout(()=>{
        visibleLoad.remove(); // deletes cromulon
        gameStart.style.display="flex"; // display flex makes gameboard appear
    },3000);
}




