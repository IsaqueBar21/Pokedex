//função global que pesquisará o pokemon pelo nome
const pokemonName = document.querySelector(".pokemon_name");
//função global que pesquisará o pokemon pelo numero
const pokemonNumber = document.querySelector(".pokemon_number");
//função global que apresentará a imagem do pokemon pesquisado
const pokemonImage = document.querySelector(".pokemon_image");
//função para que o formulário responda a pesquisa do usuário
const form = document.querySelector(".form");
const input = document.querySelector(".input_search");
//função para os botões de anterior e proximo
const buttonPrev = document.querySelector(".btn-prev");
const buttonNext = document.querySelector(".btn-next");

//variável que armazena o valor do pokemon ao clicar nos botoes prev e next
let searchPokemon = 1;

//função que busca os pokemons
//define que a função é assincrona para que o await execute
const fetchPokemon = async (pokemon) => {
  //função que busca pela API conforme o que o usuário buscar
  //await espera a conclusão da busca "fetch"
  //toLoweCase transforma todas os caracteres minusculos
  const ApiResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );
  //condição para o resultado da busca não apresentar erro ao pesquisar um dado inexistente
  if (ApiResponse.status == 200) {
    //para que a API retorne os dados é necessário criar um JSON de retorno de acordo com os dados pesquisados
    const data = await ApiResponse.json();
    return data;
  }
};

//função que irá renderizar os dados de cada pokemon na pokedex
const renderPokemon = async (pokemon) => {
  //indica ao usuário que a página está carregando as infos
  pokemonName.innerHTML = "Loading...";
  pokemonNumber.innerHTML = "";

  //const que recebera o que o usuário quer pesquisar, e é assíncrona
  const data = await fetchPokemon(pokemon);
  //condição para os eventos de busca
  if (data) {
    //elemento recebe o nome, numero e imagem conforme representado na API
    pokemonImage.style.display = "block";
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    //elemento recebe a imagem representada pela pesquisa referente ao pokemon
    pokemonImage.src =
      data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
        "front_default"
      ];
    //mantem a barra de pesquisa vazia após a busca
    input.value = "";
    //transforma numero pesquisado para um novo valor na variavel do botão (let) no inicio do codigo
    searchPokemon = data.id;
  } else {
    pokemonImage.style.display = "none";
    pokemonName.innerHTML = "Not Found :c";
    pokemonNumber.innerHTML = "";
  }
};

//criação de um evento ao realizar o envio do formulário
form.addEventListener("submit", (event) => {
  event.preventDefault();
  //renderiza o valor recebido no input
  renderPokemon(input.value.toLowerCase());
});

//criação de um evento ao realizar o clique dos botões
buttonPrev.addEventListener("click", () => {
  //define o botão de Prev limitado até 1, não deixando o numero ficar negativo
  if (searchPokemon > 1) searchPokemon -= 1;
  renderPokemon(searchPokemon);
});
buttonNext.addEventListener("click", () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

//renderiza o primeiro pokemon para não ficar sem nada na imagem
renderPokemon(searchPokemon);
