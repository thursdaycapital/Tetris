'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { soundManager, vibrateOnLineClear } from '@/utils/sound';

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
  const [isMobile, setIsMobile] = useState(false);
  const dropTimeRef = useRef(INITIAL_DROP_TIME);
  const lastTimeRef = useRef(0);
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const prevLevelRef = useRef(1);
  const currentPieceRef = useRef(currentPiece);
  const boardStateRef = useRef(board);
  const gameOverRef = useRef(gameOver);
  const isPausedRef = useRef(isPaused);

  // 检测移动设备
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  // 使用 ref 来访问最新状态，避免游戏循环被重置
  useEffect(() => {
    currentPieceRef.current = currentPiece;
    boardStateRef.current = board;
    gameOverRef.current = gameOver;
    isPausedRef.current = isPaused;
  }, [currentPiece, board, gameOver, isPaused]);

  function dropPiece() {
    const currentPieceValue = currentPieceRef.current;
    const boardValue = boardStateRef.current;
    const gameOverValue = gameOverRef.current;
    const isPausedValue = isPausedRef.current;
    
    if (!currentPieceValue || gameOverValue || isPausedValue) return;
    
    const newPos = { ...currentPieceValue.pos, y: currentPieceValue.pos.y + 1 };
    
    if (isValidMove(currentPieceValue, boardValue, newPos)) {
      setCurrentPiece({ ...currentPieceValue, pos: newPos });
    } else {
      soundManager.playPlace();
      const newBoard = placePiece(currentPieceValue, boardValue);
      const { newBoard: clearedBoard, linesCleared } = clearLines(newBoard);
      
      setBoard(clearedBoard);
      
      if (linesCleared > 0) {
        setLines(prevLines => {
          const newLines = prevLines + linesCleared;
          const newLevel = Math.floor(newLines / 10) + 1;
          
          setScore(prevScore => {
            const newScore = prevScore + linesCleared * 100 * newLevel;
            return newScore;
          });
          
          setLevel(newLevel);
          prevLevelRef.current = newLevel;
          dropTimeRef.current = Math.max(100, INITIAL_DROP_TIME - (newLevel - 1) * 100);
          
          // 播放消除音效和震动
          if (linesCleared === 1) {
            soundManager.playLineClear();
          } else {
            soundManager.playMultiLineClear(linesCleared);
          }
          vibrateOnLineClear(linesCleared);
          
          return newLines;
        });
      }
      
      const nextPiece = createPiece();
      if (!isValidMove(nextPiece, clearedBoard, nextPiece.pos)) {
        setGameOver(true);
        soundManager.playGameOver();
        setScore(prevScore => {
          setLines(prevLines => {
            onGameOver(prevScore + (linesCleared || 0) * 100 * level, prevLines + (linesCleared || 0));
            return prevLines;
          });
          return prevScore;
        });
      } else {
        setCurrentPiece(nextPiece);
      }
    }
  }

  function movePiece(direction: 'left' | 'right' | 'down') {
    if (!currentPiece || gameOver || isPaused) return;
    
    const newPos = { ...currentPiece.pos };
    if (direction === 'left') {
      newPos.x--;
      soundManager.playMove();
    } else if (direction === 'right') {
      newPos.x++;
      soundManager.playMove();
    } else if (direction === 'down') {
      newPos.y++;
    }
    
    if (isValidMove(currentPiece, board, newPos)) {
      setCurrentPiece({ ...currentPiece, pos: newPos });
    }
  }

  function handleRotate() {
    if (!currentPiece || gameOver || isPaused) return;
    
    const rotated = rotatePiece(currentPiece);
    if (rotated && isValidMove(rotated, board, rotated.pos)) {
      setCurrentPiece(rotated);
      soundManager.playRotate();
    }
  }

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (gameOver && e.key !== 'Enter') return;
    
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      movePiece('left');
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      movePiece('right');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      movePiece('down');
    } else if (e.key === 'ArrowUp' || e.key === ' ') {
      e.preventDefault();
      handleRotate();
    } else if (e.key === 'p' || e.key === 'P') {
      e.preventDefault();
      setIsPaused(!isPaused);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameOver, isPaused]);

  // 触摸控制
  function handleTouchStart(e: React.TouchEvent) {
    if (!boardRef.current) return;
    const touch = e.touches[0];
    const rect = boardRef.current.getBoundingClientRect();
    touchStartRef.current = {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
      time: Date.now()
    };
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (!touchStartRef.current || !boardRef.current) return;
    
    const touch = e.changedTouches[0];
    const rect = boardRef.current.getBoundingClientRect();
    const endX = touch.clientX - rect.left;
    const endY = touch.clientY - rect.top;
    
    const deltaX = endX - touchStartRef.current.x;
    const deltaY = endY - touchStartRef.current.y;
    const deltaTime = Date.now() - touchStartRef.current.time;
    
    const minSwipeDistance = 30;
    const maxSwipeTime = 300;
    
    if (deltaTime < maxSwipeTime) {
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // 水平滑动
        if (Math.abs(deltaX) > minSwipeDistance) {
          if (deltaX > 0) {
            movePiece('right');
          } else {
            movePiece('left');
          }
        }
      } else {
        // 垂直滑动
        if (Math.abs(deltaY) > minSwipeDistance) {
          if (deltaY > 0) {
            // 向下滑动 - 快速下降
            for (let i = 0; i < 5; i++) {
              setTimeout(() => movePiece('down'), i * 10);
            }
          } else {
            // 向上滑动 - 旋转
            handleRotate();
          }
        } else {
          // 点击 - 旋转
          handleRotate();
        }
      }
    }
    
    touchStartRef.current = null;
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameOver, isPaused]);

  useEffect(() => {
    if (!currentPiece) {
      const piece = createPiece();
      setCurrentPiece(piece);
    }
  }, [currentPiece]);

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
    prevLevelRef.current = 1;
    setGameOver(false);
    setIsPaused(false);
    dropTimeRef.current = INITIAL_DROP_TIME;
  }

  const displayBoard = renderBoard();
  const cellSize = isMobile && typeof window !== 'undefined' 
    ? Math.min(28, Math.floor((window.innerWidth - 40) / BOARD_WIDTH)) 
    : 20;

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      padding: isMobile ? '10px' : '20px',
      width: '100%',
      maxWidth: '600px',
      margin: '0 auto'
    }}>
      <div style={{ 
        marginBottom: isMobile ? '15px' : '20px', 
        textAlign: 'center',
        width: '100%'
      }}>
        <h1 style={{ 
          fontSize: isMobile ? '20px' : '24px', 
          marginBottom: '10px',
          background: 'linear-gradient(90deg, #00f0f0, #f0f000)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>俄罗斯方块</h1>
        <div style={{ 
          display: 'flex', 
          gap: isMobile ? '10px' : '20px', 
          fontSize: isMobile ? '12px' : '14px',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <div>分数: <strong>{score}</strong></div>
          <div>行数: <strong>{lines}</strong></div>
          <div>等级: <strong>{level}</strong></div>
        </div>
      </div>
      
      <div 
        ref={boardRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{ 
          display: 'grid', 
          gridTemplateColumns: `repeat(${BOARD_WIDTH}, ${cellSize}px)`,
          gap: '1px',
          backgroundColor: '#333',
          padding: '2px',
          border: '2px solid #00f0f0',
          borderRadius: '4px',
          boxShadow: '0 0 20px rgba(0, 240, 240, 0.3)',
          touchAction: 'none',
          userSelect: 'none'
        }}
      >
        {displayBoard.flat().map((cell, index) => {
          const isFilled = cell !== 0 && cell in COLORS;
          return (
            <div
              key={index}
              style={{
                width: `${cellSize}px`,
                height: `${cellSize}px`,
                backgroundColor: isFilled ? COLORS[cell as TetrominoType] : COLORS.empty,
                border: isFilled ? '1px solid rgba(255,255,255,0.3)' : 'none',
                borderRadius: '2px',
                boxShadow: isFilled ? 'inset 0 0 5px rgba(0,0,0,0.3)' : 'none',
                transition: 'all 0.1s ease'
              }}
            />
          );
        })}
      </div>
      
      {/* 移动端控制按钮 */}
      {isMobile && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '10px',
          marginTop: '20px',
          width: '100%',
          maxWidth: '300px'
        }}>
          <button
            onClick={() => movePiece('left')}
            style={{
              padding: '15px',
              fontSize: '24px',
              backgroundColor: 'rgba(0, 240, 240, 0.2)',
              color: '#00f0f0',
              border: '2px solid #00f0f0',
              borderRadius: '8px',
              cursor: 'pointer',
              touchAction: 'manipulation'
            }}
          >
            ←
          </button>
          <button
            onClick={handleRotate}
            style={{
              padding: '15px',
              fontSize: '24px',
              backgroundColor: 'rgba(0, 240, 240, 0.2)',
              color: '#00f0f0',
              border: '2px solid #00f0f0',
              borderRadius: '8px',
              cursor: 'pointer',
              touchAction: 'manipulation'
            }}
          >
            ↻
          </button>
          <button
            onClick={() => movePiece('right')}
            style={{
              padding: '15px',
              fontSize: '24px',
              backgroundColor: 'rgba(0, 240, 240, 0.2)',
              color: '#00f0f0',
              border: '2px solid #00f0f0',
              borderRadius: '8px',
              cursor: 'pointer',
              touchAction: 'manipulation'
            }}
          >
            →
          </button>
          <button
            onClick={() => setIsPaused(!isPaused)}
            style={{
              gridColumn: '1 / 3',
              padding: '12px',
              fontSize: '16px',
              backgroundColor: 'rgba(160, 0, 240, 0.2)',
              color: '#a000f0',
              border: '2px solid #a000f0',
              borderRadius: '8px',
              cursor: 'pointer',
              touchAction: 'manipulation'
            }}
          >
            {isPaused ? '继续' : '暂停'}
          </button>
          <button
            onClick={() => {
              for (let i = 0; i < 5; i++) {
                setTimeout(() => movePiece('down'), i * 10);
              }
            }}
            style={{
              padding: '15px',
              fontSize: '24px',
              backgroundColor: 'rgba(0, 240, 240, 0.2)',
              color: '#00f0f0',
              border: '2px solid #00f0f0',
              borderRadius: '8px',
              cursor: 'pointer',
              touchAction: 'manipulation'
            }}
          >
            ↓
          </button>
        </div>
      )}
      
      {(gameOver || isPaused) && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'rgba(0, 0, 0, 0.95)',
          padding: '30px',
          borderRadius: '10px',
          textAlign: 'center',
          zIndex: 1000,
          border: '2px solid #00f0f0',
          boxShadow: '0 0 30px rgba(0, 240, 240, 0.5)',
          maxWidth: '90%'
        }}>
          <h2 style={{ 
            marginBottom: '20px',
            background: 'linear-gradient(90deg, #00f0f0, #f0f000)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            {gameOver ? '游戏结束!' : '游戏暂停'}
          </h2>
          {gameOver && (
            <>
              <p style={{ marginBottom: '10px' }}>最终分数: <strong>{score}</strong></p>
              <p style={{ marginBottom: '20px' }}>消除行数: <strong>{lines}</strong></p>
            </>
          )}
          <button
            onClick={resetGame}
            style={{
              padding: '12px 24px',
              fontSize: '16px',
              backgroundColor: '#00f0f0',
              color: '#000',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold',
              touchAction: 'manipulation'
            }}
          >
            重新开始
          </button>
        </div>
      )}
      
      {!isMobile && (
        <div style={{ marginTop: '20px', fontSize: '12px', textAlign: 'center', color: '#888' }}>
          <p>方向键移动，上键/空格旋转</p>
          <p>P 键暂停</p>
        </div>
      )}
      {isMobile && (
        <div style={{ marginTop: '15px', fontSize: '11px', textAlign: 'center', color: '#888' }}>
          <p>滑动控制：左右移动，上滑旋转，下滑快速下降</p>
          <p>点击屏幕中央也可旋转</p>
        </div>
      )}
    </div>
  );
}
