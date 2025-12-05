# 图标文件说明

## 需要的图标文件

为了在 Warpcast 中正常显示，你需要创建以下图标文件：

### 1. icon.png
- **尺寸**: 512x512 像素
- **格式**: PNG
- **用途**: Mini App 图标
- **位置**: `public/icon.png`

### 2. splash.png
- **尺寸**: 推荐 1200x630 像素
- **格式**: PNG
- **用途**: 启动画面
- **位置**: `public/splash.png`

## 临时解决方案

如果暂时没有图标，可以：
1. 使用在线工具生成简单图标
2. 使用占位图片服务（如 placeholder.com）
3. 暂时使用纯色图片

## 更新 manifest.json

创建图标后，确保 `public/manifest.json` 中的 URL 指向正确的文件：
- `iconUrl`: 应该是完整的 HTTPS URL
- `splashImageUrl`: 应该是完整的 HTTPS URL

示例：
```json
{
  "iconUrl": "https://your-domain.vercel.app/icon.png",
  "splashImageUrl": "https://your-domain.vercel.app/splash.png"
}
```

