export interface PokemonProps {
    name: string,
    img: string,
    id: number,
    url: string,
    img_shiny: string,
    onCardClick?: () => void
}

export function Pokemon(pokemon: PokemonProps) {
    return (
        <div>
            <h1>{pokemon.name}</h1>
            <img src={pokemon.img} alt={pokemon.name}/>
            <img src={pokemon.img_shiny} alt={pokemon.name}/>
        </div>
    )
}