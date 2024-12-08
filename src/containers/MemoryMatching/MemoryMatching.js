import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button, Typography, Box } from "@mui/material";
import "./MemoryMatching.css";

const themes = {
    nature: ["🌳", "🌸", "🌊", "🌞", "🌈", "🍂", "🍁", "🌻"],
    space: ["🌕", "🌌", "⭐", "🚀", "🪐", "🌠", "👽", "🌍"],
};

const MemoryMatching = () => {
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);
    const [moves, setMoves] = useState(0);
    const [timer, setTimer] = useState(120);
    const [theme, setTheme] = useState("nature");
    const [gameOver, setGameOver] = useState(false);
    const [isInitialReveal, setIsInitialReveal] = useState(true);

    useEffect(() => {
        initializeGame();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [theme]);

    useEffect(() => {
        if (isInitialReveal) {
            const revealTimer = setTimeout(() => {
                setIsInitialReveal(false);
            }, 5000); // Show cards for 5 seconds
            return () => clearTimeout(revealTimer);
        }
    }, [isInitialReveal]);

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
        setTimer(120);
        setGameOver(false);
        setIsInitialReveal(true);
    };

    const shuffle = (array) => {
        return array.sort(() => Math.random() - 0.5);
    };

    const handleCardClick = (index) => {
        if (
            isInitialReveal || // Prevent clicks during initial reveal
            flippedCards.length === 2 ||
            flippedCards.includes(index) ||
            matchedCards.includes(index)
        ) {
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
        const isFlipped =
            isInitialReveal ||
            flippedCards.includes(index) ||
            matchedCards.includes(index);
        return (
            <motion.div
                key={index}
                className={`mm-card ${isFlipped ? "flipped" : ""}`}
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
        <Box className="memory-game">
            <Box className="mm-header">
                <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                    <Typography variant="h4" className="title">
                        🌟 Memory Matching Game 🌟
                    </Typography>
                </Box>
                <Box className="mm-controls" sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', gap: '20px' }}>
                        <Button
                            variant="mm-outlined"
                            className="mm-theme-button"
                            onClick={() => setTheme("nature")}
                        >
                            Nature
                        </Button>
                        <Button
                            variant="mm-outlined"
                            className="mm-theme-button"
                            onClick={() => setTheme("space")}
                        >
                            Space
                        </Button>
                    </Box>
                    <Box>
                        <Typography variant="h6" className="info">
                            Moves: {moves}
                        </Typography>
                        <Typography variant="h6" className="info">
                            Timer: {timer}s
                        </Typography>
                    </Box>
                </Box>
            </Box>
            {gameOver ? (
                <Box className="mm-game-over">
                    <Typography variant="h5">
                        {matchedCards.length === cards.length ? "🎉 You Win!" : "⏳ Time's Up!"}
                    </Typography>
                    <Button variant="contained" onClick={initializeGame} className="restart-button">
                        Restart
                    </Button>
                </Box>
            ) : (
                <motion.div className="mm-card-grid" layout>
                    {cards.map((card, index) => renderCard(card, index))}
                </motion.div>
            )}
        </Box>
    );
};

export default MemoryMatching;
