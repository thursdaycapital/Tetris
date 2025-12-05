'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Tetris from '@/components/Tetris';
import ShareButton from '@/components/ShareButton';
import FarcasterDetector from '@/components/FarcasterDetector';
import { soundManager } from '@/utils/sound';

// 动态导入以避免 SSR 问题
const LeaderboardDynamic = dynamic(() => import('@/components/Leaderboard'), { ssr: false });

export default function Home() {
  const [userName, setUserName] = useState<string>('');
  const [fid, setFid] = useState<number | undefined>();
  const [gameScore, setGameScore] = useState<number | undefined>();
  const [gameLines, setGameLines] = useState<number | undefined>();
  const [activeTab, setActiveTab] = useState<'game' | 'leaderboard'>('game');
  const [sdkReady, setSdkReady] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    // 设置超时，确保即使 SDK 加载失败也能显示游戏
    const timeout = setTimeout(() => {
      if (!sdkReady) {
        console.warn('SDK loading timeout, showing game anyway');
        setUserName('玩家');
        setSdkReady(true);
      }
    }, 2000); // 2 秒超时

    // 尝试加载 Farcaster SDK
    if (typeof window !== 'undefined') {
      const checkSDK = async () => {
        try {
          // 动态加载 Farcaster SDK
          const script = document.createElement('script');
          script.src = 'https://unpkg.com/@farcaster/frame-sdk@latest/dist/index.umd.js';
          script.async = true;
          script.onload = async () => {
            try {
              // @ts-ignore - Farcaster SDK 可能未定义
              if (window.farcaster) {
                // @ts-ignore
                const context = await window.farcaster.context;
                
                // 调用 ready() 隐藏启动画面
                try {
                  // @ts-ignore
                  if (context?.actions?.ready) {
                    // @ts-ignore
                    await context.actions.ready();
                  }
                } catch (readyError) {
                  console.warn('Failed to call ready():', readyError);
                }
                
                if (context?.user) {
                  setUserName(context.user.username || context.user.displayName || '玩家');
                  setFid(context.user.fid);
                } else {
                  setUserName('玩家');
                }
              } else {
                setUserName('玩家');
              }
            } catch (e) {
              console.warn('Farcaster SDK not available:', e);
              setUserName('玩家');
            }
            clearTimeout(timeout);
            setSdkReady(true);
          };
          script.onerror = () => {
            // SDK 加载失败，直接设置就绪状态
            console.warn('SDK script load error');
            setUserName('玩家');
            clearTimeout(timeout);
            setSdkReady(true);
          };
          document.head.appendChild(script);
        } catch (error) {
          console.warn('SDK initialization error:', error);
          setUserName('玩家');
          clearTimeout(timeout);
          setSdkReady(true);
        }
      };
      
      checkSDK();
    } else {
      // 服务器端渲染，直接设置就绪
      clearTimeout(timeout);
      setSdkReady(true);
    }

    return () => {
      clearTimeout(timeout);
    };
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
        color: '#fff',
        fontSize: '18px'
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
      <FarcasterDetector />
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        borderBottom: '1px solid #333',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setActiveTab('game')}
            style={{
              padding: '10px 20px',
              backgroundColor: activeTab === 'game' ? '#00f0f0' : 'transparent',
              color: '#fff',
              border: '1px solid #00f0f0',
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
              backgroundColor: activeTab === 'leaderboard' ? '#00f0f0' : 'transparent',
              color: '#fff',
              border: '1px solid #00f0f0',
              borderRadius: '5px 5px 0 0',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            排行榜
          </button>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <ShareButton score={gameScore} lines={gameLines} />
          <button
            onClick={() => {
              const newState = !soundEnabled;
              setSoundEnabled(newState);
              soundManager.setEnabled(newState);
            }}
            style={{
              padding: '8px 16px',
              backgroundColor: soundEnabled ? 'rgba(0, 240, 240, 0.2)' : 'rgba(128, 128, 128, 0.2)',
              color: soundEnabled ? '#00f0f0' : '#888',
              border: `1px solid ${soundEnabled ? '#00f0f0' : '#888'}`,
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            {soundEnabled ? '🔊' : '🔇'} {soundEnabled ? '音效' : '静音'}
          </button>
        </div>
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

