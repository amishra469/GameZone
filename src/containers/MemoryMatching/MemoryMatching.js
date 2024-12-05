import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button, Typography, Box } from "@mui/material";
import "./MemoryMatching.css";

const themes = {
    animals: ["🐶", "🐱", "🐭", "🐹", "🦊", "🐻", "🐼", "🐨"],
    fruits: ["🍎", "🍌", "🍇", "🍉", "🍒", "🍓", "🍍", "🥝"],
};

const MemoryMatching = () => {
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);
    const [moves, setMoves] = useState(0);
    const [timer, setTimer] = useState(60); // 60 seconds countdown
    const [theme, setTheme] = useState("animals");
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        initializeGame();
    }, [theme]);

    useEffect(() => {
        if (timer > 0 && !gameOver) {
            const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
            return () => clearInterval(interval);
        } else if (timer === 0) {
            setGameOver(true);
        }
    }, [timer, gameOver]);

    const initializeGame = () => {
        const themeCards = themes[theme];
        const shuffledCards = shuffle([...themeCards, ...themeCards]); // Duplicate and shuffle cards
        setCards(shuffledCards);
        setFlippedCards([]);
        setMatchedCards([]);
        setMoves(0);
        setTimer(60);
        setGameOver(false);
    };

    const shuffle = (array) => {
        return array.sort(() => Math.random() - 0.5);
    };

    const handleCardClick = (index) => {
        if (flippedCards.length === 2 || flippedCards.includes(index) || matchedCards.includes(index)) {
            return;
        }

        const newFlippedCards = [...flippedCards, index];
        setFlippedCards(newFlippedCards);

        if (newFlippedCards.length === 2) {
            setMoves((prev) => prev + 1);
            const [first, second] = newFlippedCards;
            if (cards[first] === cards[second]) {
                setMatchedCards((prev) => [...prev, first, second]);
                setFlippedCards([]);
            } else {
                setTimeout(() => setFlippedCards([]), 1000);
            }
        }
    };

    const renderCard = (card, index) => {
        const isFlipped = flippedCards.includes(index) || matchedCards.includes(index);
        return (
            <motion.div
                key={index}
                className={`card ${isFlipped ? "flipped" : ""}`}
                onClick={() => handleCardClick(index)}
                initial={{ scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <div className="front">{card}</div>
                <div className="back">❓</div>
            </motion.div>
        );
    };

    return (
        <Box className="memory-game" sx={{ p: 2, backgroundColor: "#f0f8ff" }}>
            <Typography variant="h4" gutterBottom>
                🎴 Memory Matching Game
            </Typography>
            <Box display="flex" justifyContent="space-between" mb={2}>
                <Button variant="contained" color="primary" onClick={() => setTheme("animals")}>
                    Animals
                </Button>
                <Button variant="contained" color="secondary" onClick={() => setTheme("fruits")}>
                    Fruits
                </Button>
                <Typography variant="h6">Moves: {moves}</Typography>
                <Typography variant="h6">Time Left: {timer}s</Typography>
            </Box>
            {gameOver ? (
                <Box className="game-over" textAlign="center">
                    <Typography variant="h5" gutterBottom>
                        {matchedCards.length === cards.length ? "🎉 You Win!" : "⏳ Time's Up!"}
                    </Typography>
                    <Button variant="outlined" onClick={initializeGame}>
                        Restart
                    </Button>
                </Box>
            ) : (
                <motion.div className="card-grid" layout>
                    {cards.map((card, index) => renderCard(card, index))}
                </motion.div>
            )}
        </Box>
    );
};

export default MemoryMatching;
