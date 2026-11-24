(function initBoomerang() {
  const video = document.getElementById('boomerangVideo');
  const canvas = document.getElementById('boomerangCanvas');
  if (!video || !canvas) return;

  const isMobile = window.innerWidth < 768 ||
                   window.matchMedia('(max-width: 768px)').matches ||
                   /Android|iPhone|iPad|Mobile/i.test(navigator.userAgent) ||
                   (navigator.connection && navigator.connection.saveData);
  if (isMobile) {
    return;
  }

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const frames = [];
  let capturing = true;
  let lastTime = -1;
  const MAX_WIDTH = 960;

  function captureFrame() {
    if (!capturing || video.readyState < 2) return;
    if (video.currentTime === lastTime) return;
    lastTime = video.currentTime;

    const vw = video.videoWidth;
    const vh = video.videoHeight;
    if (!vw || !vh) return;

    const scale = Math.min(1, MAX_WIDTH / vw);
    const w = Math.round(vw * scale);
    const h = Math.round(vh * scale);

    const frameCanvas = document.createElement('canvas');
    frameCanvas.width = w;
    frameCanvas.height = h;
    const frameCtx = frameCanvas.getContext('2d');
    if (!frameCtx) return;
    frameCtx.drawImage(video, 0, 0, w, h);
    frames.push(frameCanvas);
  }

  const hasVFC = typeof video.requestVideoFrameCallback === 'function';
  let rafId = 0;

  function rafLoop() {
    captureFrame();
    if (capturing) rafId = requestAnimationFrame(rafLoop);
  }

  function vfcLoop() {
    captureFrame();
    if (capturing && hasVFC) {
      video.requestVideoFrameCallback(vfcLoop);
    }
  }

  function startBoomerangPlayback() {
    if (frames.length === 0) return;
    video.style.display = 'none';
    canvas.style.display = 'block';
    canvas.classList.add('is-ready');

    const first = frames[0];
    canvas.width = first.width;
    canvas.height = first.height;

    let index = frames.length - 1;
    let direction = -1;
    let last = performance.now();
    const interval = 1000 / 30;

    function render(now) {
      if (document.hidden) {
        requestAnimationFrame(render);
        return;
      }
      if (now - last >= interval) {
        last = now;
        ctx.drawImage(frames[index], 0, 0);
        index += direction;
        if (index >= frames.length - 1) {
          index = frames.length - 1;
          direction = -1;
        } else if (index <= 0) {
          index = 0;
          direction = 1;
        }
      }
      requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
  }

  function onEnded() {
    if (!capturing) return;
    capturing = false;
    cancelAnimationFrame(rafId);
    if (frames.length > 5) {
      startBoomerangPlayback();
    } else {
      video.currentTime = 0;
      video.play().catch(() => {});
    }
  }

  function startPipeline() {
    const src = video.dataset.src || video.src;
    if (!src) return;

    video.src = src;
    video.addEventListener('loadedmetadata', () => {
      video.classList.add('is-ready');
      video.play().catch(() => {});
      if (hasVFC) {
        video.requestVideoFrameCallback(vfcLoop);
      } else {
        rafId = requestAnimationFrame(rafLoop);
      }
    }, { once: true });

    video.addEventListener('timeupdate', () => {
      if (capturing && video.duration && video.currentTime >= video.duration - 0.1) {
        onEnded();
      }
    });

    video.addEventListener('ended', onEnded, { once: true });
    video.load();
  }

  if (document.readyState === 'complete') {
    startPipeline();
  } else {
    window.addEventListener('load', startPipeline);
  }
})();
