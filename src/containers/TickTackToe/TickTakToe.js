import React, { useState } from 'react';
import GameBoard from './GameBoard';
import PreviousMoves from './PreviousMoves';
import "./TickTakToe.css";
const TicTakToe = () => {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];


    const handlePlay = (nextSquares) => {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    const jumpTo = (nextMove) => {
        setCurrentMove(nextMove);
    }

    return (
        <div className="game">
            <div className="game-board">
                <GameBoard
                    xIsNext={xIsNext}
                    squares={currentSquares}
                    onPlay={handlePlay}
                />
            </div>
            <div className='game-info'>
                <PreviousMoves
                    gamehistory={history}
                    jumpTo={jumpTo}
                />
            </div>
        </div>
    )
}

export default TicTakToe;