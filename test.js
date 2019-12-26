// js file for testing things before integrating into the mail JS file

function playerSelect(){ //visually shows players who goes first
    let selector = document.querySelector("#armselector");
    let playerName;
    if(firstMove()){
    selector.style.transform = 'rotate(20.40turn)'; // morty
    playerName = 'Morty';
    } else {
        selector.style.transform = 'rotate(20.85turn)'; // rick
        playerName = 'Rick';
    }
    setTimeout(()=>{
        let playerMove = document.querySelector('.playerselect');
        let newPlayer=document.createElement('p');
        newPlayer.innerText = `Player${playerName} Goes First!`;
        playerMove.append(newPlayer);
    },2100)
}

playerSelect();

function firstMove(){ //determines who goes first
    return Math.random()>=0.5;
}