# 我的个人作品艺术网站

一个支持**图片、视频、文字、PNG、自定义字体和背景音乐**的静态作品集网站。

## 如何运行

- **方式一**：直接双击 `index.html` 用浏览器打开。
- **方式二**：在项目根目录用本地服务器（推荐，便于加载本地音频）：
  ```bash
  npx serve .
  ```
  然后打开终端里显示的地址（如 http://localhost:3000）。

## 文件夹与资源说明

| 文件夹 | 用途 |
|--------|------|
| `images/works/` | 放置作品图片（支持 PNG、JPG 等），如 `01.png`、`02.png` |
| `videos/` | **背景视频**放这里：命名为 `background.mp4`（或同时在 `index.html` 里改为你的路径），固定全屏循环播放，不随页面滚动 |
| `videos/works/` | 放置作品视频，如 `demo.mp4` |
| `audio/` | 放置背景音乐，如 `ambient.mp3` 或 `ambient.ogg` |
| `fonts/` | 放置自定义字体（.ttf / .otf / .woff2），需在 `css/style.css` 里配置 `@font-face` |

## 如何添加你的内容

1. **背景视频**：把循环播放的视频放到 `videos/` 并命名为 `background.mp4`（或修改 `index.html` 里 `.bg-video` 的 `src`）。背景固定、不随鼠标滚动。
2. **图片**：把 PNG/JPG 放到 `images/works/`，在 `index.html` 的「作品集」里把 `src="images/works/01.png"` 改成你的文件名，并修改 `figcaption` 标题。
3. **作品视频**：把 MP4 等放到 `videos/works/`，在 `index.html` 里找到作品区的 `<video>`，把 `src` 和 `poster`（封面图）改成你的路径。
4. **文字**：在 `index.html` 的「关于」区块中直接改 `<p>` 里的文字。
5. **音乐**：把 MP3/OGG 放到 `audio/`，在 `index.html` 里把 `<source src="audio/ambient.mp3">` 改成你的文件名。右下角按钮可播放/暂停。
6. **自定义字体**：把字体文件放到 `fonts/`，在 `css/style.css` 顶部按注释添加 `@font-face`，并把 `:root` 里的 `--font-title` 改为你的字体名。

## 项目结构

```
my-art-website/
├── index.html          # 主页面，可编辑文字与媒体路径
├── css/
│   └── style.css       # 样式与字体配置
├── js/
│   └── main.js         # 背景音乐、导航高亮
├── images/
│   └── works/          # 作品图片
├── videos/
│   └── works/          # 作品视频
├── audio/              # 背景音乐
├── fonts/              # 自定义字体
└── README.md           # 本说明
```

按上述步骤替换成你自己的图片、视频、文字、字体和音乐即可。
