
/* Intro Screen -> hit start -> player move determined -> cromulon ->
 * Load Board
 * Check for Winner - winner logic
 * Win or Draw - prompted for replay
 * Keep Score
 * 
 * Currently on replay the window is just reloaded. I know this is a cheating way to implement playability
 * But I overcome this problem with storing the running score locally.
 * 
 * A better way to implement this would be having a function that resets boxValue and removes played squares. This shoudln't be too hard with an array loops. Will implement this next.
 * 
 * Also will clean up the check winner code. It's a bit sloppy right now.
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
let replay = false;
let totalScores = getScores(); // locally stored running scores
let currentPlayer = document.getElementById('playerturn'); // current player's turn
let playerChoice; // 1p or 2p

let boardWeight = [
    {vals: [0,1,2]},
    {vals: [3,4,5]},
    {vals: [6,7,8]},
    {vals: [0,3,6]},
    {vals: [1,4,7]},
    {vals: [2,5,8]},
    {vals: [0,4,8]},
    {vals: [2,4,6]}
    ];

gameBoard.forEach(element =>{ // adds click event listener
    element.addEventListener('click',currentMove);
    element.boxValue = Math.random(); // sets initial box values to random num
    element.hasClicked = false;
    element.boxWeight=1;
});

gameBoard[0].boxWeight=2; //sets weight values
gameBoard[2].boxWeight=2;
gameBoard[6].boxWeight=2;
gameBoard[8].boxWeight=2;
gameBoard[4].boxWeight=3;

gameSplash(); // game starts here

/********************************************************************************
                            Function Definitions Below
********************************************************************************/

function currentMove(){ // places current marker in box - triggered by eventListener
    if (playerMove&&playerChoice=='twoplayer'){ // play morty if "true"
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
    } else if (!playerMove){ // play rick if "false"
        if (this.hasClicked){
            alert("You've already played this box");
        } else {
        let playerRick = document.createElement('div');
        playerRick.classList.add('player-1');
        this.append(playerRick);
        this.boxValue = 'Rick';
        this.boxWeight = -1;
        document.getElementById('wub').play();
        boxCounter++;
        checkWinner(this.boxValue);
        this.hasClicked=true;
        }
    }

    playerMove = nextTurn(); // sets up next move
    
    if (playerMove&&playerChoice=='oneplayer'){
        console.log(`Box Counter: ${boxCounter}`)
        setTimeout(computerMoves,1000);
        playerMove = nextTurn();
    }

}

/********************************************************************************/

function firstMove(){ //determines who goes first
    return Math.random()>=0.5;
}

/********************************************************************************/

function nextTurn(){ //who goes next
    // currentPlayer.style.display = "inherit";
    currentPlayer.innerText = `Player${!playerMove ? 'Morty' : 'Rick'}'s move`;
    return !playerMove
}

/********************************************************************************/

function checkWinner(winner){ // function to check for a winner - hard coded for now
    if (winningCombo()){
        currentPlayer.style.display = "none";
        if(winner=='Rick'){ // updates scores
            updateScores(1,0,1);
        } else if(winner=='Morty'){
            updateScores(0,1,1);
        }
        setTimeout(()=>{document.getElementById('like').play();},1000); 
        setTimeout(()=>{replay = confirm(`Player${winner} is the winner!\n
        After ${totalScores[2]} games, the score is Rick: ${totalScores[0]} Morty: ${totalScores[1]}\nWould you like to play again?`);}, 2000); 
        setTimeout(()=>{
        if (replay){ // needs to get rid of time out for this to work
            // console.log('start new game');
            location.reload(); // reloads the game
        }}, 2000);

       } else if (boxCounter==9){
        currentPlayer.style.display = "none";
        setTimeout(()=>{document.getElementById('whatever').play();}, 1800);
        setTimeout(()=>{replay = confirm(`It's a draw!\nAfter ${totalScores[2]} games, the score is Rick: ${totalScores[0]} Morty: ${totalScores[1]}\nWould you like to play again?`);}, 2000);
        updateScores(0,0,1);
         // it's a draw
        setTimeout(()=>{
            if (replay){ // needs to get rid of time out for this to work
                console.log('start new game');
                location.reload(); // reloads the game
            }}, 2000);
        } else {
        //    console.log("no winner");
        }
}

/********************************************************************************/

function gameSplash(){ // function to display splash
    // show splash screen
    // gameboard hidden
    // player hits start
    let beginGame = document.querySelector("#startbutton"); 
    beginGame.addEventListener('click', playerSelect); // game start listener
}

/********************************************************************************/

function playerSelect(){ //visually shows players who goes first - only for 2 player mode
    
    let playerNumber = document.querySelectorAll(".playerchoice");
    playerNumber.forEach(option => {
        if (option.checked){
            playerChoice = option.value;
            console.log(playerChoice);
        }
    });

    if (playerChoice=='oneplayer'){
        let splashImg = document.querySelector('.introsplash'); // splash screen
        splashImg.style.display = 'none'; // makes splash go away
        playerMove=false; // playerRick goes first
        playerVsComputer();
    } else {

    let splashImg = document.querySelector('.introsplash'); // splash screen
    splashImg.style.display = 'none'; // makes splash go away
    let showSelect = document.querySelector(".playerselect");
    showSelect.style.display = "flex";

    let selector = document.querySelector("#armselector");
    let playerName;
    if(playerMove){
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

    setTimeout(()=>{
        let beginButton = document.querySelector("#begin");
        beginButton.addEventListener('click',gameStart);
        beginButton.style.display = "inherit";
    },3500)
    }

}

/********************************************************************************/

function gameStart(){ // show me what you got! (display cromulon increase size massively)
    let gameStart = document.querySelector('main');
    let visibleLoad = document.querySelector('#cromulonload'); // loads cromulon
    // let splashImg = document.querySelector('.introsplash'); // splash screen
    // splashImg.style.display = 'none'; // makes splash go away
    let playerSelectScreen = document.querySelector(".playerselect");
    playerSelectScreen.style.display="none";
    visibleLoad.style.display = 'flex'; // makes cromulon visible
    setTimeout(()=>{ // SHOW ME WHAT YOU GOT
        visibleLoad.style.transform = "scale(20)";
        visibleLoad.style.opacity = 0;
        document.querySelector('#showme').play();
    },500);

    setTimeout(()=>{
        visibleLoad.remove(); // deletes cromulon
        // let currentPlayer = document.getElementById('playerturn');
        currentPlayer.style.display = "inherit";
        currentPlayer.innerText = `Player${playerMove ? 'Morty' : 'Rick'}'s move`;
        gameStart.style.display="flex"; // display flex makes gameboard appear
    },3000);
}

/********************************************************************************/

function getScores(){ // keeps track of score locally
    let scoreKeep = []; // 0 = rick, 1 = morty, 2 is total games
    // window.localStorage.clear();
    scoreKeep.push(parseInt(window.localStorage.getItem('rickScore')),
                parseInt(window.localStorage.getItem('mortyScore')),
                parseInt(window.localStorage.getItem('totalGames')));
    // console.log("scores1:", scoreKeep);
    if (Number.isNaN(scoreKeep[2])){
        window.localStorage.setItem('rickScore', '0');
        window.localStorage.setItem('mortyScore', '0');
        window.localStorage.setItem('totalGames', '0');
        scoreKeep[0] = 0; // have to send as strings!
        scoreKeep[1] = 0; // but store as numbers
        scoreKeep[2] = 0;
    }
    // console.log("scores2:", scoreKeep);

    return scoreKeep; // returns array of historic scores
}

/********************************************************************************/

function updateScores(rick,morty,games){ //updates after every game
    totalScores[0] += parseInt(rick); 
    totalScores[1] += parseInt(morty); 
    totalScores[2] += parseInt(games);

    window.localStorage.setItem('rickScore', totalScores[0].toString());
    window.localStorage.setItem('mortyScore', totalScores[1].toString());
    window.localStorage.setItem('totalGames', totalScores[2].toString());

    // console.log(totalScores);
}

/********************************************************************************/

function winningCombo(){ // function to check 3 values, tbc...
    /**************
     * 0 * 3 * 6 *
     * 1 * 4 * 7 *
     * 2 * 5 * 8 *
     *************
     * Every time a spot is played check the up/down, left/right, diagonal
    checkUp -> 0-3-6, 1-4-7, 2-5-8
    checkAcross -> 0-1-2, 3-4-5, 6-7-8
    checkDiagonal -> 0-4-8, 2-4-6

    Currently checkWinner runs through all the combinations -> not very efficient
     */
    //gameBoard - global array storing all boxValue of played squares
   

    if (boxCounter<5){  // if boxCounter < 5 - not possible there is a winner (min 5)
        return false; 
    }

    if ((gameBoard[0].boxValue==gameBoard[1].boxValue&&gameBoard[1].boxValue==gameBoard[2].boxValue)||
       (gameBoard[3].boxValue==gameBoard[4].boxValue&&gameBoard[4].boxValue==gameBoard[5].boxValue)||
       (gameBoard[6].boxValue==gameBoard[7].boxValue&&gameBoard[7].boxValue==gameBoard[8].boxValue)||
       (gameBoard[0].boxValue==gameBoard[3].boxValue&&gameBoard[3].boxValue==gameBoard[6].boxValue)||
       (gameBoard[1].boxValue==gameBoard[4].boxValue&&gameBoard[4].boxValue==gameBoard[7].boxValue)||
       (gameBoard[2].boxValue==gameBoard[5].boxValue&&gameBoard[5].boxValue==gameBoard[8].boxValue)||
       (gameBoard[0].boxValue==gameBoard[4].boxValue&&gameBoard[4].boxValue==gameBoard[8].boxValue)||
       (gameBoard[2].boxValue==gameBoard[4].boxValue&&gameBoard[4].boxValue==gameBoard[6].boxValue)){
        // checks for all winning combinations 
        return true;
    }
    return false; // no winner
}

/********************************************************************************/

function playerVsComputer(){ // implements computer AI

    // console.log('1p');

    /* Implementing this will require a change to the splash screen as well since it gives the user a choice between 1p or 2p
    *
    * each turn the AI will check if a winning combination is still possible
    * if AI goes first, it will always pick the middle spot
    * if AI goes second it will pick middle spot. And if already occupied, it will randomly choose
    * each subsequent move it will also check if the player is within one move of winning and will prioritize blocking unless it can win that turn. --> check two in a row opponent or self. self has priority
    * if two blocking or winning moves -> choose random between them as this is a guaranteed win or loss
    * 
    * when computer's turn to move it will simply add player-1 or player-2 class to the square it chooses
    * then after a short delay allow the player to go
    * 
    * computer's avatar will be Morty for now. Will add more options later
    * maybe different avatars will be smarter or dumber
    * 
    * Pseudocode:
    * player always goes first
    * player goes first and selects center position -> select random corner position
    * player goes first and doesn't select center position -> select center position
    * each subsequent move - if player has two in a row, must block, unless computer can win
    * order of preference -> Center (4) Corner (0,2,6,8) NonCenter Middle (1,3,5,7)
    * -> instant win -> blocking -> still a chance to win
    * canWin(),blockOp(), canWin()
    * 
    */

   let gameStart = document.querySelector('main');
   let visibleLoad = document.querySelector('#cromulonload'); // loads cromulon
   visibleLoad.style.display = 'flex'; // makes cromulon visible
   setTimeout(()=>{ // SHOW ME WHAT YOU GOT
       visibleLoad.style.transform = "scale(20)";
       visibleLoad.style.opacity = 0;
       document.querySelector('#showme').play();
   },500);

   setTimeout(()=>{
       visibleLoad.remove(); // deletes cromulon
       // let currentPlayer = document.getElementById('playerturn');
       currentPlayer.style.display = "inherit";
       currentPlayer.innerText = `Player Rick's move`;
       gameStart.style.display="flex"; // display flex makes gameboard appear
   },3000);

}


/****************************************************************************************/

function getWeight(){ // gets highest weight of a row
    let tempIndex;
    let tempWeight = 0;
    boardWeight[0].totalWeight = sumWeight(0,1,2);
    boardWeight[1].totalWeight = sumWeight(3,4,5);
    boardWeight[2].totalWeight = sumWeight(6,7,8);
    boardWeight[3].totalWeight = sumWeight(0,3,6);
    boardWeight[4].totalWeight = sumWeight(1,4,7);
    boardWeight[5].totalWeight = sumWeight(2,5,8);
    boardWeight[6].totalWeight = sumWeight(0,4,8);
    boardWeight[7].totalWeight = sumWeight(2,4,6);

    // console.log(boardWeight);

    for (let i=0; i<boardWeight.length; i++){ // gets rows with highest weight
        // console.log(boardWeight[i].totalWeight + " " + tempWeight );

        if (boardWeight[i].totalWeight>tempWeight){
            tempIndex = i;
            tempWeight = boardWeight[i].totalWeight;
        }
    }
    // tempIndex will store the row with highest value

    // console.log(`index ${tempIndex} weight ${tempWeight}`);

    // next finds highest value in highest weight

    return getMax(tempIndex); // finding max value in max weight row
}

/********************************************************************************/

function sumWeight(val1,val2,val3){ // finds weight value of a given row
    return (gameBoard[val1].boxWeight+gameBoard[val2].boxWeight+gameBoard[val3].boxWeight);
}

/********************************************************************************/

function getMax(index){
    let tempMax=-1;
    let val1,val2,val3;
    val1 = boardWeight[index].vals[0];
    val2 = boardWeight[index].vals[1];
    val3 = boardWeight[index].vals[2];

    // console.log(`${val1} ${val2} ${val3}`);
    // console.log(gameBoard[val1].boxWeight, gameBoard[val2].boxWeight, gameBoard[val3].boxWeight,)
    
    if (gameBoard[val1].boxWeight>gameBoard[val2].boxWeight&&gameBoard[val1].boxWeight>gameBoard[val3].boxWeight&&!gameBoard[val1].hasClicked){
        tempMax = val1; // val1 is the biggest and hasn't been clicked
    } else if (gameBoard[val2].boxWeight>gameBoard[val1].boxWeight&&gameBoard[val2].boxWeight>gameBoard[val3].boxWeight&&!gameBoard[val2].hasClicked){
        tempMax = val2; // val2 is the biggest and hasn't been clicked
    } else if (gameBoard[val3].boxWeight>gameBoard[val1].boxWeight&&gameBoard[val3].boxWeight>gameBoard[val2].boxWeight&&!gameBoard[val3].hasClicked){
        tempMax = val3; // val3 is the biggest and hasn't been clicked
    } else { // biggest values have been clicked
        if (!gameBoard[val1].hasClicked){
            tempMax = val1;
        } else if (!gameBoard[val2].hasClicked){
            tempMax = val2;
        } else {
            tempMax = val3;
        }

    }
    return tempMax;
}

/********************************************************************************/

function computerMoves(){
    let compMove = getWeight();
    console.log(compMove);
    let playerMorty = document.createElement('div');
    playerMorty.classList.add('player-2');
    gameBoard[compMove].append(playerMorty);
    gameBoard[compMove].boxValue = 'Morty';
    // document.getElementById('ohman').play(); Maybe we don't need this for comp
    boxCounter++;
    checkWinner(gameBoard[compMove].boxValue);
    // console.log(boxCounter);
    gameBoard[compMove].hasClicked=true;
}