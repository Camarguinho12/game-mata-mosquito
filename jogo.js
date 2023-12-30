//VARIAVEIS GLOBAIS
let altura; //crio uma variavel global que pode ser chamada onde precisar
let largura; //crio uma variavel global que pode ser chamada onde precisar
let vidas = 3; //crio a variavel vida que servira para contar as vidas do jogador
let tempo = 30; //crio a variavel tempo para definir o tempo que dura a partida
let tempoCriaMosquito = 0; //crio a variavel que sera usada para defininir o tempo de vriacao dos mosquitos na pagina

//DEFININDO O NIVEL DO JOGO
let searchParams = new URL(window.location).searchParams; //analiso os parametros da url e atribuo tudo a uma variavel
let nivel = searchParams.get('nivel'); //uso o metodo get para pegar o parametro que quero usar

if(nivel.toLocaleLowerCase() == 'dificil'){
    tempoCriaMosquito = 1000;
}else if(nivel.toLocaleLowerCase() == 'expert'){
    tempoCriaMosquito = 600;
}else{
    tempoCriaMosquito = 1500;
}

//TAMANHO DA JANELA DO JOGO
function altLargPage(){ //crio uma funcao para pergar o tamanho da janela
    largura = window.innerWidth; //pego a largura da janela e atribuo a variavel largura
    altura = window.innerHeight; //pega a altura da janela e atribuo a variavel altura
}

altLargPage() //chamo a funcao para atribuir os valores as variaveis, para elas averem um valor ja quando inizia

window.addEventListener('resize', altLargPage); // digo ao browser que toda vez que um evento de redimensionamento da janela ocorrer, a funcao deve ser chamada para atribuir os valores atuais de altura e largura da janela


//CRONOMETRO
function contador(){
    if(tempo < 0){
        clearInterval(criaMosquito);
        clearInterval(cronometro);
        
        window.location.href = 'vitoria.html';
    }else{
        document.querySelector('#tempoRestante').innerText = tempo;
    }

    tempo--;
}

const cronometro = setInterval(contador, 1000);


//MOSQUITO
function tamanhoMosquito(){ //crio a funcao para criar o tamanho do mosquito de forma aleatoria
    const tamanho = Math.floor(Math.random() * 3); //crio um numero aleatorio entre 0 e 3 

    if(tamanho == 0){ //se a variavel tamanho for igual a 0 entao retona 'mosquito1', que è uma classe que criamos no file style.css passando um tamanho
        return 'mosquito1';
    }else if(tamanho == 1){ //senao se a variavel tamanho for igual a 1 entao retorna 'mosquito2', que è uma classe que criamos no file style.css passando um tamanho
        return 'mosquito2';
    }else{
        return 'mosquito3'; //senao retorna 'mosquito3', que è uma classe que criamos no file style.css passando um tamanho
    }
}

function direcaoMosquito(){
    const direcao = Math.floor(Math.random() * 2); //crio um numero aleatorio entre 0 e 2

    if(direcao == 1){ //senao se a variavel direcao for igual a 1 entao retorna 'ladoA', que è uma classe que criamos no file style.css passando a direcao do mosquito
        return 'ladoA';
    }else{
        return 'ladoB'; //senao retorna 'ladoB', que è uma classe que criamos no file style.css passando a direcao do mosquito
    }
}

function removeMosquito(){
    document.querySelector('#mosquitoId').remove(); //removo o elemento com o id especificado
}

function mosquito(){
    if(document.querySelector('#mosquitoId')){ //se document.querySelector('#mosquitoId') == true, ou seja se existe um elemento com esse id na pagina
        removeMosquito(); //chamo a funcao para remover o mosquito da pagina

        if(vidas > 0){
            document.querySelector('#coracao' + vidas).src = 'imagens/coracao_vazio.png';

            vidas--;
        }else{
            window.location.href = 'game-over.html'
        }
    }  

    let positionX = (Math.floor(Math.random() * largura)) - 90; //crio posicoes random entre 0 e a largura da janela, e dimunuo 90px para a imagem nao passar para fora da janela
    let positionY = (Math.floor(Math.random() * altura)) - 90; //crio posicoes radom entre 0 e a altura da janela, e dimunuo 90px para a imagem nao passar para fora da janela

    positionX = positionX < 0 ? 0 : positionX; //defino que se o valor contido na variavel for negativo atribuo 0px, atribuo ela mesma, porque visto que estamos diminuindo 52, pode ser que retorne um valor negativo e a imagem nao fique dentro da janela
    positionY = positionY < 0 ? 0 : positionY; //defino que se o valor contido na variavel for negativo atribuo 0px, atribuo ela mesma, porque visto que estamos diminuindo 52, pode ser que retorne um valor negativo e a imagem nao fique dentro da janela

    const mosquito = document.createElement('img'); //crio um elemento de imagem html, que sera o nosso mosquito
    mosquito.src = 'imagens/mosquito.png'; //atribuo a imagem ao elemento atraves do atributo src e passando o diretorio da imagem
    mosquito.classList.add(tamanhoMosquito());
    mosquito.classList.add(direcaoMosquito()); //atribuo a funcao para definir a direcao do nosso mosquito
    mosquito.style.left = positionX + 'px'; //atribuo a posicao onde sera posicionado o nosso mosquito, que no caso sera a nossa posicao random
    mosquito.style.top = positionY + 'px'; //atribuo a posicao onde sera posicionado o nosso mosquito, que no caso sera a nossa posicao random
    mosquito.style.position = 'absolute'; //para que as coordenadas da posicao sejam aplicadas o meu elemento precisa ser absoluto
    mosquito.id = 'mosquitoId'; //atribuo um id ao elemento

    document.body.appendChild(mosquito); //adiciono o elemento mosquito no body

    mosquito.addEventListener('click', removeMosquito); //ao clicar no elemento chamo a funcao para remover o elemento da pagina
}

const criaMosquito = setInterval(mosquito, tempoCriaMosquito); //chamo a funcao mosquito() a cada intervalo de tempo