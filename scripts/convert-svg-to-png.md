# 将 SVG 转换为 PNG

## 方法 1: 使用在线工具（推荐）

1. 访问 https://cloudconvert.com/svg-to-png
2. 上传 `public/icon.svg`，设置尺寸为 512x512
3. 上传 `public/splash.svg`，设置尺寸为 1200x630
4. 下载并保存到 `public/` 目录

## 方法 2: 使用浏览器生成

1. 打开 `scripts/generate-icons.html` 在浏览器中
2. 图标会自动下载为 PNG 格式
3. 将下载的文件移动到 `public/` 目录

## 方法 3: 使用 ImageMagick（如果已安装）

```bash
# 安装 ImageMagick (macOS)
brew install imagemagick

# 转换图标
convert -background none -resize 512x512 public/icon.svg public/icon.png

# 转换启动画面
convert -background none -resize 1200x630 public/splash.svg public/splash.png
```

## 方法 4: 使用 Node.js 脚本

```bash
npm install --save-dev sharp
node scripts/convert-icons.js
```

转换后，更新 `public/manifest.json` 中的 URL 从 `.svg` 改为 `.png`。

