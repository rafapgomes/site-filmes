var theUrl = 'https://api.themoviedb.org/3/movie/popular?api_key=2dd1ad6c23e41fa683661dc3733c2e9a&language=pt-BR&page=1'
var posterpath = 'https://image.tmdb.org/t/p/original'
var url_filme = 'https://www.themoviedb.org/movie/'

var lista = [];
//faz a requisicao para a API do moviedb e retorna os filmes
function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

var res = httpGet(theUrl);

var json_filmes = JSON.parse(res);

console.log(json_filmes.results);
// Gera uma lista de números de 0 a 19 para garantir variedade ao exibir filmes nas 8 caixas disponíveis.

function geranumero(lista,i)
{       
        if(i > 19)
        {
            return;
        }
        var numero = Math.floor(Math.random()*20);         
        
        if(compara(lista,numero))
        {
            geranumero(lista,i);
        }
        else
        {
            lista[i] = numero;
            i = i+1;
            geranumero(lista,i);
        }
}
function compara(lista,numero)
{
    for(let j=0; j<lista.length; j++)
    {
        if(lista[j]==numero)
        {
            
            return 1;
        }
    }
    return 0;
}
//exibe os filmes na tela gerando dinamicamente os "box" onde os filmes ficarão
function buscaApi()
{
    var caixa_filmes = document.querySelectorAll('.movies-box');
    var i=0;
    geranumero(lista,0)
    for(caixa of caixa_filmes)
    {       
        caixa.querySelector('#texto').innerHTML = json_filmes.results[lista[i]].title;
        caixa.querySelector('a').href = url_filme + json_filmes.results[lista[i]].id;
        caixa.querySelector('img').src = posterpath+ json_filmes.results[lista[i]].poster_path
        caixa.querySelector("#texto").href = url_filme + json_filmes.results[lista[i]].id;
        var p = document.createElement("p");
        caixa.appendChild(p);
        p.innerHTML ='Nota do filme: ' + json_filmes.results[lista[i]].vote_average;
        var p = document.createElement("p");
        caixa.appendChild(p);
        p.innerHTML ='Data de lançamento: ' + json_filmes.results[lista[i]].release_date;
        i = i+1;
    }
}

buscaApi();

document.querySelector('i').onclick = Salvabusca;
//salva o que foi digitado no campo de busca no sessionstorage para poder ser recuperado no pesquisa.js
function Salvabusca()
{
    var valor = document.querySelector(".search").querySelector("input").value;
    sessionStorage.setItem("valor_busca",valor)
    window.location.href = "pesquisa.html"
}



