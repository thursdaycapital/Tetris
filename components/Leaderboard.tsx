'use client';

import React, { useState, useEffect } from 'react';

export interface LeaderboardEntry {
  id: string;
  userName: string;
  score: number;
  lines: number;
  timestamp: number;
  fid?: number;
}

interface LeaderboardProps {
  currentScore?: number;
  currentLines?: number;
  userName?: string;
  fid?: number;
}

export default function Leaderboard({ currentScore, currentLines, userName, fid }: LeaderboardProps) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    loadLeaderboard();
  }, []);

  useEffect(() => {
    if (currentScore !== undefined && currentScore > 0 && userName) {
      addScore(currentScore, currentLines || 0, userName, fid);
    }
  }, [currentScore, currentLines, userName, fid]);

  function loadLeaderboard() {
    if (typeof window === 'undefined') return;
    
    const stored = localStorage.getItem('tetris-leaderboard');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setEntries(parsed.sort((a: LeaderboardEntry, b: LeaderboardEntry) => b.score - a.score).slice(0, 10));
      } catch (e) {
        console.error('Failed to load leaderboard:', e);
      }
    }
  }

  function addScore(score: number, lines: number, userName: string, fid?: number) {
    if (typeof window === 'undefined') return;
    
    const newEntry: LeaderboardEntry = {
      id: `${Date.now()}-${Math.random()}`,
      userName,
      score,
      lines,
      timestamp: Date.now(),
      fid
    };
    
    const stored = localStorage.getItem('tetris-leaderboard');
    let allEntries: LeaderboardEntry[] = [];
    
    if (stored) {
      try {
        allEntries = JSON.parse(stored);
      } catch (e) {
        console.error('Failed to parse leaderboard:', e);
      }
    }
    
    allEntries.push(newEntry);
    allEntries.sort((a, b) => b.score - a.score);
    const top10 = allEntries.slice(0, 10);
    
    localStorage.setItem('tetris-leaderboard', JSON.stringify(top10));
    setEntries(top10);
  }

  function formatDate(timestamp: number) {
    const date = new Date(timestamp);
    return date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' });
  }

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '20px', marginBottom: '15px', textAlign: 'center' }}>排行榜</h2>
      {entries.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#888' }}>暂无记录</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {entries.map((entry, index) => (
            <div
              key={entry.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px',
                backgroundColor: index < 3 ? 'rgba(255,215,0,0.2)' : 'rgba(255,255,255,0.05)',
                borderRadius: '5px',
                border: index === 0 ? '2px solid gold' : '1px solid rgba(255,255,255,0.1)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ 
                  fontWeight: 'bold', 
                  width: '24px',
                  color: index === 0 ? 'gold' : index === 1 ? 'silver' : index === 2 ? '#cd7f32' : '#fff'
                }}>
                  #{index + 1}
                </span>
                <div>
                  <div style={{ fontWeight: 'bold' }}>{entry.userName || '匿名'}</div>
                  <div style={{ fontSize: '12px', color: '#888' }}>
                    {entry.lines} 行 · {formatDate(entry.timestamp)}
                  </div>
                </div>
              </div>
              <div style={{ fontWeight: 'bold', fontSize: '18px' }}>{entry.score}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

