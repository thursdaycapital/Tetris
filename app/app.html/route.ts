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
  <meta property="og:image:width" content="512" />
  <meta property="og:image:height" content="512" />
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:url" content="https://tetris-app-iota.vercel.app/app.html" />
  <meta name="twitter:title" content="Tetris Game - Farcaster Mini App" />
  <meta name="twitter:description" content="🎮 经典俄罗斯方块游戏，支持排行榜！" />
  <meta name="twitter:image" content="https://tetris-app-iota.vercel.app/icon.svg" />
  
  <!-- Allow embedding -->
  <meta http-equiv="X-Frame-Options" content="ALLOWALL" />
  
  <!-- Farcaster Frame Meta Tags -->
  <meta name="fc:app" content="true" />
  <meta name="fc:frame" content="vNext" />
  <meta name="fc:frame:image" content="https://tetris-app-iota.vercel.app/icon.svg" />
  <meta name="fc:frame:button:1" content="开始游戏" />
  <meta name="fc:frame:post_url" content="https://tetris-app-iota.vercel.app/api/frame" />
  
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #000;
      color: #fff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      padding: 20px;
    }
    .container {
      text-align: center;
      max-width: 600px;
    }
    h1 {
      font-size: 32px;
      margin-bottom: 20px;
      background: linear-gradient(90deg, #00f0f0, #f0f000);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .description {
      font-size: 18px;
      margin-bottom: 30px;
      color: #ccc;
    }
    .loading {
      font-size: 16px;
      color: #00f0f0;
      margin-top: 20px;
    }
  </style>
  
  <script>
    // 直接重定向到主应用，避免 iframe 问题
    // 延迟一点确保 meta 标签被解析
    setTimeout(function() {
      if (window.location.pathname === '/app.html' || window.location.pathname.endsWith('/app.html')) {
        window.location.replace('/');
      }
    }, 100);
  </script>
</head>
<body>
  <div class="container">
    <h1>🎮 Tetris Game</h1>
    <p class="description">经典俄罗斯方块游戏，支持排行榜！</p>
    <div class="loading">正在加载游戏...</div>
  </div>
</body>
</html>`;

  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'X-Frame-Options': 'ALLOWALL',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  });
}

