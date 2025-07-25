// Card.tsx
import Tilt from "react-parallax-tilt";
import type {PokemonProps} from "./Pokemon.tsx";
import '../styles/Card.css';

interface CardProps extends PokemonProps {
    isFlipped?: boolean;
}

function Card({isFlipped = false, ...pokemon}: CardProps) {
    return (
        <Tilt
            className={`parallax-effect-img ${isFlipped ? 'flipped' : ''}`}
            tiltMaxAngleX={30}
            tiltMaxAngleY={30}
            perspective={700}
            transitionSpeed={1500}
            scale={1.1}
            gyroscope={true}
        >
            <div className="card" onClick={pokemon.onCardClick}>
                <div className="card-front">
                    <p className="pokemon-name">{pokemon.name}</p>
                    <img src={pokemon.img} className="inner-element" alt={pokemon.name}/>
                    <img src={pokemon.img_shiny} className="inner-model" alt={pokemon.name}/>
                </div>
                <div className="card-back">
                </div>
            </div>

        </Tilt>
    )
}

export default Card;