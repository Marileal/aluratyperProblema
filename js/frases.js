$("#botao-frase").click(fraseAleatoria);
$("#botao-frase-id").click(buscaFrase);

function fraseAleatoria(){
  $.get("http://localhost:3001/frases", trocaFrase).
  // o 2ºparâmetro é uma função que é acionada automaticamente quando
  //  os dados do servidor terminam de carregar com a requisição
  fail(function(){
    $("#erro").toggle();
    setTimeout(function(){
      $("#erro").toggle();
    }, 2000)
  })
  .always(function(){
    $("#spinner").toggle();
    })
}

function trocaFrase(data){
  // data é a variável que neste caso vai guardar o array de objetos dispostos do servidor
  var frase = $(".frase");
  var numRandom = Math.round(Math.random() * data.length);
  console.log(data);
  frase.text(data[numRandom].texto);
  atualizaTamanhoFrase();
  atualizaTempoInicial(data[numRandom].tempo);
}

function buscaFrase(){
  $("#spinner").toggle();

  var fraseId = $("#frase-id").val();
  var dados = {id: fraseId};

  $.get("http://localhost:3001/frases", dados, escolheFrase).
  fail(function() {
    $("#erro").toggle();
    setTimeout(function(){
      $("#erro").toggle();
    }, 2000);
  })
.always(function(){
  $("#spinner").toggle();
  });
}

function escolheFrase(data){
  console.log(data);

  var frase = $(".frase");
  frase.text(data.texto);
  atualizaTamanhoFrase();
  atualizaTempoInicial(data.tempo);
}
