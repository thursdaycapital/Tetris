import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { untrustedData } = body;
    
    // 处理按钮点击
    const buttonIndex = untrustedData?.buttonIndex || 1;
    
    // Farcaster Frame POST 请求必须返回 HTML，包含 Frame meta 标签
    const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tetris Game - Farcaster Frame</title>
  
  <!-- Farcaster Frame Meta Tags -->
  <meta name="fc:frame" content="vNext" />
  <meta name="fc:frame:image" content="https://tetris-app-iota.vercel.app/icon.svg" />
  <meta name="fc:frame:button:1" content="开始游戏" />
  <meta name="fc:frame:post_url" content="https://tetris-app-iota.vercel.app/api/frame" />
  
  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://tetris-app-iota.vercel.app/api/frame" />
  <meta property="og:title" content="Tetris Game - Farcaster Frame" />
  <meta property="og:description" content="🎮 经典俄罗斯方块游戏，支持排行榜！" />
  <meta property="og:image" content="https://tetris-app-iota.vercel.app/icon.svg" />
  
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #000;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      margin: 0;
    }
    .container {
      text-align: center;
      padding: 20px;
    }
    h1 {
      font-size: 32px;
      margin-bottom: 20px;
      background: linear-gradient(90deg, #00f0f0, #f0f000);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🎮 Tetris Game</h1>
    <p>经典俄罗斯方块游戏，支持排行榜！</p>
    <p style="margin-top: 20px; color: #00f0f0;">点击按钮开始游戏 →</p>
  </div>
</body>
</html>`;

    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'X-Frame-Options': 'ALLOWALL',
      },
    });
  } catch (error) {
    console.error('Frame API error:', error);
    
    // 返回默认 Frame HTML 响应
    const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tetris Game - Farcaster Frame</title>
  
  <!-- Farcaster Frame Meta Tags -->
  <meta name="fc:frame" content="vNext" />
  <meta name="fc:frame:image" content="https://tetris-app-iota.vercel.app/icon.svg" />
  <meta name="fc:frame:button:1" content="开始游戏" />
  <meta name="fc:frame:post_url" content="https://tetris-app-iota.vercel.app/api/frame" />
  
  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://tetris-app-iota.vercel.app/api/frame" />
  <meta property="og:title" content="Tetris Game - Farcaster Frame" />
  <meta property="og:description" content="🎮 经典俄罗斯方块游戏，支持排行榜！" />
  <meta property="og:image" content="https://tetris-app-iota.vercel.app/icon.svg" />
</head>
<body>
  <div style="text-align: center; padding: 20px;">
    <h1>🎮 Tetris Game</h1>
    <p>经典俄罗斯方块游戏，支持排行榜！</p>
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
}

// 也支持 GET 请求，返回 Frame HTML
export async function GET() {
  const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tetris Game - Farcaster Frame</title>
  
  <!-- Farcaster Frame Meta Tags -->
  <meta name="fc:frame" content="vNext" />
  <meta name="fc:frame:image" content="https://tetris-app-iota.vercel.app/icon.svg" />
  <meta name="fc:frame:button:1" content="开始游戏" />
  <meta name="fc:frame:post_url" content="https://tetris-app-iota.vercel.app/api/frame" />
  
  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://tetris-app-iota.vercel.app/api/frame" />
  <meta property="og:title" content="Tetris Game - Farcaster Frame" />
  <meta property="og:description" content="🎮 经典俄罗斯方块游戏，支持排行榜！" />
  <meta property="og:image" content="https://tetris-app-iota.vercel.app/icon.svg" />
  
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #000;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      margin: 0;
    }
    .container {
      text-align: center;
      padding: 20px;
    }
    h1 {
      font-size: 32px;
      margin-bottom: 20px;
      background: linear-gradient(90deg, #00f0f0, #f0f000);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🎮 Tetris Game</h1>
    <p>经典俄罗斯方块游戏，支持排行榜！</p>
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

