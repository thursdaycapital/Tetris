'use client';

import { useState } from 'react';

interface ShareButtonProps {
  score?: number;
  lines?: number;
}

export default function ShareButton({ score, lines }: ShareButtonProps) {
  const [isSharing, setIsSharing] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== 'undefined' 
    ? window.location.origin 
    : 'https://tetris-app-iota.vercel.app';

  const shareText = score && lines
    ? `🎮 我在俄罗斯方块游戏中获得了 ${score} 分，消除了 ${lines} 行！快来挑战吧！`
    : '🎮 来玩俄罗斯方块吧！经典游戏，支持排行榜！';

  async function handleShare() {
    setIsSharing(true);

    try {
      // 检查是否在 Farcaster 环境中
      // @ts-ignore
      if (typeof window !== 'undefined' && window.farcaster) {
        try {
          // @ts-ignore
          const context = await window.farcaster.context;
          // @ts-ignore
          if (context?.share) {
            // @ts-ignore
            await context.share({
              text: shareText,
              url: shareUrl,
            });
            return;
          }
        } catch (e) {
          console.warn('Farcaster share API not available:', e);
        }
      }

      // 使用 Web Share API（如果可用）
      if (navigator.share) {
        try {
          await navigator.share({
            title: '俄罗斯方块 - Farcaster Mini App',
            text: shareText,
            url: shareUrl,
          });
          return;
        } catch (e) {
          if ((e as Error).name !== 'AbortError') {
            console.warn('Web Share API failed:', e);
          }
        }
      }

      // 回退到复制链接
      await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Share failed:', error);
      // 回退到复制链接
      try {
        await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (e) {
        console.error('Copy failed:', e);
      }
    } finally {
      setIsSharing(false);
    }
  }

  function handleCopyLink() {
    const text = `${shareText}\n${shareUrl}`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch((e) => {
      console.error('Copy failed:', e);
    });
  }

  return (
    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
      <button
        onClick={handleShare}
        disabled={isSharing}
        style={{
          padding: '10px 20px',
          backgroundColor: 'rgba(0, 240, 240, 0.2)',
          color: '#00f0f0',
          border: '1px solid #00f0f0',
          borderRadius: '5px',
          cursor: isSharing ? 'not-allowed' : 'pointer',
          fontSize: '14px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          opacity: isSharing ? 0.6 : 1
        }}
      >
        {isSharing ? '⏳' : '📤'} {isSharing ? '分享中...' : '分享游戏'}
      </button>
      
      <button
        onClick={handleCopyLink}
        style={{
          padding: '8px 16px',
          backgroundColor: copied ? 'rgba(0, 240, 0, 0.2)' : 'rgba(128, 128, 128, 0.2)',
          color: copied ? '#00ff00' : '#888',
          border: `1px solid ${copied ? '#00ff00' : '#888'}`,
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '12px'
        }}
      >
        {copied ? '✓ 已复制' : '📋 复制链接'}
      </button>
    </div>
  );
}

