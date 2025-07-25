import '../styles/GameResult.css';

interface GameResultProps {
    status: 'win' | 'gameOver';
    score: number;
    highestScore: number;
    onRestart: () => void;
}

function GameResult({ status, score, highestScore, onRestart }: GameResultProps) {
    const isWin = status === 'win';

    return (
        <div className={`game-result-overlay ${isWin ? 'win' : 'game-over'}`}>
            <div className="game-result-container">
                <div className="result-icon">
                    {isWin ? '🏆' : '💀'}
                </div>

                <h1 className="result-title">
                    {isWin ? 'You Win!' : 'Game Over!'}
                </h1>

                <div className="result-stats">
                    <div className="stat-item">
                        <span className="stat-label">Final Score:</span>
                        <span className="stat-value">{score}</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">Highest Score:</span>
                        <span className="stat-value">{highestScore}</span>
                    </div>
                    {score === highestScore && score > 0 && (
                        <div className="new-record">New Record! 🎉</div>
                    )}
                </div>

                <div className="result-message">
                    {isWin
                        ? "Congratulations! You remembered all the Pokémon!"
                        : "You clicked the same Pokémon twice! Try again!"
                    }
                </div>

                <button className="restart-button" onClick={onRestart}>
                    Play Again
                </button>
            </div>
        </div>
    );
}

export default GameResult;