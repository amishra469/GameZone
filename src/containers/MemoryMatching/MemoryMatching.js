import React, { useState, useEffect } from "react";
import GameBoard from "./GameBoard";
import "./MemoryMatching.css";

const MemoryMatching = () => {
    const [cards, setCards] = useState([]);
    const [moves, setMoves] = useState(0);

    useEffect(() => {
        const symbols = ["🍎", "🍌", "🍇", "🍓", "🍒", "🍍"];
        const shuffledCards = [...symbols, ...symbols]
            .sort(() => Math.random() - 0.5)
            .map((symbol, index) => ({ id: index, symbol, flipped: false, matched: false }));
        setCards(shuffledCards);
    }, []);

    const resetGame = () => {
        setMoves(0);
        const resetCards = cards.map(card => ({ ...card, flipped: false, matched: false }));
        setCards(resetCards.sort(() => Math.random() - 0.5));
    };

    return (
        <div className="mm-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
                <span style={{ fontSize: '18px', fontWeight: '600' }}>Memory Matching Game</span>
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={resetGame}>
                    Restart
                </button>
            </div>
            <GameBoard cards={cards} setCards={setCards} moves={moves} setMoves={setMoves} />
            <p>Moves: {moves}</p>
        </div>
    );
};

export default MemoryMatching;
