import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button, Typography, Box, Dialog, DialogActions, DialogContent, DialogTitle, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import "./MemoryMatching.css";

const themes = {
    space: ["🌕", "🌌", "⭐", "🚀", "🪐", "🌠", "👽", "🌍", "🌳", "🌸", "🌊", "🌞", "🌈", "🍂", "🍁", "🌻"],
};

const MemoryMatching = () => {
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);
    const [moves, setMoves] = useState(0);
    const [timer, setTimer] = useState(120);
    const [gameOver, setGameOver] = useState(false);
    const [gameLevel, setGameLevel] = useState('easy');
    const [isDialogOpen, setIsDialogOpen] = useState(true);
    const [isInitialFlip, setIsInitialFlip] = useState(false);
    const [timerStarted, setTimerStarted] = useState(false);
    const [winDialogOpen, setWinDialogOpen] = useState(false);
    const [stopGame, setStopGame] = useState(false);
    const [isPaused, setIsPaused] = useState(false); // Track pause state
    const [isGameStarted, setIsGameStarted] = useState(false); // Track if game is started

    // Function to shuffle the cards
    const shuffle = (array) => {
        return array.sort(() => Math.random() - 0.5);
    };

    // Function to set game cards based on level
    const generateCardsForLevel = (level) => {
        let themeCards;
        if (level === 'easy') {
            themeCards = themes.space.slice(0, 8); // 8 pairs for easy
        } else if (level === 'medium') {
            themeCards = themes.space.slice(0, 12); // 12 pairs for medium
        } else {
            themeCards = themes.space.slice(0, 16); // 16 pairs for hard
        }
        return shuffle([...themeCards, ...themeCards]);
    };

    // Initialize game based on level
    const initializeGame = () => {
        const shuffledCards = generateCardsForLevel(gameLevel);
        setCards(shuffledCards);
        setFlippedCards([]);
        setMatchedCards([]);
        setMoves(0);
        setTimer(120);
        setGameOver(false);
        setStopGame(false);
        setIsDialogOpen(false);
        setTimerStarted(false);
        setIsInitialFlip(true);
        setWinDialogOpen(false);
        setIsPaused(false);
        setIsGameStarted(true);
        setTimeout(() => {
            setFlippedCards(shuffledCards.map((_, index) => index)); // Flip all cards
            setTimeout(() => {
                setFlippedCards([]); // Hide all cards after 2 seconds
                setIsInitialFlip(false);
                setTimerStarted(true); // Start the timer after flipping back
            }, 2000);
        }, 500);
    };

    // Timer logic
    useEffect(() => {
        if (timer > 0 && !gameOver && timerStarted && !stopGame && !isPaused) {
            const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
            return () => clearInterval(interval);
        } else if (timer === 0) {
            setGameOver(true);
        }
    }, [timer, gameOver, timerStarted, stopGame, isPaused]);

    // Check for game win
    useEffect(() => {
        if (matchedCards.length === cards.length) {
            setGameOver(true);
            setWinDialogOpen(true);
        }
    }, [matchedCards, cards.length]);

    // Handle card flip
    const handleCardClick = (index) => {
        if (isInitialFlip || flippedCards.length === 2 || flippedCards.includes(index) || matchedCards.includes(index)) {
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

    // Render individual cards
    const renderCard = (card, index) => {
        const isFlipped = flippedCards.includes(index) || matchedCards.includes(index);
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

    // Handle level change
    const handleLevelChange = (event) => {
        setGameLevel(event.target.value);
        initializeGame(); // Restart game with new level
    };

    // Stop the game
    const stopTheGame = () => {
        setStopGame(true);
        setGameOver(true);
    };

    // Pause and resume game
    const handlePauseResume = () => {
        setIsPaused((prev) => !prev);
    };

    return (
        <Box className="memory-game">
            {/* Start Dialog */}
            <Dialog open={isDialogOpen}>
                <DialogTitle>Memory Matching Game</DialogTitle>
                <DialogContent>
                    <Typography>Are you ready to start the game?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={initializeGame} variant="contained">
                        Let's Start!
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Win Dialog */}
            <Dialog open={winDialogOpen}>
                <DialogTitle>Congratulations!</DialogTitle>
                <DialogContent>
                    <Typography>You won the game in {moves} moves!</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={initializeGame} variant="contained">
                        Restart
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Game Paused Dialog */}
            <Dialog open={isPaused}>
                <DialogTitle>Game Paused</DialogTitle>
                <DialogContent>
                    <Typography>Click to continue the game.</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handlePauseResume} variant="contained">
                        Continue
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Header */}
            <Box className="mm-header">
                <Typography variant="h4" className="title">
                    🌟 Memory Matching Game 🌟
                </Typography>
            </Box>

            {/* Controls */}
            <Box className="mm-controls">
                <FormControl>
                    <InputLabel>Level</InputLabel>
                    <Select value={gameLevel} onChange={handleLevelChange}>
                        <MenuItem value="easy">Easy</MenuItem>
                        <MenuItem value="medium">Medium</MenuItem>
                        <MenuItem value="hard">Hard</MenuItem>
                    </Select>
                </FormControl>
                <Button onClick={stopTheGame} variant="contained" color="error" style={{ marginLeft: "10px" }}>
                    Stop
                </Button>
                <Button onClick={initializeGame} variant="contained" color="primary" style={{ marginLeft: "10px" }}>
                    Restart
                </Button>
                <Button onClick={handlePauseResume} variant="contained" color={isPaused ? "success" : "warning"} style={{ marginLeft: "10px" }}>
                    {isPaused ? "Resume" : "Pause"}
                </Button>
            </Box>

            {/* Scoreboard */}
            <Box className="mm-scoreboard">
                <Typography variant="h6">Moves: {moves}</Typography>
                <Typography variant="h6">
                    Cards Left: {cards.length - matchedCards.length}
                </Typography>
                <Typography variant="h6">Matched: {matchedCards.length / 2}</Typography>
                <Typography variant="h6">Timer: {timer}s</Typography>
            </Box>

            {/* Game Over Screen */}
            {gameOver && !winDialogOpen ? (
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
