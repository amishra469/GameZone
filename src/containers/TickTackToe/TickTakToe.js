import React, { useEffect, useState } from 'react';
import GameBoard from './GameBoard';
import PreviousMoves from './PreviousMoves';
import "./TickTakToe.css";
import PlayerInput from './PlayerInput';
import GameWinModal from './GameWinModal';
const TicTakToe = () => {
    const [firstPlayer, setFirstPlayer] = useState("");
    const [secondPlayer, setSecondPlayer] = useState("");
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const [winner, setWinner] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];

    useEffect(() => {
        const winner = calculateWinner(history[history.length - 1]);
        if (winner) {
            let status = winner === "X" ? 'First Player' : 'Second Player';
            setWinner(status);
            setIsModalOpen(true);
        }
    }, [history, isModalOpen])

    const calculateWinner = (squares) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }

    const handlePlay = (nextSquares) => {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    const jumpTo = (nextMove) => {
        setCurrentMove(nextMove);
    }

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
console.log({isModalOpen})
    return (
        <>
            <div className="p-5 flex ">
                <div className="w-3/5 m-5 ">
                    <GameBoard
                        xIsNext={xIsNext}
                        squares={currentSquares}
                        onPlay={handlePlay}
                        setWinner={setWinner}
                        calculateWinner={calculateWinner}
                    />
                    <div className='m-5 flex justify-between items-center'>
                        <PlayerInput playerType="First Player" player={firstPlayer} setPlayer={setFirstPlayer} currentPlayer={xIsNext ? 'First Player' : 'Second Player'} />
                        <PlayerInput playerType="Second Player" player={secondPlayer} setPlayer={setSecondPlayer} currentPlayer={xIsNext ? 'First Player' : 'Second Player'} />
                    </div>
                </div>
                <div className='w-2/5'>
                    <PreviousMoves
                        gamehistory={history}
                        jumpTo={jumpTo}
                    />
                </div>
            </div>

            {
                isModalOpen ? <GameWinModal winner={winner} openModal={openModal} closeModal={closeModal} /> : ""
            }
        </>
    )
}

export default TicTakToe;