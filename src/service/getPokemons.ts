import type {PokemonProps} from "../components/Pokemon.tsx";

export const getPokemon = async () => {
    return fetch('https://pokeapi.co/api/v2/pokemon?limit=256')
}

export const getPokemonById = async (id: number) => {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
}

export const getRandomPokemon = async () => {
    const listResponse = await getPokemon().then(res => res.json())
    const pokemons = []
    const usedIndices = new Set()

    while (pokemons.length < 12) {
        const randIndex = Math.floor(Math.random() * listResponse.results.length)
        if (!usedIndices.has(randIndex)) {
            usedIndices.add(randIndex)

            const pokemonId = randIndex + 1
            const pokemonResponse = await getPokemonById(pokemonId).then(res => res.json())

            const pokemonData = {
                name: pokemonResponse.name,
                img: pokemonResponse.sprites.front_default,
                id: pokemonResponse.id,
                url: pokemonResponse.url,
                img_shiny: pokemonResponse.sprites.other.showdown.front_default,
            }

            pokemons.push(pokemonData)
        }
    }
    return pokemons
}

export const shufflePokemon = (pokemons: PokemonProps[]) => {
    return pokemons.sort(() => Math.random() - 0.5)
}