function gameStart(){
    let visibleLoad = document.querySelector('#cromulonload');
    let splashImg = document.querySelector('.introsplash');
    splashImg.style.display = 'none';
    visibleLoad.style.display = 'flex';
    setTimeout(()=>{
        visibleLoad.style.transform = "scale(10)";
    },1000);
    document.querySelector('#showme').play();
}

