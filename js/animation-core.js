function initAnimationPlayer(config) {
  var state = {
    currentScene: 0,
    isPlaying: false,
    autoPlayInterval: null,
    config: config
  };

  var TOTAL = config.totalScenes;
  var data = config.sceneData;
  var active = config.activeTagClass || ['text-orange-600', 'dark:text-orange-400'];
  var inactive = config.inactiveTagClass || ['text-inkMuted', 'dark:text-gray-400'];

  var el = {
    counter: document.getElementById('scene-counter'),
    title: document.getElementById('scene-title'),
    subtitle: document.getElementById('scene-subtitle'),
    progress: document.getElementById('timeline-progress'),
    playBtn: document.getElementById('play-btn'),
    playIcon: document.getElementById('play-icon'),
    prevBtn: document.getElementById('prev-btn'),
    nextBtn: document.getElementById('next-btn'),
    fullscreenBtn: document.getElementById('fullscreen-btn'),
    canvas: document.getElementById('fullscreen-canvas'),
    timelineBar: document.getElementById('timeline-bar'),
    tags: document.querySelectorAll('#scene-tags button')
  };

  function showScene(sceneIndex) {
    if (sceneIndex < 1 || sceneIndex > TOTAL) return;
    if (state.currentScene === sceneIndex) return;

    for (var i = 1; i <= TOTAL; i++) {
      var vis = document.getElementById('vis-scene-' + i);
      if (vis) vis.style.opacity = '';
    }

    for (var i = 1; i <= TOTAL; i++) {
      var vis = document.getElementById('vis-scene-' + i);
      if (vis) {
        vis.classList.add('opacity-0', 'pointer-events-none');
        if (i === 2 && config.scene2HideClass) vis.classList.add(config.scene2HideClass);
      }
    }

    state.currentScene = sceneIndex;

    var percent = ((sceneIndex - 1) / (TOTAL - 1)) * 100;
    el.progress.style.width = percent + '%';

    el.tags.forEach(function (tag) {
      var isTarget = parseInt(tag.dataset.target) === sceneIndex;
      if (isTarget) {
        tag.classList.remove.apply(tag.classList, inactive);
        tag.classList.add.apply(tag.classList, active);
      } else {
        tag.classList.remove.apply(tag.classList, active);
        tag.classList.add.apply(tag.classList, inactive);
      }
      if (tag.getAttribute('role') === 'tab') {
        tag.setAttribute('aria-selected', isTarget ? 'true' : 'false');
      }
    });

    el.title.style.transition = 'none';
    el.subtitle.style.transition = 'none';
    el.title.style.opacity = '0';
    el.title.style.transform = 'translateY(8px)';
    el.subtitle.style.opacity = '0';
    el.subtitle.style.transform = 'translateY(8px)';
    void el.title.offsetHeight;
    el.title.style.transition = '';
    el.subtitle.style.transition = '';

    setTimeout(function () {
      el.counter.textContent = data[sceneIndex - 1].label;
      el.title.textContent = data[sceneIndex - 1].title;
      el.subtitle.textContent = data[sceneIndex - 1].subtitle;

      el.title.style.opacity = '1';
      el.title.style.transform = 'translateY(0)';
      el.subtitle.style.opacity = '1';
      el.subtitle.style.transform = 'translateY(0)';
    }, 300);

    var activeVis = document.getElementById('vis-scene-' + sceneIndex);
    if (activeVis) {
      activeVis.classList.remove('opacity-0', 'pointer-events-none');
      if (sceneIndex === 2 && config.scene2HideClass) activeVis.classList.remove(config.scene2HideClass);
    }

    if (config.onSceneAnimation) {
      config.onSceneAnimation(sceneIndex, state);
    }
  }

  function startAutoPlay() {
    state.isPlaying = true;
    el.playIcon.textContent = 'pause';
    state.autoPlayInterval = setInterval(function () {
      if (state.currentScene < TOTAL) {
        showScene(state.currentScene + 1);
      } else {
        showScene(1);
      }
    }, config.autoPlayMs || 8000);
  }

  function stopAutoPlay() {
    state.isPlaying = false;
    el.playIcon.textContent = 'play_arrow';
    clearInterval(state.autoPlayInterval);
  }

  el.playBtn.addEventListener('click', function () {
    if (state.isPlaying) stopAutoPlay(); else startAutoPlay();
  });

  el.prevBtn.addEventListener('click', function () {
    stopAutoPlay();
    if (state.currentScene > 1) showScene(state.currentScene - 1);
  });

  el.nextBtn.addEventListener('click', function () {
    stopAutoPlay();
    if (state.currentScene < TOTAL) showScene(state.currentScene + 1);
  });

  el.tags.forEach(function (tag) {
    tag.addEventListener('click', function () {
      stopAutoPlay();
      showScene(parseInt(tag.dataset.target));
    });
  });

  el.timelineBar.addEventListener('click', function (e) {
    stopAutoPlay();
    var rect = e.currentTarget.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var pct = x / rect.width;
    var target = Math.min(TOTAL, Math.max(1, Math.round(pct * (TOTAL - 1)) + 1));
    showScene(target);
  });

  if (el.fullscreenBtn && el.canvas) {
    el.fullscreenBtn.addEventListener('click', function () {
      if (!document.fullscreenElement) {
        el.canvas.requestFullscreen()['catch'](function (err) {
          console.error('Fullscreen error:', err);
        });
      } else {
        document.exitFullscreen();
      }
    });
  }

  document.addEventListener('fullscreenchange', function () {
    var icon = el.fullscreenBtn ? el.fullscreenBtn.querySelector('span') : null;
    if (icon) {
      icon.textContent = document.fullscreenElement ? 'fullscreen_exit' : 'fullscreen';
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      stopAutoPlay();
      if (state.currentScene > 1) showScene(state.currentScene - 1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      stopAutoPlay();
      if (state.currentScene < TOTAL) showScene(state.currentScene + 1);
    } else if (e.key === ' ') {
      e.preventDefault();
      if (state.isPlaying) stopAutoPlay(); else startAutoPlay();
    }
  });

  if (window.self !== window.top) {
    var header = document.querySelector('header');
    var footer = document.querySelector('footer');
    var counterParent = document.getElementById('scene-counter');
    if (header) header.classList.add('hidden');
    if (footer) footer.classList.add('hidden');
    if (counterParent) counterParent.parentElement.classList.add('hidden');
    document.body.classList.remove('justify-between');
    document.body.classList.add('justify-center', 'p-0', 'overflow-hidden');
    var main = document.querySelector('main');
    if (main) {
      main.classList.remove('md:py-16', 'py-8', 'px-6');
      main.classList.add('py-0', 'px-2', 'max-w-full');
    }
    var tl = document.querySelector('main > div:last-child');
    if (tl) {
      tl.classList.remove('mt-8');
      tl.classList.add('mt-3');
    }
  }

  showScene(1);

  return {
    showScene: showScene,
    startAutoPlay: startAutoPlay,
    stopAutoPlay: stopAutoPlay,
    get currentScene() { return state.currentScene; },
    get isPlaying() { return state.isPlaying; }
  };
}
