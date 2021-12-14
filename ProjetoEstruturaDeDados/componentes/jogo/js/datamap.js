//cada navio contém um array de strings que representam os títulos de suas imagens horizontais e um de strings que representam os títulos de suas imagens verticais.
const N1 = {
	tam: 1,
	imgsHor: ['subhrz'],
	imgsVer: ['subver']
}

const N2 = {
	tam: 2,
	imgsHor: ['nhrz1', 'nhrz4'],		
	imgsVer: ['nver1', 'nver4']
}

const N3 = {
	tam: 3,
	imgsHor: ['nhrz1', 'nhrz2', 'nhrz4'],		
	imgsVer: ['nver1', 'nver2', 'nver4']
}

const N4 = {
	tam: 4,
	imgsHor: ['nhrz1', 'nhrz2', 'nhrz3', 'nhrz4'],
	imgsVer: ['nver1', 'nver2', 'nver3', 'nver4']
}

function getRandom(min, max) //retorna um número inteiro aleatório que está dentro do intervalo [min, max]
{
	if(max < min)
		max, min = min, max;
	let rand = Math.random()*(1 + max - min) + min;
	return Math.floor(rand);
}

class MapNode //Estrutura de nó de uma RwayTrie
{
	constructor(){
		this.val = null;
		let a = [];
		for(let i=0; i  < 10; i++){
			a.push(null);
		}
		this.next = a;
	}
}

class Map //Estrutura de armazenamento das chaves do mapa, baseada em uma RwayTrie. Esse mapa suporta apenas chaves com dois caracteres, no qual o primeiro é uma letra minúscula de 'a' a 'j', e o segundo é um número de 0 a 9, ou seja, foi feito específicamente para uma tabela 10 x 10.
{
	costructor(){
		this.quantNavPieces = 0,
		this.root = null
	}
	
	insert(key,val) //insere um novo valor atrelado a uma chave do tipo string
  {
		if(this.root == null){
			this.root = new MapNode();
			this.quantNavPieces = 0; //atributo definido para contar a quantidade de peças de navios armazenadas no mapa. O valor armazenado influencia no termino do jogo e na pontuação final
		}
		let x = this.root;
		for(let i = 0; i < 2; i++){
			let c = (x == this.root) ? key.charCodeAt(0) - 97 : parseInt(key[1],10);
			if(x.next[c] == null)
				x.next[c] = new MapNode();
			x = x.next[c];
		}
		x.val = val;
	}
	
	get(key) //retorna o valor atrelado a uma determinada chave. Se a chave não foi definida, retorna null
  {
		let x = this.root;
		for(let i = 0; i < 2; i++){
			if(x == null) return null;
			let c = (x == this.root) ? key.charCodeAt(0) - 97 : parseInt(key[1],10);//armazena um algarismo silábico ou alfanumérico, dependendo do índice da string (0: silábico, 1: alfanumérico).
			x = x.next[c];
		}
		if(x == null || x.val == null) return null;
		return x.val;
	}
	
	remove(key) //remove o valor atrelado a uma determinada chave e decrementa o valor do atributo "quantNavPieces". Se a chave não foi definida, retorna null (obs: não remove o nó completamente nulo da trie, como na remoção padrão)
  {
		let x = this.root;
		let c; //armazena um algarismo silábico ou alfanumérico, dependendo do índice da string (0: silábico, 1: alfanumérico).
		for(let i = 0; i < 2; i++){
			if(x == null) return null;
			c = (x == this.root) ? key.charCodeAt(0) - 97 : parseInt(key[1],10);
			if(i < 1) x = x.next[c];
		}
		if(x.next[c] == null) return null;
		let y = x.next[c].val;
		x.next[c].val = null;
    this.quantNavPieces--;
		return y;
	}
	
	ktmAux(x, pre, s, q) //metodo auxiliar para keysThatMatch, serve para coletar as chaves em uma fila passada como parâmetro
  {
		if(x == null) return;
		let d = pre.length;
		if(d == s.length){
			if(x.val != null) q.add(pre);
			return;
		}
		let nxt = s[d];
		for(let i = 0; i < 10; i++){
			let c = (x == this.root) ? String.fromCharCode(i+97) : String.fromCharCode(i+48);
			if(nxt == '.' || nxt == c)
			 this.ktmAux(x.next[i],pre+c,s,q);
		}
	}
	
	keysThatMatch(s) //pega uma string contendo um wildcard como argumento e devolve todas as chaves que casam com o padrão (equivalente à keysThatMatch da RwayTrie passada em sala de aula).
  {
		let q = new LSE();
		this.ktmAux(this.root,'',s,q);
		return q;
	}
	
	putHorz(nav) //armazena valores com chaves respectivas que formam um navio horizontal de tamanho t em uma linha aleatória. Se essa linha não comporta o navio, a inserção não é feita.
  {
			let t = nav.tam;
			let line = getRandom(97,106);
			line = String.fromCharCode(line);
			let q = this.keysThatMatch(line + '.');
			let list = new LSE();
			for(let i = 0; i < 10; i++){
				let box = line + i;
				if(!q.contElem(box)) list.add(i);
			}
			let seq = list.longestSeq();
			if(t <= seq.tam){
				let n = seq.finish + 1 - t;
				let init = seq.finish - seq.tam + 1;
				let rand = getRandom(init, n);
				for(let i = rand; i < rand + t; i++){
					this.insert(line + i, nav.imgsHor[i-rand]);
          this.quantNavPieces++;
				}
				return false;
			}
			else return true;
	}
	
	putVert(nav) //armazena valores com chaves respectivas que formam um navio vertical de tamanho t em uma coluna aleatória. Se essa coluna não comporta o navio, a inserção não é feita.
  {
			let t = nav.tam;
			let col = getRandom(0,9);
			col = col.toString();
			let q = this.keysThatMatch('.' + col);
			let list = new LSE();
			for(let i = 97; i < 107; i++){
				let box = String.fromCharCode(i) + col;
				if(!q.contElem(box)) list.add(i);
			}
			let seq = list.longestSeq();
			if(t <= seq.tam){
				let n = seq.finish + 1 - t;
				let init = seq.finish - seq.tam + 1;
				let rand = getRandom(init, n);
				for(let i = rand; i < rand + t; i++){
					this.insert(String.fromCharCode(i) + col, nav.imgsVer[i-rand]);
          this.quantNavPieces++;
				}
				return false;
			}
			else return true;
	}

  putBombs(n) //insere uma quantidade n de chaves com valores 'bomb' na trie em posições aleatórias
  {
    for(let i = 0; i < n; i++){
      let line = String.fromCharCode(getRandom(97,106));
      let col = getRandom(0,9);
      if(this.get(line + col) != null) i--;
      else this.insert(line + col, 'bomb');
    }
  }
	
	distRand(nav,n) //aleatoriza a forma de distribuição do navio (horizontal ou vertical)
  {
		for(let i = 0; i < n; i++){
			let dir = getRandom(1,1000)%2;
			let fail;
			if(dir == 0) fail = this.putHorz(nav);
			else fail = this.putVert(nav);
			if(fail) i--;
		}
	}
	
	initialize() //responsável por distribuir todos os navios e bombas na trie
  {
		this.distRand(N4,2); //dois navios de tamanho 4
		this.distRand(N3,3); //três navios de tamanho 3
		this.distRand(N2,4); //quatro navios de tamanho 2
		this.distRand(N1,4); //quatro navios de tamanho 1, totalizando 29 peças de navio
    this.putBombs(12); //12 bombas
	}
}