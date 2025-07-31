//let titulo = document.querySelector('h1');
//titulo.innerHTML = "Bem-vindo ao jogo do numero secreto!";

//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML = "Escolha um numero entre 1 e 10";

let listaDeNumerosSorteados = [];
let numeroLimite = 100;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto
     if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function exibirMensagemInicial() {
  exibirTextoNaTela('h1', 'Bem-vindo ao jogo do numero secreto!');
  exibirTextoNaTela('p', 'Escolha um numero entre 1 e 100');
}
exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;
    console.log(chute == numeroSecreto);

    if (chute == numeroSecreto) {
      exibirTextoNaTela('h1', 'parabens, voce acertou!');
      let palavraTentativa = tentativas == 1 ? 'tentativa' : 'tentativas';
      let mensagemTentativas = ('Você acertou o numero secreto com ' + tentativas + ' ' + palavraTentativa);
     exibirTextoNaTela('p', mensagemTentativas);
     document.getElementById('reiniciar').removeAttribute('disabled');
    } else{
      if (chute > numeroSecreto) {
        exibirTextoNaTela('p', 'O numero secreto é menor que ' + chute);
      } else {
          exibirTextoNaTela('p', 'O numero secreto é maior que: ' + chute);
        } tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
  let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
  let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;
    if (quantidadeDeElementosNaLista >= numeroLimite) {
      listaDeNumerosSorteados = [];
      console.log('Lista de numeros sorteados foi reiniciada.');
    }

  if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
    return gerarNumeroAleatorio();
  } else {
    listaDeNumerosSorteados.push(numeroEscolhido);
    console.log(listaDeNumerosSorteados);
    return numeroEscolhido;
  }
}

function limparCampo() {
  chute = document.querySelector('input');
  chute.value = '';
}

function reiniciarJogo() {
  numeroSecreto = gerarNumeroAleatorio();
  tentativas = 1;
  limparCampo();
  exibirMensagemInicial();
  document.getElementById('reiniciar').setAttribute('disabled', true);
}