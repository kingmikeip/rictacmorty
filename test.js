// js file for testing things before integrating into the mail JS file
/*
     
     order of preference -> Center (4) Corner (0,2,6,8) NonCenter Middle (1,3,5,7)

*/

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


let gameBoard = [{},{},{},{},{},{},{},{},{}];


gameBoard.forEach(element => {
    element.hasClicked=false;
    element.boxValue='not played';
    element.boxWeight=1;
});
gameBoard[0].boxWeight=2; //sets weight values
gameBoard[2].boxWeight=2;
gameBoard[6].boxWeight=2;
gameBoard[8].boxWeight=2;
gameBoard[4].boxWeight=3;

function playerVsComputer(){
    let noWinner = true;
    let moveCounter = 0;

while(moveCounter < 9){
    gameBoard = getPlayerMove(gameBoard);
    // console.log(gameBoard);
    moveCounter++;
    gameBoard = computerMove(gameBoard);
    moveCounter++;
    console.log(gameBoard);
    console.log(moveCounter,"random");
}
    
}

// playerVsComputer();

/********************************************************************************/

function getPlayerMove(gameBoard){
    let currentMove = prompt("Which box do you want to move?");
    
    console.log(parseInt(currentMove));
    if (gameBoard[parseInt(currentMove)].hasClicked=='played'){
        currentMove = prompt("That box has already been played. Please choose another box");
    } 
    gameBoard[parseInt(currentMove)].hasClicked='played';
    gameBoard[parseInt(currentMove)].boxValue='player 1';
    return gameBoard;
}

/********************************************************************************/

function computerMove(gameBoard,method){

    let satisfied=false;
    while(!satisfied&&method=="random"){ // computer moves randomly
    let randomIndex = Math.floor(Math.random()*9); //selects number 0-8 randomly
    if (!gameBoard[randomIndex].hasClicked){
        gameBoard[randomIndex].hasClicked=true;
        gameBoard[randomIndex].boxValue='player 2';
        console.log(`computer played ${randomIndex}`);
        satisfied=true;
        }   
    }
/*
    // check for two in a row
    // * - 3 across [0,1,2], [3,4,5], [6,7,8]
    // * - 3 up and down [0,3,6], [1,4,7], [2,5,8]
    // * - 2 diagonal [0,4,8], [2,4,6]

    // each turn check weight of all 8 possibilities
    // weight stays the same if computer moves
    // weight changes to -1 if player moves
    // computer selects path with greatest weight and selects highest weight box

    **************     
     * 0 * 3 * 6 *
     * 1 * 4 * 7 *
     * 2 * 5 * 8 *
     ************* 
     
    **************
     * 2 * 1 * 2 *
     * 1 * 3 * 1 *
     * 2 * 1 * 2 *
     *************
     
     create 8 element array, each has totalWeight, return one with highest weight
     from that select box with highest weight

     0 012
     1 345
     2 678
     3 036
     4 147
     5 258
     6 048
     7 246

*/

return gameBoard;
}

/********************************************************************************/

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
    // console.log(`index ${tempIndex} weight ${tempWeight}`);

    // next finds highest value in highest weight

    // console.log(boardWeight[tempIndex]);

    console.log(gameBoard[getMax(tempIndex)].boxWeight); // finding max value in max weight row
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

    console.log(`${val1} ${val2} ${val3}`);
    console.log(gameBoard[val1].boxWeight, gameBoard[val2].boxWeight, gameBoard[val3].boxWeight,)
    
    if (gameBoard[val1].boxWeight>gameBoard[val2].boxWeight&&gameBoard[val1].boxWeight>gameBoard[val3].boxWeight){
        tempMax = val1; // val1 is the biggest
    } else if (gameBoard[val2].boxWeight>gameBoard[val1].boxWeight&&gameBoard[val2].boxWeight>gameBoard[val3].boxWeight){
        tempMax = val2; // val2 is the biggest
    } else {
        tempMax = val3;
    }
    return tempMax;
}



getWeight();


// if player moves set boxvalue to -2
// if computer moves set value +=1