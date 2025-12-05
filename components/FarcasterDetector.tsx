'use client';

import { useEffect, useState } from 'react';

export default function FarcasterDetector() {
  const [isInFarcaster, setIsInFarcaster] = useState<boolean | null>(null);

  useEffect(() => {
    // 检测是否在 Farcaster 环境中
    const checkFarcaster = async () => {
      // @ts-ignore
      if (typeof window !== 'undefined' && window.farcaster) {
        setIsInFarcaster(true);
        return;
      }

      // 检查 User-Agent
      const userAgent = navigator.userAgent.toLowerCase();
      const isFarcasterUA = userAgent.includes('farcaster') || 
                           userAgent.includes('warpcast') ||
                           window.location.href.includes('farcaster') ||
                           window.location.href.includes('warpcast');

      if (isFarcasterUA) {
        setIsInFarcaster(true);
      } else {
        // 延迟检测，等待 SDK 加载
        setTimeout(() => {
          // @ts-ignore
          if (window.farcaster) {
            setIsInFarcaster(true);
          } else {
            setIsInFarcaster(false);
          }
        }, 1000);
      }
    };

    checkFarcaster();
  }, []);

  // 如果不在 Farcaster 中，显示提示（可选）
  if (isInFarcaster === false) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 240, 240, 0.1)',
        borderBottom: '1px solid #00f0f0',
        padding: '10px',
        textAlign: 'center',
        fontSize: '12px',
        color: '#00f0f0',
        zIndex: 1000
      }}>
        💡 提示：请在 Farcaster 或 Warpcast 应用中打开以获得最佳体验
      </div>
    );
  }

  return null;
}

