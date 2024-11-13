const state = {
    // elementos visuais
    view:{
        squares: document.querySelectorAll('.square'),
        enemy: document.querySelector('.enemy'),
        timeLeft: document.querySelector('#time-left'),
        score: document.querySelector('#score'),
        lives: document.querySelector("#lives"),
    },
    // valores
    values:{
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        currentLives: 3,
},
// ações
    actions:{
        timerId: setInterval(randomSquare, 1000),
        countsDownTimerId: setInterval(countDown, 1000),
}
};


function playSound(audioName){
    let audio = new Audio(`./src/audios/${audioName}.m4a`)
    audio.volume = 0.4;
    audio.play()
}


function countDown(){
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if(state.values.currentTime<=0) { 
        clearInterval(state.actions.countsDownTimerId);
        clearInterval(state.actions.timerId);
        alert("Game Over! O seu resultado foi: " + state.values.result
        );
        location.reload()
    }

}

function randomSquare(){
    state.view.squares.forEach((square)=>{
        square.classList.remove("enemy");
    });
    let randomNumber = Math.floor(Math.random()*9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add('enemy');
    state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox(){
    state.view.squares.forEach((square)=>{
        square.addEventListener("mousedown", ()=> {
            if(square.id === state.values.hitPosition){
                state.values.result++
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound('hit')
            } else {
                state.values.currentLives--
                state.view.lives.textContent = state.values.currentLives;
                playSound('error')
            };
            if(state.values.currentLives === 0){
                alert('Game Over!')
                location.reload();
            }
        })
    });
};

function init(){
    addListenerHitBox();
};

init();
