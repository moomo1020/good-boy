(function () {
  var SITE_ORIGIN = 'https://moomo1020.github.io';

  function pageOrigin() {
    if (window.location.protocol === 'https:' || window.location.protocol === 'http:') {
      return window.location.origin;
    }
    return SITE_ORIGIN;
  }

  function isLocalFile() {
    return window.location.protocol === 'file:';
  }

  function buildEmbedUrl(videoId, autoplay) {
    var params = new URLSearchParams({
      rel: '0',
      modestbranding: '1',
      playsinline: '1',
      enablejsapi: '1',
      origin: pageOrigin()
    });
    if (autoplay) {
      params.set('autoplay', '1');
    }
    return 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(videoId) + '?' + params.toString();
  }

  function applyIframe(el, autoplay) {
    var id = el.getAttribute('data-youtube-id');
    if (!id) {
      return;
    }
    el.src = buildEmbedUrl(id, autoplay);
    el.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
    el.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen');
    el.setAttribute('allowfullscreen', '');
  }

  function showLocalFileNotice() {
    if (!isLocalFile() || document.getElementById('local-file-notice')) {
      return;
    }
    var box = document.createElement('div');
    box.id = 'local-file-notice';
    box.style.cssText = 'position:fixed;left:0;right:0;top:0;z-index:9999;background:#c0392b;color:#fff;padding:12px 20px;text-align:center;font:14px/1.6 "Noto Sans TC",sans-serif;';
    box.innerHTML = '目前以本機檔案開啟，YouTube 可能無法播放。請雙擊「啟動本機預覽.bat」後，用 <strong>http://localhost:8080</strong> 開啟網站。';
    document.body.insertBefore(box, document.body.firstChild);
  }

  function embedVideos(root, autoplay) {
    (root || document).querySelectorAll('[data-youtube-id]').forEach(function (el) {
      applyIframe(el, autoplay);
    });
  }

  window.buildYoutubeEmbedUrl = buildEmbedUrl;
  window.initYoutubeEmbeds = embedVideos;

  showLocalFileNotice();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      embedVideos(document, false);
    });
  } else {
    embedVideos(document, false);
  }
})();