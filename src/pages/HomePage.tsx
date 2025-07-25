import {type PokemonProps} from "../components/Pokemon.tsx";
import {useEffect, useState, useRef} from "react";
import {getRandomPokemon} from "../service/getPokemons.ts";
import Card from "../components/Card.tsx";
import GameResult from "../components/GameResult.tsx";
import '../styles/HomePage.css';
import LoadingScreen from "./LoadingScreen.tsx";

function HomePage() {
    const [pokemons, setPokemon] = useState<PokemonProps[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [score, setScore] = useState(0);
    const [highestScore, setHighestScore] = useState(0);
    const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());
    const [clickedCards, setClickedCards] = useState<Set<string>>(new Set());
    const [gameStatus, setGameStatus] = useState<'playing' | 'win' | 'gameOver'>('playing');
    const [isProcessing, setIsProcessing] = useState(false);

    // Use useRef to avoid creating new Audio object on each render
    const cardFlipAudio = useRef(new Audio("/src/assets/audio/card_flip.mp3"));
    const gameOverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const flipTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const loadPokemons = async () => {
            try {
                const res = await getRandomPokemon()
                setPokemon(res)
                await new Promise(resolve => setTimeout(resolve, 3000))
            } catch (e) {
                console.log(e)
            } finally {
                setIsLoading(false)
            }
        }
        loadPokemons()
    }, []);

    useEffect(() => {
        if (score > highestScore) {
            setHighestScore(score)
        }

        // Check for win condition (clicked all cards without repeating)
        if (score === pokemons.length && pokemons.length > 0) {
            setGameStatus('win');
        }
    }, [score, highestScore, pokemons.length]);

    // Cleanup timeouts on unmount
    useEffect(() => {
        return () => {
            if (gameOverTimeoutRef.current) clearTimeout(gameOverTimeoutRef.current);
            if (flipTimeoutRef.current) clearTimeout(flipTimeoutRef.current);
        };
    }, []);

    const resetGame = () => {
        setScore(0);
        setClickedCards(new Set());
        setFlippedCards(new Set());
        setGameStatus('playing');
        setIsProcessing(false);
        // Shuffle cards when resetting
        setPokemon(prev => [...prev].sort(() => Math.random() - 0.45));
    };

    const handleCardClick = (pokemonName: string) => {
        if (isProcessing || gameStatus !== 'playing') return;

        setIsProcessing(true);

        cardFlipAudio.current.play().catch(e => console.log("Audio play failed:", e));

        if (clickedCards.has(pokemonName)) {
            setFlippedCards(new Set(pokemons.map(pokemon => pokemon.name)));

            gameOverTimeoutRef.current = setTimeout(() => {
                setGameStatus('gameOver');
            }, 1200); // Give time to see all flipped cards
            return;
        }

        // Add to clicked cards and increment score
        setClickedCards(prev => new Set([...prev, pokemonName]));
        setScore(prev => prev + 1);

        // Flip ALL cards to show backs (to hide the shuffling)
        setFlippedCards(new Set(pokemons.map(pokemon => pokemon.name)));

        flipTimeoutRef.current = setTimeout(() => {
            // Shuffle first
            setPokemon(prev => [...prev].sort(() => Math.random() - 0.5));

            // Then flip back after a small delay
            setTimeout(() => {
                setFlippedCards(new Set());
                setIsProcessing(false);
            }, 100);
        }, 900);
    };

    if (isLoading) {
        return <LoadingScreen />
    }

    return (
        <>
            <div className="score-board">
                <div>Current Score: {score}</div>
                <div>Highest Score: {highestScore}</div>
            </div>

            <div className="pokemon-grid">
                {pokemons.map((pokemon, index) =>
                    <Card
                        {...pokemon}
                        key={pokemon.name || index}
                        onCardClick={() => handleCardClick(pokemon.name)}
                        isFlipped={flippedCards.has(pokemon.name)}
                    />
                )}
            </div>

            {gameStatus !== 'playing' && (
                <GameResult
                    status={gameStatus}
                    score={score}
                    highestScore={highestScore}
                    onRestart={resetGame}
                />
            )}
        </>
    )
}

export default HomePage;