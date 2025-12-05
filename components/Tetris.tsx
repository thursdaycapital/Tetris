'use client';

import React, { useState, useEffect, useRef } from 'react';

// 游戏常量
const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const INITIAL_DROP_TIME = 1000;

// 方块形状
const TETROMINOES = {
  I: [
    [[1, 1, 1, 1]]
  ],
  O: [
    [[1, 1], [1, 1]]
  ],
  T: [
    [[0, 1, 0], [1, 1, 1]]
  ],
  S: [
    [[0, 1, 1], [1, 1, 0]]
  ],
  Z: [
    [[1, 1, 0], [0, 1, 1]]
  ],
  J: [
    [[1, 0, 0], [1, 1, 1]]
  ],
  L: [
    [[0, 0, 1], [1, 1, 1]]
  ]
};

const COLORS = {
  I: '#00f0f0',
  O: '#f0f000',
  T: '#a000f0',
  S: '#00f000',
  Z: '#f00000',
  J: '#0000f0',
  L: '#f0a000',
  empty: '#000'
};

type TetrominoType = keyof typeof TETROMINOES;
type Board = (TetrominoType | 0)[][];
type Position = { x: number; y: number };

interface TetrisProps {
  onGameOver: (score: number, lines: number) => void;
  userName?: string;
}

export default function Tetris({ onGameOver, userName }: TetrisProps) {
  const [board, setBoard] = useState<Board>(createEmptyBoard());
  const [currentPiece, setCurrentPiece] = useState<{ shape: number[][], type: TetrominoType, pos: Position } | null>(null);
  const [score, setScore] = useState(0);
  const [lines, setLines] = useState(0);
  const [level, setLevel] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const dropTimeRef = useRef(INITIAL_DROP_TIME);
  const lastTimeRef = useRef(0);

  function createEmptyBoard(): Board {
    return Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(0));
  }

  function createPiece(): { shape: number[][], type: TetrominoType, pos: Position } {
    const types = Object.keys(TETROMINOES) as TetrominoType[];
    const type = types[Math.floor(Math.random() * types.length)];
    const shape = TETROMINOES[type][0];
    return {
      shape,
      type,
      pos: { x: Math.floor(BOARD_WIDTH / 2) - Math.floor(shape[0].length / 2), y: 0 }
    };
  }

  function isValidMove(piece: typeof currentPiece, board: Board, newPos: Position): boolean {
    if (!piece) return false;
    
    for (let y = 0; y < piece.shape.length; y++) {
      for (let x = 0; x < piece.shape[y].length; x++) {
        if (piece.shape[y][x]) {
          const newX = newPos.x + x;
          const newY = newPos.y + y;
          
          if (newX < 0 || newX >= BOARD_WIDTH || newY >= BOARD_HEIGHT) {
            return false;
          }
          
          if (newY >= 0 && board[newY][newX]) {
            return false;
          }
        }
      }
    }
    return true;
  }

  function placePiece(piece: typeof currentPiece, board: Board): Board {
    if (!piece) return board;
    
    const newBoard = board.map(row => [...row]);
    
    for (let y = 0; y < piece.shape.length; y++) {
      for (let x = 0; x < piece.shape[y].length; x++) {
        if (piece.shape[y][x]) {
          const boardY = piece.pos.y + y;
          const boardX = piece.pos.x + x;
          if (boardY >= 0) {
            newBoard[boardY][boardX] = piece.type;
          }
        }
      }
    }
    
    return newBoard;
  }

  function clearLines(board: Board): { newBoard: Board, linesCleared: number } {
    const newBoard = board.filter(row => row.some(cell => cell === 0));
    const linesCleared = BOARD_HEIGHT - newBoard.length;
    
    while (newBoard.length < BOARD_HEIGHT) {
      newBoard.unshift(Array(BOARD_WIDTH).fill(0));
    }
    
    return { newBoard, linesCleared };
  }

  function rotatePiece(piece: typeof currentPiece): typeof currentPiece {
    if (!piece) return null;
    
    const rotated = piece.shape[0].map((_, i) =>
      piece.shape.map(row => row[i]).reverse()
    );
    
    return { ...piece, shape: rotated };
  }

  function dropPiece() {
    if (!currentPiece || gameOver || isPaused) return;
    
    const newPos = { ...currentPiece.pos, y: currentPiece.pos.y + 1 };
    
    if (isValidMove(currentPiece, board, newPos)) {
      setCurrentPiece({ ...currentPiece, pos: newPos });
    } else {
      const newBoard = placePiece(currentPiece, board);
      const { newBoard: clearedBoard, linesCleared } = clearLines(newBoard);
      
      setBoard(clearedBoard);
      
      if (linesCleared > 0) {
        const newLines = lines + linesCleared;
        const newScore = score + linesCleared * 100 * level;
        const newLevel = Math.floor(newLines / 10) + 1;
        
        setLines(newLines);
        setScore(newScore);
        setLevel(newLevel);
        dropTimeRef.current = Math.max(100, INITIAL_DROP_TIME - (newLevel - 1) * 100);
      }
      
      const nextPiece = createPiece();
      if (!isValidMove(nextPiece, clearedBoard, nextPiece.pos)) {
        setGameOver(true);
        onGameOver(score + linesCleared * 100 * level, lines + linesCleared);
      } else {
        setCurrentPiece(nextPiece);
      }
    }
  }

  function movePiece(direction: 'left' | 'right' | 'down') {
    if (!currentPiece || gameOver || isPaused) return;
    
    const newPos = { ...currentPiece.pos };
    if (direction === 'left') newPos.x--;
    else if (direction === 'right') newPos.x++;
    else if (direction === 'down') newPos.y++;
    
    if (isValidMove(currentPiece, board, newPos)) {
      setCurrentPiece({ ...currentPiece, pos: newPos });
    }
  }

  function handleRotate() {
    if (!currentPiece || gameOver || isPaused) return;
    
    const rotated = rotatePiece(currentPiece);
    if (rotated && isValidMove(rotated, board, rotated.pos)) {
      setCurrentPiece(rotated);
    }
  }

  function handleKeyPress(e: KeyboardEvent) {
    if (gameOver) return;
    
    if (e.key === 'ArrowLeft') {
      movePiece('left');
    } else if (e.key === 'ArrowRight') {
      movePiece('right');
    } else if (e.key === 'ArrowDown') {
      movePiece('down');
    } else if (e.key === 'ArrowUp' || e.key === ' ') {
      handleRotate();
    } else if (e.key === 'p' || e.key === 'P') {
      setIsPaused(!isPaused);
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentPiece, board, gameOver, isPaused]);

  useEffect(() => {
    if (gameOver || isPaused) return;
    
    const gameLoop = (time: number) => {
      if (time - lastTimeRef.current > dropTimeRef.current) {
        dropPiece();
        lastTimeRef.current = time;
      }
      requestAnimationFrame(gameLoop);
    };
    
    lastTimeRef.current = performance.now();
    const frameId = requestAnimationFrame(gameLoop);
    
    return () => cancelAnimationFrame(frameId);
  }, [currentPiece, board, gameOver, isPaused]);

  useEffect(() => {
    if (!currentPiece) {
      const piece = createPiece();
      setCurrentPiece(piece);
    }
  }, []);

  function renderBoard(): Board {
    const displayBoard = board.map(row => [...row]) as Board;
    
    if (currentPiece) {
      for (let y = 0; y < currentPiece.shape.length; y++) {
        for (let x = 0; x < currentPiece.shape[y].length; x++) {
          if (currentPiece.shape[y][x]) {
            const boardY = currentPiece.pos.y + y;
            const boardX = currentPiece.pos.x + x;
            if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
              displayBoard[boardY][boardX] = currentPiece.type;
            }
          }
        }
      }
    }
    
    return displayBoard;
  }

  function resetGame() {
    setBoard(createEmptyBoard());
    setCurrentPiece(createPiece());
    setScore(0);
    setLines(0);
    setLevel(1);
    setGameOver(false);
    setIsPaused(false);
    dropTimeRef.current = INITIAL_DROP_TIME;
  }

  const displayBoard = renderBoard();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '24px', marginBottom: '10px' }}>俄罗斯方块</h1>
        <div style={{ display: 'flex', gap: '20px', fontSize: '14px' }}>
          <div>分数: {score}</div>
          <div>行数: {lines}</div>
          <div>等级: {level}</div>
        </div>
      </div>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: `repeat(${BOARD_WIDTH}, 20px)`,
        gap: '1px',
        backgroundColor: '#333',
        padding: '2px',
        border: '2px solid #fff'
      }}>
        {displayBoard.flat().map((cell, index) => (
          <div
            key={index}
            style={{
              width: '20px',
              height: '20px',
              backgroundColor: cell && cell !== 0 ? COLORS[cell] : COLORS.empty,
              border: cell ? '1px solid rgba(255,255,255,0.3)' : 'none'
            }}
          />
        ))}
      </div>
      
      {(gameOver || isPaused) && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'rgba(0,0,0,0.9)',
          padding: '30px',
          borderRadius: '10px',
          textAlign: 'center',
          zIndex: 1000
        }}>
          <h2 style={{ marginBottom: '20px' }}>
            {gameOver ? '游戏结束!' : '游戏暂停'}
          </h2>
          {gameOver && (
            <>
              <p style={{ marginBottom: '10px' }}>最终分数: {score}</p>
              <p style={{ marginBottom: '20px' }}>消除行数: {lines}</p>
            </>
          )}
          <button
            onClick={resetGame}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            重新开始
          </button>
        </div>
      )}
      
      <div style={{ marginTop: '20px', fontSize: '12px', textAlign: 'center', color: '#888' }}>
        <p>方向键移动，上键/空格旋转</p>
        <p>P 键暂停</p>
      </div>
    </div>
  );
}

