const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}` // funcão para invocar os dados da URL
const fetchPokemon = () => { // função para pegar todos os dados da API
    const pokemonPromisses = [] // lista vazia que vai receber as promisses, em .json, de cada pokemon

    // for para pegar as promisses de cada pokemon e inserir no final da lista de 1 a 150
    for(let i = 1; i <= 150; i++) {
        pokemonPromisses.push(
            fetch(getPokemonUrl(i))
            .then(response => response.json()))
    }

    // mostrar no console os dados inseridos na lista pokemonPromisses 
    Promise.all(pokemonPromisses).then(pokemons => {

        // .reduce transforma o array em uma string.
        // no reducer, parâmetro accumulator gera uma string a cada iteração e pokemon é o objeto a ser iterado
        // ao final do reduce, colocamos o valor inicial, para o accumulator, que é uma string vazia
        const lisPokemons = pokemons.reduce((accumulator, pokemon) => {
            const types = pokemon.types.map(typeInfo => typeInfo.type.name)

            accumulator += `
            <li class="card ${types[0]}">
                <img class="card-image" alt="${pokemon.name}" src="https://cdn.traction.one/pokedex/pokemon/${pokemon.id}.png" />
                <h2 class="card-title">${pokemon.id}. ${pokemon.name}<h2>
                <p class="card-subtitle">${types.join(' | ')}</p>
            </li>
            `
            return accumulator
        }, '')

        const ul = document.querySelector('[data-js="pokedex"]')
        ul.innerHTML = lisPokemons

        //console.log()

    })

}
fetchPokemon()