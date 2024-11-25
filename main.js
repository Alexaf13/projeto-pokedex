const pokemonList = document.getElementById('pokemonList');
const LoadMoreButton = document.getElementById('LoadMoreButton');
const maxRecords = 151
const limit = 10;
let offset = 0;



function LoadPokemonItens(offset, limit) {     
    pokeApi.getPokemons(offset, limit).then((pokemons) => {
        const newHtml = pokemons.map((pokemon) => 
            `<li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
    
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}"> ${type}</li>`).join('')}
                    </ol>
    
                    <img src="${pokemon.photo}"
                         alt="${pokemon.name}">
                </div>
            </li>`
        ).join('');
        pokemonList.innerHTML += newHtml;
    })
}

LoadPokemonItens(offset, limit);

LoadMoreButton.addEventListener('click', () => {
    offset += limit;

    const qtdRecordWithNextPage = offset + limit

    if (qtdRecordWithNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        LoadPokemonItens(offset, limit);
        
        LoadMoreButton.parentElement.removeChild(LoadMoreButton)
      
    } else {
        LoadPokemonItens(offset, limit)
    }
})

    
    

    