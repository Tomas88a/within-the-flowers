(function () {
  const previewEl = document.getElementById('bilibiliPreview');
  const hintEl = document.getElementById('bilibiliPreviewHint');
  if (!previewEl) return;

  const BV_REGEX = /BV[0-9A-Za-z]{10}/;

  function extractBvidFromUrl(raw) {
    if (!raw) return '';
    const m = String(raw).match(BV_REGEX);
    return m ? m[0] : '';
  }

  function getBvid() {
    const fromData = (previewEl.dataset && previewEl.dataset.bvid ? String(previewEl.dataset.bvid) : '').trim();
    if (extractBvidFromUrl(fromData)) return extractBvidFromUrl(fromData);

    const params = new URLSearchParams(window.location.search);
    const bvidFromQuery = params.get('bvid') || '';
    if (extractBvidFromUrl(bvidFromQuery)) return extractBvidFromUrl(bvidFromQuery);

    const urlFromQuery = params.get('url') || '';
    if (extractBvidFromUrl(urlFromQuery)) return extractBvidFromUrl(urlFromQuery);

    return '';
  }

  const bvid = getBvid();
  if (hintEl) {
    hintEl.style.display = bvid ? 'none' : 'block';
  }

  // 点击后才创建 iframe，避免页面一打开就请求/播放。
  let isLoaded = false;

  const coverImgEl = previewEl.querySelector('.bilibili-preview-cover');
  const folderCoverSrc = 'images/pages/video-cover.png';

  function setCoverImgSrc(src) {
    if (!coverImgEl) return;
    if (!src) return;
    coverImgEl.src = src;
  }

  function tryUseDatasetCoverPath() {
    const datasetCover = previewEl.dataset ? previewEl.dataset.cover : '';
    if (!datasetCover || !String(datasetCover).trim()) return false;

    // 若 dataset.cover 是 data:URL 或相对/绝对路径，直接当作图片 src 使用
    setCoverImgSrc(String(datasetCover).trim());
    if (hintEl) hintEl.style.display = 'none';
    return true;
  }

  function tryUseFolderCover() {
    return new Promise((resolve) => {
      if (!coverImgEl) return resolve(false);
      const img = new Image();
      img.onload = function () {
        setCoverImgSrc(folderCoverSrc);
        if (hintEl) hintEl.style.display = 'none';
        resolve(true);
      };
      img.onerror = function () {
        resolve(false);
      };
      img.src = folderCoverSrc;
    });
  }

  function loadPlayer() {
    if (isLoaded) return;
    if (!bvid) return;
    isLoaded = true;

    // 清空预览区域，注入 iframe
    previewEl.innerHTML = '';

    const iframe = document.createElement('iframe');
    iframe.className = 'bilibili-player-frame';
    iframe.src = `https://player.bilibili.com/player.html?bvid=${encodeURIComponent(bvid)}&autoplay=1&page=1`;
    iframe.allow = 'autoplay; fullscreen; picture-in-picture; encrypted-media';
    iframe.setAttribute('allowfullscreen', 'true');
    iframe.setAttribute('frameborder', '0');

    previewEl.appendChild(iframe);
  }

  // 封面优先级：1) video.html 的 data-cover 2) 项目内 images/pages/video-cover.png
  const usedDataset = tryUseDatasetCoverPath();
  if (!usedDataset) {
    tryUseFolderCover();
  }

  previewEl.addEventListener('click', function () {
    loadPlayer();
  });

  previewEl.addEventListener('keydown', function (e) {
    // Enter / Space 触发
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      loadPlayer();
    }
  });
})();

