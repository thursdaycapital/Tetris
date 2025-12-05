import { NextResponse } from 'next/server';

export async function GET() {
  const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tetris Game - Farcaster Mini App</title>
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://tetris-app-iota.vercel.app/app.html" />
  <meta property="og:title" content="Tetris Game - Farcaster Mini App" />
  <meta property="og:description" content="🎮 经典俄罗斯方块游戏，支持排行榜！快来挑战最高分！" />
  <meta property="og:image" content="https://tetris-app-iota.vercel.app/icon.svg" />
  
  <!-- Twitter -->
  <meta property="twitter:card" content="summary" />
  <meta property="twitter:url" content="https://tetris-app-iota.vercel.app/app.html" />
  <meta property="twitter:title" content="Tetris Game - Farcaster Mini App" />
  <meta property="twitter:description" content="🎮 经典俄罗斯方块游戏，支持排行榜！" />
  <meta property="twitter:image" content="https://tetris-app-iota.vercel.app/icon.svg" />
  
  <!-- Allow embedding -->
  <meta http-equiv="X-Frame-Options" content="ALLOWALL" />
  
  <script>
    // 立即重定向到主应用
    window.location.replace('/');
  </script>
</head>
<body>
  <div style="font-family: system-ui; background: #000; color: #fff; display: flex; justify-content: center; align-items: center; height: 100vh;">
    <div>加载中...</div>
  </div>
</body>
</html>`;

  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'X-Frame-Options': 'ALLOWALL',
    },
  });
}

