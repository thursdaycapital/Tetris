# 俄罗斯方块 Farcaster Mini App

一个基于 Next.js 的俄罗斯方块小游戏，集成 Farcaster Mini App SDK，支持排行榜功能。

## 功能特性

- 🎮 经典俄罗斯方块游戏
- 🏆 本地排行榜（Top 10）
- 👤 Farcaster 用户认证集成
- 📱 响应式设计，完美适配移动端
- 🔊 经典游戏音效（移动、旋转、消除、游戏结束）
- 📳 震动反馈（消除方块时）
- 🎨 科技感图标和启动画面
- 🎯 移动端手势控制（滑动操作）
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
├── utils/
│   └── sound.ts          # 音效和震动系统
├── public/
│   ├── manifest.json     # Farcaster manifest
│   ├── app.html          # 应用入口
│   ├── icon.svg          # 游戏图标（SVG）
│   └── splash.svg        # 启动画面（SVG）
├── scripts/
│   ├── generate-icons.html  # 图标生成工具
│   └── convert-svg-to-png.md # PNG 转换说明
├── vercel.json           # Vercel 配置
└── package.json
```

## 游戏操作

### 桌面端
- **方向键左/右**: 移动方块
- **方向键下**: 快速下降
- **方向键上/空格**: 旋转方块
- **P 键**: 暂停/继续

### 移动端
- **左右滑动**: 移动方块
- **向下滑动**: 快速下降
- **向上滑动/点击屏幕**: 旋转方块
- **控制按钮**: 屏幕底部提供虚拟按键
- **暂停按钮**: 点击暂停/继续按钮

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

## 音效和震动

游戏包含完整的音效系统：
- **移动音效**: 方块左右移动时
- **旋转音效**: 方块旋转时
- **放置音效**: 方块落地时
- **消除音效**: 消除行时（根据消除行数播放不同音效）
- **等级提升**: 等级提升时播放庆祝音效
- **游戏结束**: 游戏结束时播放结束音效

震动反馈：
- 消除 1 行：短震动
- 消除 2 行：双重震动
- 消除 3 行：三重震动
- 消除 4 行（Tetris）：长震动序列

可以在游戏界面右上角切换音效开关。

## 图标和启动画面

项目包含科技感设计的 SVG 图标：
- `public/icon.svg` - 512x512 游戏图标
- `public/splash.svg` - 1200x630 启动画面

如需 PNG 格式，可以使用：
1. 在线工具转换（推荐）：https://cloudconvert.com/svg-to-png
2. 浏览器工具：打开 `scripts/generate-icons.html`
3. ImageMagick：参考 `scripts/convert-svg-to-png.md`

## 注意事项

1. **manifest.json**: 部署后需要更新其中的域名和图标 URL
2. **图标文件**: SVG 格式已包含，如需 PNG 请参考转换说明
3. **CORS**: Vercel 配置已包含必要的 headers
4. **音效**: 使用 Web Audio API，需要用户交互后才能播放（浏览器限制）
5. **震动**: 需要设备支持，且需要用户授权

## 开发清单

- [x] Next.js 项目设置
- [x] 俄罗斯方块游戏逻辑
- [x] 排行榜功能
- [x] Farcaster SDK 集成
- [x] UI 组件
- [x] Vercel 部署配置
- [x] 添加游戏图标和启动画面（科技感设计）
- [x] 优化移动端体验（手势控制、虚拟按键）
- [x] 添加音效系统（经典俄罗斯方块音效）
- [x] 添加震动反馈

## 许可证

MIT

