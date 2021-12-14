class Node // Nó padrão de uma LSE
{
	constructor(x){
		this.key = x,
		this.next = null
	}
}

class LSE // LSE com algumas de suas funções básicas e algumas complementares (comentadas abaixo)
{
	constructor(){
		this.leng = 0,
		this.head = null,
		this.tail = null
	}
	size(){return this.leng} //retorna a quantidade de chaves armazenadas
	push(x) //adiciona elemento no inicio da lista
  {
		let u = new Node(x);
		if(this.leng === 0) this.tail = u;
		else u.next = this.head;
		this.head = u;
		this.leng++;
	}
	add(x) //adiciona elemento no fim da lista
  {
		let u = new Node(x);
		if(this.leng === 0) this.head = u;
		else this.tail.next = u;
		this.tail = u;
		this.leng++;
	}
	pop() //remove elemento do inicio da lista
  {
		if(this.leng === 0) return null;
		let x = this.head.key;
		this.head = this.head.next;
		this.leng--;
		if(this.leng === 0) this.tail = null;
		return x;
	}
	
	contElem(x) //informa se um dado elemento faz parte da lista
  {
		let u = this.head;
		while(u != null){
			if(u.key === x) return true;
			u = u.next;
		}
		return false;
	}
	
	longestSeq() //retorna um objeto com dados da maior sequência crescente de números seguidos. Ex: 1,4,5,6,7,9; tam: 4, finish: 7
  {
		if(this.leng == 0) return {finish: null, tam: 0};
		if(this.leng == 1) return {finish: this.head.key, tam: 1};
		let count = 1;
		let longest = 1;
		let prev = this.head;
		let aux = prev.key;
		let u = prev.next;
		while(u != null){
			if(prev.key + 1 == u.key) count++;
			else count = 1;
			if(count > longest){
				aux = u.key;
				longest = count;
			}
			prev = u;
			u = u.next;
		}
		return {finish: aux, tam: longest};
	}
	
	print() //imprime todos os valores da lista (utilizada apenas para testes)
  {
		let x = this.head;
		while(x != null){
			console.log(x.key);
			x = x.next;
		}
	}
}