(function () {
  const leftEl = document.getElementById('story-left');
  const rightEl = document.getElementById('story-right');
  if (!leftEl || !rightEl) return;

  function load(el, path) {
    fetch(path)
      .then(function (res) {
        if (!res.ok) throw new Error('load failed');
        return res.text();
      })
      .then(function (txt) {
        txt = txt.replace(/^\uFEFF/, '');           // 去掉 BOM
        txt = txt.replace(/\r\n/g, '\n').replace(/\r/g, '\n');  // 统一为 \n 换行
        txt = txt.replace(/\\r\\n/g, '').replace(/\\r/g, '').replace(/\\n/g, '');  // 去掉字面 \n \r
        el.textContent = txt;
      })
      .catch(function () {
        el.textContent = '';
      });
  }

  load(leftEl, 'texts/story-left.txt');
  load(rightEl, 'texts/story-right.txt');
})();

