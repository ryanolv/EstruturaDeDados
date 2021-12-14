var map = new Map();
map.initialize(); //navios e minas distribuídos na trie de armazenamento

const lives = 5; //definição da quantidade de vidas
var countTime = 0; //variável de contagem de tempo
var countBombs = 0; //variável de contagem de bombas atingidas
var score; //variável que armazena a pontuação do jogador ao longo do jogo

function count() //responsável por atualizar as variáveis de tempo e score e exibí-las no painel
{
  score = 900 * (29 - map.quantNavPieces) - 0.4 * countTime;
document.getElementById("tempo").innerHTML = ("Tempo: " + countTime + "segs");
  if(score < 0) score = 0;
  document.getElementById("pontuacao").innerHTML = "Pontuação: " + parseInt(score);
  countTime += 1;
}

setInterval(count ,1000); //executa a função count a cada segundo passado

function setChances(x) //atualiza a quantidade de vidas do jogador e exibe no paínel
{
  document.getElementById("chances").innerHTML = "Vidas: " + x;
}

setChances(lives); //inicia exibindo o número total de vidas fornecidos ao jogador

function pushB(s) //é executada sempre que um botão é pressionado e recebe como parâmetro uma chave que representa a posição na qual o botão se encontra
{
  let im = map.get(s); //verifica se existe algum valor armazenado para a chave recebida, se houver, será uma peça de navio ou uma bomba
  let but = document.getElementById(s);
  but.setAttribute("disabled", "true"); //assim que um botão é pressionado ele é desativado, assim é garantido que ele não execute a função novamente
  if(im == null){
    but.innerHTML = '<img class="img" src="../imagens/splash.png"/>';
  }
  else{
    if(im == 'bomb'){
      countBombs += 1;
      setChances(lives-countBombs);
    }
    else map.remove(s); //esse é o caso no qual uma peça de navio foi encontrada. Assim que é encontrada, seu valor é removido da trie e o  valor do atributo "quantNavPieces" é decrementado
    but.innerHTML = '<img class="img" src="../imagens/' + im + '.png"/>';
  }
  if(countBombs == lives || map.quantNavPieces == 0) 
    endGame();
}

function endGame() //finaliza o jogo
{
  score = parseInt(900 * (29 - map.quantNavPieces) - 0.4 * countTime);
  let message;
  if(countBombs == lives)
    message = "Você Perdeu! :(\n";
  else
    message = "Você Venceu! :D\n";
  let r = confirm(message + "Pontuação: " + score + "\nDeseja tentar novamente?");
  if(r)
    window.location.href = "jogo.html";
  else
     window.location.href = "../../index.html";
}