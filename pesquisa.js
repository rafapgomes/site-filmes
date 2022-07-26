var url = 'https://api.themoviedb.org/3/search/movie?api_key=2dd1ad6c23e41fa683661dc3733c2e9a&language=pt-BR&page=1&include_adult=false&query='
var url_filme = 'https://www.themoviedb.org/movie/'
var posterpath = 'https://image.tmdb.org/t/p/original'
var nome = sessionStorage.getItem("valor_busca");

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}



var url_busca = url + nome;

var dados = httpGet(url_busca);

var json_filmes = JSON.parse(dados);

var url_cartaz = "https://api.themoviedb.org/3/movie/now_playing?api_key=2dd1ad6c23e41fa683661dc3733c2e9a&language=pt-BR&page=1"

var dados_cartaz = httpGet(url_cartaz);
var json_cartaz = JSON.parse(dados_cartaz);


document.querySelector("h1").innerHTML = "Resultados da busca por " +nome;
function filmes_buscados()
{
    var caixa_filmes = document.querySelectorAll('.movies-box');
    var i=0;
    if(json_filmes.results.length == 0)
    {
        document.querySelector("h1").innerHTML = "Não foram encontrados resultados para a busca";
        document.querySelector("h1").appendChild(document.createElement("p")); 
        document.querySelector("p").innerHTML = "Mostrando filmes em cartaz"
        mostraFilmes(json_cartaz)
    }   
    else{
        document.querySelector("h1").innerHTML = "Resultados da busca por " +nome;
        mostraFilmes(json_filmes)
    }
 
}


function criaBoxFilme()
{
    var section = document.querySelector("#movies-list");
    var div_moviebox = document.createElement("div");
    div_moviebox.className = "movies-box";
    var div_movieimg = document.createElement("div");
    div_movieimg.className = "movies-img";
    var img = document.createElement("img");
    var texto = document.createElement("a");
    texto.id = "texto";
    div_movieimg.appendChild(document.createElement("a")).appendChild(img);
    div_moviebox.appendChild(div_movieimg);
    div_moviebox.appendChild(texto);
    section.appendChild(div_moviebox);
}
function mostraFilmes(json)
{
    var i=0;
    for(filme of json.results)
    {
        criaBoxFilme();
    }
    var caixa_filmes = document.querySelectorAll('.movies-box');

    for(caixa of caixa_filmes)
    {       
        caixa.querySelector('#texto').innerHTML = json.results[i].title;
        caixa.querySelector('a').href = url_filme + json.results[i].id;
        caixa.querySelector('a').target = "_blank";
        caixa.querySelector('img').src = posterpath+ json.results[i].poster_path
        caixa.querySelector("#texto").href = url_filme + json.results[i].id;
        var p = document.createElement("p");
        caixa.appendChild(p);
        p.innerHTML ='Nota do filme: ' + json.results[i].vote_average;
        var p = document.createElement("p");
        caixa.appendChild(p);
        p.innerHTML ='Data de lançamento: ' + json.results[i].release_date;
        i = i+1;
    }
}
filmes_buscados();
