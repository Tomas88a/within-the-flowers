// 右下角按钮：切换背景视频声音 开/关
(function () {
  const video = document.getElementById('bgVideo');
  const btn = document.getElementById('soundToggle');
  if (!video || !btn) return;

  const iconEl = btn.querySelector('.sound-icon');

  function updateButton() {
    const isOn = !video.muted;
    if (iconEl) iconEl.textContent = isOn ? '🔊' : '🔇';
    btn.classList.toggle('is-on', isOn);
  }

  btn.addEventListener('click', function () {
    video.muted = !video.muted;
    updateButton();
  });

  updateButton();
})();
