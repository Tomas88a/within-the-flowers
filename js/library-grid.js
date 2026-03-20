(function () {
  function run() {
    const grid = document.getElementById('libraryGrid');
    if (!grid) return;

    const MAX_WORKS = 60;

    function addItem(imgEl) {
      const item = document.createElement('div');
      item.className = 'library-item';
      const inner = document.createElement('div');
      inner.className = 'library-item-inner';
      inner.appendChild(imgEl);
      item.appendChild(inner);
      grid.appendChild(item);
    }

    function tryFormat(index, ext) {
      const src = '/images/library/' + index + ext;
      const img = new Image();
      img.loading = 'lazy';
      img.alt = '作品 ' + index;

      img.onload = function () {
        addItem(img);
      };

      img.onerror = function () {
        if (ext === '.png') {
          tryFormat(index, '.jpg');
        }
      };

      img.src = src;
    }

    for (let i = 9; i <= MAX_WORKS; i++) {
      tryFormat(i, '.png');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
