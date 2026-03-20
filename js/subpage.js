/**
 * 子页面背景视频：不自动播放，完全由滚轮控制
 * - 滚一下 = 前进/后退一帧（或按滚动量）
 * - 一直滚 = 一直动；不滚 = 不动
 * - 播到结尾再往下滚 = 从结尾倒放（往回退）；从开头再往上滚 = 从开头正放
 */
(function () {
  const video = document.querySelector('.subpage-bg-video');
  if (!video) return;

  video.pause();
  video.removeAttribute('loop');

  const FRAMES_PER_WHEEL = 8;
  const FRAME_TIME = 1 / 30;
  const WHEEL_SCALE = 0.0008;
  const MIN_STEP = FRAMES_PER_WHEEL * FRAME_TIME;

  function getDuration() {
    return video.duration && isFinite(video.duration) ? video.duration : 0;
  }

  function clamp(t, min, max) {
    return Math.max(min, Math.min(max, t));
  }

  function onWheel(e) {
    const duration = getDuration();
    if (duration <= 0) return;

    const deltaY = e.deltaY;
    const step = Math.max(MIN_STEP, Math.abs(deltaY) * WHEEL_SCALE);
    const timeDelta = (deltaY > 0 ? 1 : -1) * step;
    let t = video.currentTime + timeDelta;

    if (t > duration) {
      t = 2 * duration - t;
    }
    if (t < 0) {
      t = -t;
    }

    video.currentTime = clamp(t, 0, duration);
  }

  window.addEventListener('wheel', onWheel, { passive: true });
})();
