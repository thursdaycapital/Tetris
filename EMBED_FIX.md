# Farcaster Embed Valid 修复指南

## 问题：Embed Present ✕ 和 Embed Valid ✕

如果 Farcaster 显示 Embed Present ✕ 和 Embed Valid ✕，说明无法检测到嵌入内容。

## ✅ 已实施的修复

### 1. 创建了 `app/app.html/route.ts` API 路由
- 返回完整的 HTML 页面
- 包含所有必要的 Open Graph meta 标签
- 包含实际的 HTML 内容（不只是重定向）

### 2. 添加了完整的 Meta 标签

```html
<meta property="og:type" content="website" />
<meta property="og:url" content="https://tetris-app-iota.vercel.app/app.html" />
<meta property="og:title" content="Tetris Game - Farcaster Mini App" />
<meta property="og:description" content="🎮 经典俄罗斯方块游戏，支持排行榜！" />
<meta property="og:image" content="https://tetris-app-iota.vercel.app/icon.svg" />
<meta property="og:image:width" content="512" />
<meta property="og:image:height" content="512" />
```

### 3. 添加了实际的 HTML 内容
- 页面包含可见的标题和描述
- 使用 iframe 加载主应用（而不是立即重定向）
- 确保 Farcaster 可以检测到内容

### 4. 设置了正确的 Headers
```javascript
'Content-Type': 'text/html; charset=utf-8'
'X-Frame-Options': 'ALLOWALL'
```

## 🔍 验证步骤

### 1. 检查 app.html 可访问性
```bash
curl -I https://tetris-app-iota.vercel.app/app.html
```
应该返回 `200 OK`

### 2. 检查 HTML 内容
```bash
curl -s https://tetris-app-iota.vercel.app/app.html | grep -E "(og:title|og:description)"
```
应该看到 Open Graph 标签

### 3. 检查页面内容
访问 `https://tetris-app-iota.vercel.app/app.html` 应该看到：
- 标题：🎮 Tetris Game
- 描述：经典俄罗斯方块游戏，支持排行榜！
- 加载提示

### 4. 在 Farcaster 平台验证
- 等待部署完成（1-2 分钟）
- 在 Farcaster 平台重新验证
- Embed Present 和 Embed Valid 应该变为 ✓

## 🐛 如果仍然失败

### 检查清单：

1. **确认 app.html 返回 200**
   ```bash
   curl -I https://tetris-app-iota.vercel.app/app.html
   ```

2. **确认有 Open Graph 标签**
   ```bash
   curl -s https://tetris-app-iota.vercel.app/app.html | grep "og:title"
   ```

3. **确认页面有实际内容**
   - 访问 `https://tetris-app-iota.vercel.app/app.html`
   - 应该看到标题和描述，而不是空白页

4. **检查 manifest.json**
   ```bash
   curl https://tetris-app-iota.vercel.app/manifest.json
   ```
   确认 `homeUrl` 指向 `app.html`

5. **清除缓存**
   - Farcaster 可能缓存了旧版本
   - 等待几分钟后重新验证

## 📝 当前配置

- ✅ `app/app.html/route.ts` - API 路由返回完整 HTML
- ✅ `public/app.html` - 静态文件（备用）
- ✅ 完整的 Open Graph meta 标签
- ✅ 实际的 HTML 内容
- ✅ X-Frame-Options: ALLOWALL header

## 🔗 相关链接

- [Farcaster Mini Apps 文档](https://miniapps.farcaster.xyz/)
- [Manifest 规范](https://miniapps.farcaster.xyz/docs/specification)

