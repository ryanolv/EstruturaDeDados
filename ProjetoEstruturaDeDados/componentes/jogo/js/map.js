var tab = document.getElementById("map"); //tabela onde o mapa será construído na página jogo.html
var tr = document.createElement("tr");
tr.appendChild(document.createElement("th").appendChild(document.createTextNode(".")));

for(let i = 48; i < 58; i++) //primeira linha da tabela (cabeçalhos das colunas)
{
let txt = String.fromCharCode(i);
  let th = document.createElement("th");
  th.innerHTML = txt;
  tr.appendChild(th);
 }
tab.appendChild(tr);

for(let i = 97; i < 107; i++) //matriz para distribuição dos botões da tabela. O range de 97 até 106 é referente aos codigos ascii para as letras minúsculas de 'a' à 'j'
{
  let txt = String.fromCharCode(i); 
  tr = document.createElement("tr");
  let line = document.createTextNode(txt);
  let label = document.createElement("th");
  label.appendChild(line);
  tr.appendChild(label);
  for(let j = 0; j < 10; j++) //insere 10 botões em cada linha da tabela
  {
    let td = document.createElement("td");
    let box = "'" + txt + j + "'"; //string que representa as cordenadas de um botão no mapa. será atribuída como id do seu respectivo botão e servirá também como chave na trie do mapa. Ex de strings que serão atribuídas a essa variável: "'a1'", "'b2'", "'j9'", etc.
    let but = '<button type="button" class="butt" id=' + box + ' onclick="pushB(' + box + ')"><img class="img" src="../imagens/empty.png"/></button>'; //Os botões iniciam com a imagem padrão do mapa, até que ocorra uma interação
    td.innerHTML = but;
    tr.appendChild(td);
  }
  tab.appendChild(tr);
}