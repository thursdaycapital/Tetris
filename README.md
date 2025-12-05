# 俄罗斯方块 Farcaster Mini App

一个基于 Next.js 的俄罗斯方块小游戏，集成 Farcaster Mini App SDK，支持排行榜功能。

## 功能特性

- 🎮 经典俄罗斯方块游戏
- 🏆 本地排行榜（Top 10）
- 👤 Farcaster 用户认证集成
- 📱 响应式设计，适配移动端
- 🚀 一键部署到 Vercel

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 本地开发

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000)

### 3. 部署到 Vercel

1. 将代码推送到 GitHub
2. 在 [Vercel](https://vercel.com) 导入项目
3. 部署完成后，更新 `public/manifest.json` 中的域名

### 4. 在 Warpcast 中发布

1. 访问 [Warpcast Mini App Store](https://warpcast.com)
2. 提交你的 Mini App：
   - 名称: Tetris Game
   - Manifest URL: `https://your-domain.vercel.app/manifest.json`
   - 图标和启动画面（可选）

## 项目结构

```
├── app/
│   ├── page.tsx          # 主页面
│   ├── layout.tsx        # 布局组件
│   └── globals.css       # 全局样式
├── components/
│   ├── Tetris.tsx        # 游戏核心组件
│   └── Leaderboard.tsx   # 排行榜组件
├── public/
│   ├── manifest.json     # Farcaster manifest
│   └── app.html          # 应用入口
├── vercel.json           # Vercel 配置
└── package.json
```

## 游戏操作

- **方向键左/右**: 移动方块
- **方向键下**: 快速下降
- **方向键上/空格**: 旋转方块
- **P 键**: 暂停/继续

## 排行榜

排行榜使用浏览器本地存储（localStorage），显示 Top 10 记录。每条记录包含：
- 用户名（来自 Farcaster）
- 分数
- 消除行数
- 日期

## Farcaster SDK 集成

应用会自动检测是否在 Farcaster 环境中运行，并获取用户信息：
- 用户名
- FID (Farcaster ID)

如果不在 Farcaster 环境中，将使用默认用户名"玩家"。

## 注意事项

1. **manifest.json**: 部署后需要更新其中的域名和图标 URL
2. **图标文件**: 建议添加 `public/icon.png` (512x512) 和 `public/splash.png`
3. **CORS**: Vercel 配置已包含必要的 headers

## 开发清单

- [x] Next.js 项目设置
- [x] 俄罗斯方块游戏逻辑
- [x] 排行榜功能
- [x] Farcaster SDK 集成
- [x] UI 组件
- [x] Vercel 部署配置
- [ ] 添加游戏图标和启动画面
- [ ] 优化移动端体验
- [ ] 添加音效（可选）

## 许可证

MIT

