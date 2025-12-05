# 如何在 Farcaster 应用中打开 Mini App

## 问题：游戏在浏览器中打开而不是在 Farcaster 应用中

如果你发现游戏在手机浏览器中打开，而不是在 Farcaster 应用中，这是因为你可能是通过普通链接打开的。

## ✅ 正确打开方式

### 方法 1: 通过 Farcaster Mini App Store（推荐）

1. **打开 Farcaster 或 Warpcast 应用**
2. **进入 Mini App Store**
   - 在 Warpcast 中：点击底部导航栏的 "Apps" 或 "Mini Apps"
   - 搜索 "Tetris Game"
3. **点击你的 Mini App**
4. Mini App 会在 Farcaster 应用内打开

### 方法 2: 通过 Cast 中的链接

1. **在 Farcaster 中创建或查看 Cast**
2. **点击包含 Mini App 链接的 Cast**
3. 如果链接格式正确，Farcaster 会自动识别并在应用内打开

### 方法 3: 通过分享链接

1. **使用 Farcaster SDK 的分享功能**
2. 分享的链接会自动在 Farcaster 应用内打开

## 🔍 如何判断是否在 Farcaster 中

应用会自动检测是否在 Farcaster 环境中：
- ✅ 如果在 Farcaster 中：会显示用户信息，可以使用 Farcaster SDK 功能
- ❌ 如果在浏览器中：会显示提示信息

## 📱 Mini App 链接格式

正确的 Mini App 链接应该是：
```
https://tetris-app-iota.vercel.app/app.html
```

或者直接访问：
```
https://tetris-app-iota.vercel.app
```

## ⚠️ 常见问题

### 问题 1: 点击链接后跳转到浏览器

**原因**：
- 链接是在浏览器中打开的
- 链接没有通过 Farcaster 应用打开

**解决方案**：
- 确保在 Farcaster 或 Warpcast 应用中打开链接
- 使用 Mini App Store 中的链接
- 不要直接在浏览器地址栏输入链接

### 问题 2: Mini App 没有出现在 Store 中

**原因**：
- Mini App 可能还在审核中
- manifest.json 配置可能有问题

**解决方案**：
- 检查 manifest.json 是否正确配置
- 确认 Mini App 已提交审核
- 等待审核通过

### 问题 3: 链接格式不正确

**确保链接格式**：
- ✅ `https://tetris-app-iota.vercel.app/app.html`
- ✅ `https://tetris-app-iota.vercel.app`
- ❌ 不要使用 `http://`（必须使用 HTTPS）

## 🔧 技术说明

### Farcaster 如何识别 Mini App

Farcaster 通过以下方式识别 Mini App：

1. **manifest.json** - 必须可访问
2. **/.well-known/farcaster.json** - 账户关联信息
3. **homeUrl** - 应用入口 URL

### 当前配置

```json
{
  "name": "Tetris Game",
  "iconUrl": "https://tetris-app-iota.vercel.app/icon.svg",
  "homeUrl": "https://tetris-app-iota.vercel.app/app.html"
}
```

## 📝 验证步骤

1. **确认 manifest.json 可访问**
   ```
   https://tetris-app-iota.vercel.app/manifest.json
   ```

2. **确认 homeUrl 可访问**
   ```
   https://tetris-app-iota.vercel.app/app.html
   ```

3. **在 Farcaster 应用中测试**
   - 打开 Farcaster/Warpcast 应用
   - 通过 Mini App Store 打开
   - 确认在应用内打开，而不是浏览器

## 🚀 分享 Mini App

### 在 Farcaster 中分享：

1. 使用应用内的"分享游戏"按钮
2. 分享的链接会自动在 Farcaster 应用内打开

### 分享链接格式：

```
🎮 来玩俄罗斯方块吧！经典游戏，支持排行榜！
https://tetris-app-iota.vercel.app
```

## 💡 提示

- **最佳体验**：始终在 Farcaster/Warpcast 应用中打开 Mini App
- **浏览器访问**：虽然可以在浏览器中打开，但某些功能（如 Farcaster SDK）可能不可用
- **分享链接**：使用应用内的分享功能，确保链接在 Farcaster 中打开

