# Vercel 部署指南

## 快速部署步骤

### 方法 1: 通过 Vercel Dashboard（推荐）

1. 访问 [vercel.com](https://vercel.com) 并登录
2. 点击 "Add New Project"
3. 导入 GitHub 仓库 `thursdaycapital/Tetris`
4. 配置项目：
   - **Framework Preset**: Next.js（自动检测）
   - **Root Directory**: `./`（默认）
   - **Build Command**: `npm run build`（默认）
   - **Output Directory**: `.next`（默认）
   - **Install Command**: `npm install`（默认）
5. 点击 "Deploy"

### 方法 2: 使用 Vercel CLI

```bash
# 安装 Vercel CLI
npm i -g vercel

# 在项目目录中运行
cd /Users/bapili/Tetris
vercel

# 按照提示操作
# 生产环境部署
vercel --prod
```

## 常见问题排查

### 1. 构建失败

**问题**: Build failed

**解决方案**:
- 确保 Node.js 版本 >= 18
- 在 Vercel 项目设置中设置 Node.js 版本为 18.x 或 20.x
- 检查构建日志中的具体错误信息

### 2. 环境变量

如果将来需要环境变量：
1. 在 Vercel Dashboard 中进入项目设置
2. 选择 "Environment Variables"
3. 添加所需的变量

### 3. 域名配置

部署成功后：
1. 获取 Vercel 分配的域名（如 `tetris-xxx.vercel.app`）
2. 更新 `public/manifest.json` 中的域名：
   ```json
   {
     "iconUrl": "https://your-app.vercel.app/icon.svg",
     "splashImageUrl": "https://your-app.vercel.app/splash.svg",
     "homeUrl": "https://your-app.vercel.app/app.html"
   }
   ```
3. 提交并推送更改
4. Vercel 会自动重新部署

## 项目配置

- **Node.js Version**: 18.x 或 20.x（在 Vercel 项目设置中配置）
- **Build Command**: `npm run build`
- **Output Directory**: `.next`（Next.js 默认）
- **Install Command**: `npm install`

## 验证部署

部署成功后，访问：
- 主应用: `https://your-app.vercel.app`
- Manifest: `https://your-app.vercel.app/manifest.json`
- App Entry: `https://your-app.vercel.app/app.html`

## 自动部署

Vercel 会自动：
- 监听 GitHub 推送
- 在每次 push 到 main 分支时自动部署
- 为每个 Pull Request 创建预览部署

