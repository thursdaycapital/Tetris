'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Tetris from '@/components/Tetris';

// 动态导入以避免 SSR 问题
const LeaderboardDynamic = dynamic(() => import('@/components/Leaderboard'), { ssr: false });

export default function Home() {
  const [userName, setUserName] = useState<string>('');
  const [fid, setFid] = useState<number | undefined>();
  const [gameScore, setGameScore] = useState<number | undefined>();
  const [gameLines, setGameLines] = useState<number | undefined>();
  const [activeTab, setActiveTab] = useState<'game' | 'leaderboard'>('game');
  const [sdkReady, setSdkReady] = useState(false);

  useEffect(() => {
    // 尝试加载 Farcaster SDK
    if (typeof window !== 'undefined') {
      // 检查是否在 Farcaster 环境中
      const checkSDK = async () => {
        try {
          // @ts-ignore - Farcaster SDK 可能未定义
          if (window.farcaster) {
            setSdkReady(true);
            // @ts-ignore
            const context = await window.farcaster.context;
            if (context?.user) {
              setUserName(context.user.username || context.user.displayName || '玩家');
              setFid(context.user.fid);
            }
          } else {
            // 不在 Farcaster 环境中，使用默认用户名
            setUserName('玩家');
            setSdkReady(true);
          }
        } catch (error) {
          console.error('Failed to load Farcaster SDK:', error);
          setUserName('玩家');
          setSdkReady(true);
        }
      };
      
      checkSDK();
    }
  }, []);

  function handleGameOver(score: number, lines: number) {
    setGameScore(score);
    setGameLines(lines);
    // 自动切换到排行榜
    setTimeout(() => {
      setActiveTab('leaderboard');
    }, 2000);
  }

  if (!sdkReady) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        backgroundColor: '#000',
        color: '#fff'
      }}>
        <div>加载中...</div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#000', 
      color: '#fff',
      padding: '10px'
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '10px',
        marginBottom: '20px',
        borderBottom: '1px solid #333'
      }}>
        <button
          onClick={() => setActiveTab('game')}
          style={{
            padding: '10px 20px',
            backgroundColor: activeTab === 'game' ? '#4CAF50' : 'transparent',
            color: '#fff',
            border: '1px solid #4CAF50',
            borderRadius: '5px 5px 0 0',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          游戏
        </button>
        <button
          onClick={() => setActiveTab('leaderboard')}
          style={{
            padding: '10px 20px',
            backgroundColor: activeTab === 'leaderboard' ? '#4CAF50' : 'transparent',
            color: '#fff',
            border: '1px solid #4CAF50',
            borderRadius: '5px 5px 0 0',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          排行榜
        </button>
      </div>

      {activeTab === 'game' ? (
        <Tetris 
          onGameOver={handleGameOver} 
          userName={userName}
        />
      ) : (
        <LeaderboardDynamic
          currentScore={gameScore}
          currentLines={gameLines}
          userName={userName}
          fid={fid}
        />
      )}
    </div>
  );
}

