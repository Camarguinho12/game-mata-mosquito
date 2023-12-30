//Metodo para pegar o nivel de dificuldade
function getNivel(){
    return document.querySelector('#nivel').value;
}

//Reiniciar a Partida
function reiniciar(){
    window.location.href = 'jogo.html?nivel=' + sessionStorage.getItem('nivel');
}

//Novo Jogo
function novoJogo(){    
    sessionStorage.setItem('nivel', getNivel());

    window.location.href = 'jogo.html?nivel=' + getNivel(); //paso o endereco url com parametros de nivel de dificuldade do jogo
}