# Farcaster Manifest 验证清单

## 问题：`does not have a valid manifest setup`

这个错误通常表示 Farcaster 无法验证你的 manifest 配置。请检查以下项目：

## ✅ 验证步骤

### 1. 检查 manifest.json 可访问性

访问以下 URL，确保返回 200 状态码：
```
https://tetris-app-iota.vercel.app/manifest.json
```

应该返回：
```json
{
  "name": "Tetris Game",
  "iconUrl": "https://tetris-app-iota.vercel.app/icon.svg",
  "splashImageUrl": "https://tetris-app-iota.vercel.app/splash.svg",
  "splashBackgroundColor": "#000428",
  "homeUrl": "https://tetris-app-iota.vercel.app/app.html"
}
```

### 2. 检查图标和启动画面可访问性

验证以下 URL 返回 200：
- ✅ `https://tetris-app-iota.vercel.app/icon.svg` (已验证)
- ✅ `https://tetris-app-iota.vercel.app/splash.svg` (已验证)

### 3. 检查 homeUrl 可访问性

访问：
```
https://tetris-app-iota.vercel.app/app.html
```

应该重定向到主应用页面。

### 4. 检查 /.well-known/farcaster.json 重定向

访问：
```
https://tetris-app-iota.vercel.app/.well-known/farcaster.json
```

应该返回 **307 重定向** 到：
```
https://api.farcaster.xyz/miniapps/hosted-manifest/019aed6f-49da-c5f3-1913-49746a3ba94a
```

**注意**：如果返回 404，需要等待 Vercel 重新部署后生效。

## 🔧 常见问题解决

### 问题 1: manifest.json 返回 404

**解决方案**：
- 确保 `public/manifest.json` 文件存在
- 确保文件已提交到 Git
- 等待 Vercel 重新部署

### 问题 2: `/.well-known/farcaster.json` 返回 404

**解决方案**：
- 我们已经配置了 middleware 和 API 路由
- 等待 Vercel 重新部署后生效
- 如果仍然 404，检查 Vercel 部署日志

### 问题 3: 图标或启动画面无法访问

**解决方案**：
- 确保 `public/icon.svg` 和 `public/splash.svg` 存在
- 确保文件已提交到 Git
- 如果使用 PNG，确保文件路径正确

### 问题 4: homeUrl 无法访问

**解决方案**：
- 确保 `public/app.html` 存在
- 检查 `vercel.json` 中的 rewrite 配置
- 确保主应用可以正常访问

## 📋 验证命令

使用以下命令验证所有 URL：

```bash
# 检查 manifest.json
curl -I https://tetris-app-iota.vercel.app/manifest.json

# 检查图标
curl -I https://tetris-app-iota.vercel.app/icon.svg

# 检查启动画面
curl -I https://tetris-app-iota.vercel.app/splash.svg

# 检查 homeUrl
curl -I https://tetris-app-iota.vercel.app/app.html

# 检查 farcaster.json 重定向
curl -I https://tetris-app-iota.vercel.app/.well-known/farcaster.json
```

## 🚀 部署后验证

1. **等待 Vercel 部署完成**（通常需要 1-2 分钟）
2. **验证所有 URL** 使用上面的命令
3. **在 Farcaster 平台重新验证** manifest

## 📝 当前配置状态

- ✅ manifest.json 已更新为实际域名
- ✅ icon.svg 和 splash.svg 可访问
- ✅ middleware 已配置重定向
- ✅ API 路由已配置重定向
- ⏳ 等待 Vercel 重新部署生效

## 🔗 相关链接

- [Farcaster Mini Apps 文档](https://miniapps.farcaster.xyz/)
- [Manifest 规范](https://miniapps.farcaster.xyz/docs/specification)
- [发布指南](https://miniapps.farcaster.xyz/docs/guides/publishing)

