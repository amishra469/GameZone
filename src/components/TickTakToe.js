import React, { useState } from 'react';
import GameBoard from './GameBoard';
const TicTakToe = () => {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const currentSuqare = history[currentMove];
    const xIsNext = currentMove % 2 === 0;

    const handlePlay = (nextSquares) => {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }
    
    return (
        <div className="game">
            <div className="game-board">
                <GameBoard
                    xIsNext={xIsNext}
                    squares={currentMove}
                    onPlay={handlePlay}
                />
            </div>
            <div className='game-info'>

            </div>
        </div>
    )
}

export default TicTakToe;