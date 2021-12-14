Relatório técnico - Game Batalha Naval

    O jogo, desenvolvido em Javascript, é um estilo de batalha naval em que o jogador joga contra a computador. Em sua estrutura, o jogo distribui aleatória mente barcos e bombas em um mapa e o jogador tem que encontrar todos os barcos. Perde se acertar um determinado número do bombas.
  Cada modelo de barco é um objeto diferente composto por dois arrays que representam a imagem do barco no mapa e uma instância que representa o tamanho.
    A estrutura que armazena os dados do mapa, chamada de Mão, é uma adaptação do tipo RwayTrie para trabalhar especificamente com uma tabela 10×10. Nela contém todos os métodos fundamentais de uma estrutura Trie. E dentre os métodos, q um que utiliza como estrutura auxiliar a Lista Simplesmente Encadeada (LSE).
   A interface é do mapa é feita utilizando documento HTML e estilizada usando CSS. No arquivo map.js no diretório /componentes/jogo/js é feita toda interação do javascript com o HTML e no arquivo arquivo main.js é feito todo o progresso do jogo.
     Por fim, todo fluxo do programa inicia no arquivo index.html.

