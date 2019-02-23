var tabela = document.getElementById("listaTarefas");
var input = document.getElementById("inputTarefa");
var lista = [];

carregar();

//Função para incluir uma nova tarefa no array
function incluir(){
	tabela.innerHTML += "<tr onclick='concluir(this)'><td>"+input.value+"</td>"+
	"<td>"+
	"<button>Alterar</button>"+
	"<button>X</button>"+
	"</td></tr>";
	lista.push(input.value);
	atualizar();
	input.value = "";
	location.reload();
}
//Função que lista em forma de tabela as tarefas
function listar(){
	tabela.innerHTML="";
	lista.forEach(function(item,index){
		if(item.indexOf("!!!")==-1){
			tabela.innerHTML += "<tr idt='"+index+"' onclick='concluir(this)'><td>"+item+"</td>"+
			"<td>"+
			"<button onclick='alterar(this,event)'>Alterar</button>"+
			"<button onclick='excluir(this,event)'>X</button>"+
			"</td></tr>";
		}else{
			item = item.replace("!!!","");
			tabela.innerHTML += "<tr class='concluido' idt='"+index+"' onclick='concluir(this)'><td>"+item+"</td>"+
			"<td>"+
			"<button>Alterar</button>"+
			"<button>X</button>"+
			"</td></tr>";
		}
	});
}
//Função que deifine o evento do botão para alterar uma tarefa ja adicionada
function alterar(el,ev){
	var elemento = el;
	var evento = ev;
	ev.stopPropagation();
	tr = el.parentElement.parentElement;
	tr.children[0].innerHTML = "<input type='text' value='"+tr.children[0].innerHTML+"'>";
	el.onclick = function(){salvar(elemento,evento);};
	el.innerText="Salvar";
}
//Função salvar o valor alterado 
function salvar(el,ev){
	var elemento = el;
	var evento = ev;
	ev.stopPropagation();
	tr = el.parentElement.parentElement;
	valor =tr.children[0].children[0].value;
	tr.children[0].innerHTML = valor;
	el.onclick = function(){alterar(elemento,evento);};
	el.innerText="Alterar";
	idt = tr.getAttribute("idt");
	lista[idt] = valor;
	atualizar();
	console.log("salvar");
}
//evento do botão que exclui uma tarefa ja criada
function excluir(el,ev){
	ev.stopPropagation();
	tr = el.parentElement.parentElement;
	idt = tr.getAttribute("idt");
	lista.splice(idt,1);
	tr.remove();
	atualizar();
	listar();
}
//Função que marca se a tarefa foi ou não concluida
function concluir(el){
	idt = el.getAttribute("idt");
	if(el.className==""){
		el.className = "concluido";
		lista[idt] = "!!!"+lista[idt];
	}else{
		el.className = "";
		lista[idt] = lista[idt].replace("!!!","");
	}
	atualizar();
}
//Função para atualizar o dado no localStorage
function atualizar(){
	var listaString = "";
	lista.forEach(function(item){
		listaString+=item+",";
	});
	listaString = listaString.substring(0,listaString.length-1);
	localStorage.setItem("lista",listaString);
}
//Mostrar os elementos ja inclusos no array
function carregar(){
	console.log(localStorage.getItem("lista"));
	if(localStorage.getItem("lista")!=null){
		lista = localStorage.getItem("lista").split(",");
		listar();
	}
}
