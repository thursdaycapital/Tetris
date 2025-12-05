# 执行清单

## ✅ 已完成

- [x] Next.js 项目初始化
- [x] TypeScript 配置
- [x] 俄罗斯方块游戏核心逻辑
- [x] 排行榜功能（本地存储）
- [x] Farcaster SDK 集成
- [x] UI 组件和样式
- [x] Vercel 部署配置
- [x] Manifest.json 配置
- [x] 响应式设计

## 📋 部署前检查

### 代码检查
- [ ] 运行 `npm install` 安装依赖
- [ ] 运行 `npm run build` 确保构建成功
- [ ] 运行 `npm run dev` 本地测试
- [ ] 测试游戏功能
- [ ] 测试排行榜功能
- [ ] 检查移动端显示

### 文件准备
- [ ] 创建 `public/icon.png` (512x512 像素，PNG 格式)
- [ ] 创建 `public/splash.png` (推荐 1200x630 像素)
- [ ] 更新 `public/manifest.json` 中的域名（部署后）

### Git 提交
```bash
git init
git add .
git commit -m "Initial commit: Tetris Farcaster Mini App"
```

### Vercel 部署
- [ ] 创建 Vercel 账户（如需要）
- [ ] 连接 GitHub 仓库
- [ ] 部署项目
- [ ] 获取部署域名
- [ ] 更新 manifest.json 中的域名
- [ ] 重新部署

### Warpcast 提交
- [ ] 确认 manifest.json 可访问
- [ ] 在 Warpcast 中提交 Mini App
- [ ] 填写应用信息
- [ ] 等待审核

## 🎮 功能测试清单

### 游戏功能
- [ ] 方块可以左右移动
- [ ] 方块可以旋转
- [ ] 方块可以快速下降
- [ ] 消除行数正确
- [ ] 分数计算正确
- [ ] 等级递增正常
- [ ] 游戏结束检测
- [ ] 重新开始功能

### 排行榜功能
- [ ] 游戏结束后自动保存分数
- [ ] 排行榜显示 Top 10
- [ ] 用户名正确显示
- [ ] 日期格式正确
- [ ] 分数排序正确

### Farcaster 集成
- [ ] 在 Farcaster 环境中可以获取用户名
- [ ] FID 正确获取
- [ ] 非 Farcaster 环境有默认用户名

### UI/UX
- [ ] 移动端适配良好
- [ ] 按钮可点击
- [ ] 标签切换正常
- [ ] 游戏暂停功能
- [ ] 游戏结束弹窗显示

## 🐛 已知问题/待优化

- [ ] 添加游戏音效（可选）
- [ ] 优化移动端触摸控制
- [ ] 添加更多游戏模式
- [ ] 实现云端排行榜（需要后端）
- [ ] 添加动画效果
- [ ] 优化性能

## 📝 快速命令

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建
npm run build

# 生产模式
npm start

# 代码检查
npm run lint
```

## 🔗 重要链接

- [Farcaster Mini Apps 文档](https://miniapps.farcaster.xyz/)
- [Next.js 文档](https://nextjs.org/docs)
- [Vercel 部署文档](https://vercel.com/docs)
- [Warpcast](https://warpcast.com)

