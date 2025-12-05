# 部署清单

## 本地开发

### 1. 安装依赖
```bash
npm install
```

### 2. 运行开发服务器
```bash
npm run dev
```

访问 http://localhost:3000 查看应用

## 部署到 Vercel

### 步骤 1: 准备代码
- [x] 代码已准备好
- [ ] 确保所有文件已提交到 Git

### 步骤 2: 推送到 GitHub
```bash
git init
git add .
git commit -m "Initial commit: Tetris Farcaster Mini App"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

### 步骤 3: 在 Vercel 部署
1. 访问 [vercel.com](https://vercel.com)
2. 点击 "New Project"
3. 导入你的 GitHub 仓库
4. 配置：
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: `.next`
5. 点击 "Deploy"

### 步骤 4: 更新 Manifest
部署完成后，Vercel 会给你一个域名（如 `your-app.vercel.app`）

更新 `public/manifest.json`:
```json
{
  "name": "Tetris Game",
  "iconUrl": "https://your-app.vercel.app/icon.png",
  "splashImageUrl": "https://your-app.vercel.app/splash.png",
  "splashBackgroundColor": "#000000",
  "homeUrl": "https://your-app.vercel.app/app.html"
}
```

然后重新部署。

### 步骤 5: 添加图标（可选但推荐）
1. 创建 `public/icon.png` (512x512 像素)
2. 创建 `public/splash.png` (推荐尺寸: 1200x630 像素)
3. 提交并推送更改

## 在 Warpcast 中发布

### 步骤 1: 准备 Manifest URL
确保你的 manifest.json 可以通过 HTTPS 访问：
```
https://your-app.vercel.app/manifest.json
```

### 步骤 2: 提交到 Warpcast
1. 访问 Warpcast 应用
2. 进入 Mini App Store 或开发者设置
3. 提交新的 Mini App：
   - **名称**: Tetris Game
   - **Manifest URL**: `https://your-app.vercel.app/manifest.json`
   - **描述**: 经典俄罗斯方块游戏，支持排行榜
   - **分类**: 游戏

### 步骤 3: 等待审核
Warpcast 团队会审核你的应用，通常需要几天时间。

## 验证清单

部署后，请验证以下内容：

- [ ] 应用可以在浏览器中正常访问
- [ ] manifest.json 可以正常访问
- [ ] 游戏可以正常游玩
- [ ] 排行榜功能正常
- [ ] 在 Farcaster 环境中可以获取用户信息
- [ ] 移动端显示正常

## 故障排除

### 问题: manifest.json 404
- 确保文件在 `public/` 目录下
- 检查 Vercel 部署日志

### 问题: Farcaster SDK 未加载
- 检查 `app/layout.tsx` 中的 SDK 脚本标签
- 在浏览器控制台检查错误

### 问题: 游戏无法运行
- 检查浏览器控制台错误
- 确保所有依赖已安装
- 验证 TypeScript 编译无错误

## 环境变量（如需要）

如果需要添加环境变量（如 API keys），在 Vercel 项目设置中添加：
1. 进入项目设置
2. 选择 "Environment Variables"
3. 添加变量
4. 重新部署

## 更新应用

每次更新后：
1. 提交代码到 Git
2. Vercel 会自动重新部署
3. 如果 manifest.json 有更改，可能需要重新提交到 Warpcast

