(function () {
  'use strict';

  /* ========== 常量与状态 ========== */
  var STORE_KEY = 'iptv_client_playlist';
  var THUMB_KEY = 'iptv_client_thumbs';
  var STAMP_KEY = 'iptv_client_thumbstamp';
  var PREVIEW_KEY = 'iptv_client_preview';
  var GROUP_ORDER = ['央视', '卫视', '少儿', '影视', '体育', '新闻', '纪录', '地方', '超高清', '其他'];
  /* ========== 解码库按需懒加载（首屏不加载 665KB 库，点播放/预览时才取） ========== */
  var VENDOR = 'js/vendor/';
  var libCache = {};
  function loadLib(globalName, file) {
    if (window[globalName]) return Promise.resolve(window[globalName]);
    if (window.__EMBEDDED_LIBS__) return Promise.resolve(window[globalName]);
    if (libCache[file]) return libCache[file];
    libCache[file] = new Promise(function (resolve, reject) {
      var s = document.createElement('script');
      s.src = VENDOR + file;
      s.onload = function () {
        if (window[globalName]) resolve(window[globalName]);
        else reject(new Error(file + ' 已加载但未注册全局 ' + globalName));
      };
      s.onerror = function () { reject(new Error('加载失败: ' + VENDOR + file)); };
      document.head.appendChild(s);
    });
    return libCache[file];
  }

  /* ========== 解码库按需懒加载（首屏不加载 665KB 库，点播放/预览时才取） ========== */
  var VENDOR = 'js/vendor/';
  var libCache = {};
  function loadLib(globalName, file) {
    if (window[globalName]) return Promise.resolve(window[globalName]);
    if (window.__EMBEDDED_LIBS__) return Promise.resolve(window[globalName]);
    if (libCache[file]) return libCache[file];
    libCache[file] = new Promise(function (resolve, reject) {
      var s = document.createElement('script');
      s.src = VENDOR + file;
      s.onload = function () {
        if (window[globalName]) resolve(window[globalName]);
        else reject(new Error(file + ' 已加载但未注册全局 ' + globalName));
      };
      s.onerror = function () { reject(new Error('加载失败: ' + VENDOR + file)); };
      document.head.appendChild(s);
    });
    return libCache[file];
  }

  var BUILTIN = {
    name: '家庭 IPTV 订阅源',
    url: 'http://192.168.100.1/iptv.m3u',
    webPath: '/iptv.m3u',
    text: (function(){return "#EXTM3U\n#EXTINF:-1,CCTV1HD\nhttp://192.168.100.1:4022/udp/239.49.8.19:9614\n#EXTINF:-1,CCTV2HD\nhttp://192.168.100.1:4022/udp/239.49.8.50:9802\n#EXTINF:-1,CCTV3HD\nhttp://192.168.100.1:4022/udp/239.49.8.74:8000\n#EXTINF:-1,CCTV4HD\nhttp://192.168.100.1:4022/udp/239.49.8.51:9806\n#EXTINF:-1,CCTV5HD\nhttp://192.168.100.1:4022/udp/239.49.8.75:8000\n#EXTINF:-1,CCTV5+(体育)\nhttp://192.168.100.1:4022/udp/239.49.8.18:9610\n#EXTINF:-1,CCTV6HD\nhttp://192.168.100.1:4022/udp/239.49.8.76:8000\n#EXTINF:-1,CCTV7\nhttp://192.168.100.1:4022/udp/239.49.8.126:8000\n#EXTINF:-1,CCTV8HD\nhttp://192.168.100.1:4022/udp/239.49.8.77:8000\n#EXTINF:-1,CCTV9HD\nhttp://192.168.100.1:4022/udp/239.49.8.53:9814\n#EXTINF:-1,CCTV10HD\nhttp://192.168.100.1:4022/udp/239.49.8.54:9818\n#EXTINF:-1,CCTV11HD\nhttp://192.168.100.1:4022/udp/239.49.0.127:8000\n#EXTINF:-1,CCTV12HD\nhttp://192.168.100.1:4022/udp/239.49.8.55:9822\n#EXTINF:-1,CCTV13HD\nhttp://192.168.100.1:4022/udp/239.49.8.109:8000\n#EXTINF:-1,CCTV14HD\nhttp://192.168.100.1:4022/udp/239.49.8.56:9826\n#EXTINF:-1,CCTV15HD\nhttp://192.168.100.1:4022/udp/239.49.0.128:8000\n#EXTINF:-1,CCTV16奥林匹克4K\nhttp://192.168.100.1:4022/udp/239.49.0.109:8000\n#EXTINF:-1,CCTV17HD\nhttp://192.168.100.1:4022/udp/239.49.8.52:9810\n#EXTINF:-1,CGTN法语频道\nhttp://192.168.100.1:4022/udp/239.49.1.31:8000\n#EXTINF:-1,CGTN西班牙语频道\nhttp://192.168.100.1:4022/udp/239.49.1.30:8000\n#EXTINF:-1,CGTN俄语频道\nhttp://192.168.100.1:4022/udp/239.49.0.111:8000\n#EXTINF:-1,江苏卫视HD\nhttp://192.168.100.1:4022/udp/239.49.8.16:9602\n#EXTINF:-1,江苏国际\nhttp://192.168.100.1:4022/udp/239.49.1.81:8000\n#EXTINF:-1,江苏城市HD\nhttp://192.168.100.1:4022/udp/239.49.8.107:8000\n#EXTINF:-1,江苏综艺HD\nhttp://192.168.100.1:4022/udp/239.49.8.108:8000\n#EXTINF:-1,江苏体育休闲HD\nhttp://192.168.100.1:4022/udp/239.49.8.117:8000\n#EXTINF:-1,江苏影视HD\nhttp://192.168.100.1:4022/udp/239.49.8.118:8000\n#EXTINF:-1,优漫卡通HD\nhttp://192.168.100.1:4022/udp/239.49.8.119:8000\n#EXTINF:-1,江苏公共新闻HD\nhttp://192.168.100.1:4022/udp/239.49.8.120:8000\n#EXTINF:-1,好享购物HD\nhttp://192.168.100.1:4022/udp/239.49.8.121:8000\n#EXTINF:-1,江苏教育HD\nhttp://192.168.100.1:4022/udp/239.49.8.122:8000\n#EXTINF:-1,江苏卫视4K\nhttp://192.168.100.1:4022/udp/239.49.1.61:8000\n#EXTINF:-1,浙江卫视4K\nhttp://192.168.100.1:4022/udp/239.49.1.63:8000\n#EXTINF:-1,东方卫视4K\nhttp://192.168.100.1:4022/udp/239.49.1.69:8000\n#EXTINF:-1,湖南卫视4K\nhttp://192.168.100.1:4022/udp/239.49.1.67:8000\n#EXTINF:-1,山东卫视4K\nhttp://192.168.100.1:4022/udp/239.49.1.71:8000\n#EXTINF:-1,四川卫视4K\nhttp://192.168.100.1:4022/udp/239.49.1.65:8000\n#EXTINF:-1,广东卫视4K\nhttp://192.168.100.1:4022/udp/239.49.1.24:8000\n#EXTINF:-1,深圳卫视4K\nhttp://192.168.100.1:4022/udp/239.49.1.27:8000\n#EXTINF:-1,北京卫视4K\nhttp://192.168.100.1:4022/udp/239.49.0.42:8000\n#EXTINF:-1,东方卫视HD\nhttp://192.168.100.1:4022/udp/239.49.8.17:9606\n#EXTINF:-1,浙江卫视HD\nhttp://192.168.100.1:4022/udp/239.49.8.20:9618\n#EXTINF:-1,北京卫视HD\nhttp://192.168.100.1:4022/udp/239.49.8.11:9414\n#EXTINF:-1,湖南卫视HD\nhttp://192.168.100.1:4022/udp/239.49.8.12:9418\n#EXTINF:-1,广东卫视HD\nhttp://192.168.100.1:4022/udp/239.49.8.13:9422\n#EXTINF:-1,黑龙江卫视HD\nhttp://192.168.100.1:4022/udp/239.49.8.14:9426\n#EXTINF:-1,深圳卫视HD\nhttp://192.168.100.1:4022/udp/239.49.8.15:9430\n#EXTINF:-1,山东卫视HD\nhttp://192.168.100.1:4022/udp/239.49.8.7:9306\n#EXTINF:-1,湖北卫视HD\nhttp://192.168.100.1:4022/udp/239.49.8.8:9632\n#EXTINF:-1,安徽卫视HD\nhttp://192.168.100.1:4022/udp/239.49.8.80:8000\n#EXTINF:-1,贵州卫视HD\nhttp://192.168.100.1:4022/udp/239.49.8.49:8000\n#EXTINF:-1,辽宁卫视HD\nhttp://192.168.100.1:4022/udp/239.49.8.48:8000\n#EXTINF:-1,海南卫视HD\nhttp://192.168.100.1:4022/udp/239.49.8.83:8000\n#EXTINF:-1,四川卫视HD\nhttp://192.168.100.1:4022/udp/239.49.8.110:8000\n#EXTINF:-1,东南卫视HD\nhttp://192.168.100.1:4022/udp/239.49.8.112:8000\n#EXTINF:-1,吉林卫视HD\nhttp://192.168.100.1:4022/udp/239.49.8.113:8000\n#EXTINF:-1,河北卫视HD\nhttp://192.168.100.1:4022/udp/239.49.8.114:8000\n#EXTINF:-1,天津卫视HD\nhttp://192.168.100.1:4022/udp/239.49.8.35:8620\n#EXTINF:-1,重庆卫视HD\nhttp://192.168.100.1:4022/udp/239.49.8.57:9830\n#EXTINF:-1,广西卫视HD\nhttp://192.168.100.1:4022/udp/239.49.8.10:8000\n#EXTINF:-1,河南卫视HD\nhttp://192.168.100.1:4022/udp/239.49.8.29:8000\n#EXTINF:-1,云南卫视HD\nhttp://192.168.100.1:4022/udp/239.49.0.177:8000\n#EXTINF:-1,陕西卫视HD\nhttp://192.168.100.1:4022/udp/239.49.1.74:8000\n#EXTINF:-1,新疆卫视HD\nhttp://192.168.100.1:4022/udp/239.49.1.57:8000\n#EXTINF:-1,西藏卫视HD\nhttp://192.168.100.1:4022/udp/239.49.1.56:8000\n#EXTINF:-1,宁夏卫视HD\nhttp://192.168.100.1:4022/udp/239.49.1.60:8000\n#EXTINF:-1,内蒙古卫视HD\nhttp://192.168.100.1:4022/udp/239.49.1.75:8000\n#EXTINF:-1,兵团卫视HD\nhttp://192.168.100.1:4022/udp/239.49.1.58:8000\n#EXTINF:-1,江西卫视HD\nhttp://192.168.100.1:4022/udp/239.49.8.111:8000\n#EXTINF:-1,青海卫视HD\nhttp://192.168.100.1:4022/udp/239.49.0.81:8000\n#EXTINF:-1,甘肃卫视\nhttp://192.168.100.1:4022/udp/239.49.0.172:8000\n#EXTINF:-1,金鹰纪实HD\nhttp://192.168.100.1:4022/udp/239.49.8.79:8000\n#EXTINF:-1,金鹰卡通HD\nhttp://192.168.100.1:4022/udp/239.49.8.33:8000\n#EXTINF:-1,环球购物HD\nhttp://192.168.100.1:4022/udp/239.49.8.123:8000\n#EXTINF:-1,常州都市频道\nhttp://192.168.100.1:4022/udp/239.49.1.84:8000\n#EXTINF:-1,常州生活频道\nhttp://192.168.100.1:4022/udp/239.49.1.85:8000\n#EXTINF:-1,无锡新闻综合\nhttp://192.168.100.1:4022/udp/239.49.1.77:8000\n#EXTINF:-1,无锡都市资讯\nhttp://192.168.100.1:4022/udp/239.49.1.78:8000\n#EXTINF:-1,绍兴新闻综合\nhttp://192.168.100.1:4022/udp/239.49.1.83:8000\n#EXTINF:-1,天元围棋\nhttp://192.168.100.1:4022/udp/239.49.1.79:8000\n#EXTINF:-1,四海钓鱼\nhttp://192.168.100.1:4022/udp/239.49.1.80:8000\n#EXTINF:-1,财富天下\nhttp://192.168.100.1:4022/udp/239.49.1.76:8000\n#EXTINF:-1,CETV1\nhttp://192.168.100.1:4022/udp/239.49.8.115:8000\n#EXTINF:-1,CETV4\nhttp://192.168.100.1:4022/udp/239.49.0.125:8000\n#EXTINF:-1,山东教育卫视HD\nhttp://192.168.100.1:4022/udp/239.49.0.252:8000\n#EXTINF:-1,武术世界HD\nhttp://192.168.100.1:4022/udp/239.49.0.205:8000\n#EXTINF:-1,都市剧场HD\nhttp://192.168.100.1:4022/udp/239.49.0.99:8000\n#EXTINF:-1,生活时尚HD\nhttp://192.168.100.1:4022/udp/239.49.0.97:8000\n#EXTINF:-1,快乐垂钓HD\nhttp://192.168.100.1:4022/udp/239.49.0.114:8000\n#EXTINF:-1,河南文物宝库HD\nhttp://192.168.100.1:4022/udp/239.49.0.209:8000\n#EXTINF:-1,中央新影中学生频道\nhttp://192.168.100.1:4022/udp/239.49.1.82:8000\n#EXTINF:-1,上海教育电视台\nhttp://192.168.100.1:4022/udp/239.49.1.73:8000\n#EXTINF:-1,书画频道\nhttp://192.168.100.1:4022/udp/239.49.0.123:8000\n#EXTINF:-1,法治天地\nhttp://192.168.100.1:4022/udp/239.49.0.96:8000\n#EXTINF:-1,盐城2频道\nhttp://192.168.100.1:4022/udp/239.49.0.88:8000\n#EXTINF:-1,盐城新闻综合\nhttp://192.168.100.1:4022/udp/239.49.0.158:8000\n#EXTINF:-1,南通公共·崇川\nhttp://192.168.100.1:4022/udp/239.49.0.197:8000\n#EXTINF:-1,泰州1套\nhttp://192.168.100.1:4022/udp/239.49.0.215:8000\n#EXTINF:-1,江苏新闻广播FM93.7\nhttp://192.168.100.1:4022/udp/239.49.1.86:8000\n#EXTINF:-1,江苏交通广播FM101.1\nhttp://192.168.100.1:4022/udp/239.49.1.87:8000\n#EXTINF:-1,江苏音乐广播FM89.7\nhttp://192.168.100.1:4022/udp/239.49.1.89:8000\n#EXTINF:-1,江苏经典流行FM97.5\nhttp://192.168.100.1:4022/udp/239.49.1.88:8000\n#EXTINF:-1,金陵之声FM99.7\nhttp://192.168.100.1:4022/udp/239.49.1.90:8000\n#EXTINF:-1,江苏新闻综合广播AM702\nhttp://192.168.100.1:4022/udp/239.49.1.91:8000\n#EXTINF:-1,江苏文艺广播FM91.4\nhttp://192.168.100.1:4022/udp/239.49.1.92:8000\n#EXTINF:-1,江苏故事广播FM104.9\nhttp://192.168.100.1:4022/udp/239.49.1.93:8000\n#EXTINF:-1,江苏财经广播FM95.2\nhttp://192.168.100.1:4022/udp/239.49.1.94:8000\n#EXTINF:-1,江苏健康广播FM100.5\nhttp://192.168.100.1:4022/udp/239.49.1.95:8000\n";})()
  };

  var channels = [];
  var currentGroup = '全部';
  var currentIndex = -1;
  var currentChannel = null;

  var IS_LAUNCHER = /launcher/.test(location.hash);
  var IS_FILE = location.protocol === 'file:';
  var IS_WEB = location.protocol === 'http:' || location.protocol === 'https:';

  /* 流地址同源化：B/S 部署后页面与流同站（nginx 反代 udpxy），
     把任意主机上的 /udp/ /rtp/ 路径改写为当前站点相对路径，绕开跨域限制 */
  function resolveStreamUrl(url) {
    if (!url) return url;
    var m = /^[a-zA-Z][a-zA-Z0-9+.\-]*:\/\/[^\/]+\/(udp|rtp)\/(.+)$/i.exec(url);
    if (m) return '/' + m[1] + '/' + m[2];
    return url;
  }

  /* ========== DOM ========== */
  function $(id) { return document.getElementById(id); }
  var player = $('player');
  var chList = $('chList');
  var groupBar = $('groupBar');
  var noSignal = $('noSignal');
  var playingTag = $('playingTag');
  var playingLogo = $('playingLogo');
  var playingName = $('playingName');
  var loading = $('loading');
  var infoBody = $('infoBody');
  var nowPlaying = $('nowPlaying');
  var engineBadge = $('engineBadge');
  var subtitle = $('subtitle');
  var hintBar = $('hintBar');
  var unmuteHint = $('unmuteHint');
  var pvChip = $('pvChip');
  var pvStatus = $('pvStatus');
  var pvMenu = $('pvMenu');

  /* ========== 工具 ========== */
  function toast(msg, isError) {
    var t = $('toast');
    t.textContent = msg;
    t.classList.add('show');
    t.classList.toggle('error', !!isError);
    clearTimeout(t._timer);
    t._timer = setTimeout(function () { t.classList.remove('show'); }, 3200);
  }
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function groupFromPath(url) {
    try {
      var u = new URL(url);
      var seg = u.pathname.split('/').filter(Boolean);
      var skip = { udp: 1, rtp: 1, rtsp: 1, ts: 1, m3u8: 1, hls: 1, sdp: 1, live: 1 };
      var cat = seg[0] ? String(seg[0]).toLowerCase() : '';
      if (seg.length >= 2 && !skip[cat]) return seg[0];
    } catch (e) {}
    return '';
  }
  function smartGroup(name) {
    var n = name || '';
    if (/CCTV|CGTN|中央/.test(n)) return '央视';
    if (/卫视/.test(n)) return '卫视';
    if (/少儿|卡通|动漫/.test(n)) return '少儿';
    if (/电影|影视|CHC/.test(n)) return '影视';
    if (/体育/.test(n)) return '体育';
    if (/新闻|资讯/.test(n)) return '新闻';
    if (/纪录|DOC/.test(n)) return '纪录';
    if (/4K|超清|UHD/.test(n)) return '超高清';
    return '其他';
  }
  function decorateGroup(c) {
    if (c.group && c.group !== '未分组') return;
    c.group = groupFromPath(c.url) || smartGroup(c.name) || '其他';
  }

  /* ========== 画面缩略图（截帧） ========== */
  var thumbs = {};
  var thumbStamp = {};
  var failMarks = {};
  var snapCanvas = null;
  var snapTimer = null;
  var snapFailNotified = false;

  var PREVIEW = { on: true, intervalSec: 90 };
  try {
    var savedPv = JSON.parse(localStorage.getItem(PREVIEW_KEY));
    if (savedPv && savedPv.intervalSec) {
      PREVIEW.on = savedPv.on !== false;
      PREVIEW.intervalSec = parseInt(savedPv.intervalSec, 10) || 90;
    }
  } catch (e) {}

  function loadThumbs() {
    try { thumbs = JSON.parse(localStorage.getItem(THUMB_KEY)) || {}; } catch (e) { thumbs = {}; }
    try { thumbStamp = JSON.parse(localStorage.getItem(STAMP_KEY)) || {}; } catch (e) { thumbStamp = {}; }
  }
  function persistThumbs() {
    try { localStorage.setItem(THUMB_KEY, JSON.stringify(thumbs)); } catch (e) {
      var keys = Object.keys(thumbs);
      keys.slice(0, Math.ceil(keys.length / 2)).forEach(function (k) { delete thumbs[k]; delete thumbStamp[k]; });
      try { localStorage.setItem(THUMB_KEY, JSON.stringify(thumbs)); } catch (e2) {}
    }
    try { localStorage.setItem(STAMP_KEY, JSON.stringify(thumbStamp)); } catch (e) {}
  }
  function savePreviewCfg() {
    try { localStorage.setItem(PREVIEW_KEY, JSON.stringify(PREVIEW)); } catch (e) {}
  }
  function snapFrame(videoEl, width) {
    if (!videoEl || !videoEl.videoWidth) return null;
    var w = width || 224;
    var h = Math.max(1, Math.round(w * videoEl.videoHeight / videoEl.videoWidth));
    try {
      if (!snapCanvas) snapCanvas = document.createElement('canvas');
      snapCanvas.width = w; snapCanvas.height = h;
      var ctx = snapCanvas.getContext('2d');
      ctx.drawImage(videoEl, 0, 0, w, h);
      return snapCanvas.toDataURL('image/jpeg', 0.55);
    } catch (e) { return null; }
  }
  function updThumbUI(img) {
    var v = infoBody.querySelector('#liveThumbImg');
    var ph = infoBody.querySelector('#thumbPh');
    if (!v) return;
    if (img) {
      v.src = img; v.style.display = 'block';
      if (ph) ph.style.display = 'none';
    } else {
      v.style.display = 'none';
      if (ph) ph.style.display = 'flex';
    }
  }
  function doSnap(auto) {
    if (!currentChannel) {
      if (!auto) toast('当前没有正在播放的频道', true);
      return;
    }
    var img = snapFrame(player, 272);
    if (!img) {
      updThumbUI(null);
      if (!auto && !snapFailNotified) {
        snapFailNotified = true;
        toast('画面截取被浏览器安全策略拦截，无法生成缩略图', true);
      }
      return;
    }
    snapFailNotified = false;
    thumbs[currentChannel.name] = img;
    thumbStamp[currentChannel.name] = Date.now();
    delete failMarks[currentChannel.name];
    persistThumbs();
    updThumbUI(img);
    renderList();
    if (!auto) toast('已刷新画面缩略图');
  }
  function scheduleFirstSnap() {
    if (snapTimer) return;
    snapTimer = setTimeout(function () {
      snapTimer = null;
      doSnap(true);
    }, 900);
  }
  function saveSnapshot() {
    if (!player.videoWidth) { toast('当前没有可保存的画面', true); return; }
    try {
      var c = document.createElement('canvas');
      c.width = player.videoWidth; c.height = player.videoHeight;
      c.getContext('2d').drawImage(player, 0, 0, c.width, c.height);
      c.toBlob(function (blob) {
        if (!blob) { toast('截图失败', true); return; }
        var a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        function pad(x) { return (x < 10 ? '0' : '') + x; }
        var d = new Date();
        var safe = (currentChannel ? currentChannel.name : 'IPTV').replace(/[\\\/?%*:|"<>]/g, '_');
        a.download = safe + '_' + d.getFullYear() + pad(d.getMonth() + 1) + pad(d.getDate()) + '_' + pad(d.getHours()) + pad(d.getMinutes()) + pad(d.getSeconds()) + '.png';
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
          URL.revokeObjectURL(a.href);
          if (a.parentNode) a.parentNode.removeChild(a);
        }, 1500);
        toast('截图已保存（见下载文件夹）');
      }, 'image/png');
    } catch (e) {
      toast('截图被浏览器安全策略拦截', true);
    }
  }

  /* ========== 后台低频预览：轮流为列表频道截取画面 ========== */
  var pv = { busy: false, vid: null, mp: null, hls: null, kick: null, failStreak: 0 };

  /* 状态分类统计：待轮到=从没试过或已到重试时间；待重试=失败冷却中；预览受限=连续多次失败（多半是并发/权限问题） */
  function pvCounts() {
    var now = Date.now();
    var r = { missing: 0, waiting: 0, blocked: 0 };
    for (var i = 0; i < channels.length; i++) {
      var c = channels[i];
      if (classifyUrl(c.url) === 'external') continue;
      if (thumbs[c.name]) continue;
      var fm = failMarks[c.name];
      if (fm && fm.count >= 3) { r.blocked++; continue; }
      if (fm && fm.until > now) r.waiting++;
      else r.missing++;
    }
    return r;
  }
  /* 首轮补全加速：缺画面台占比高时用短间隔，画面基本齐后回用户设定 */
  function effIntervalSec() {
    var cnt = pvCounts();
    var absent = cnt.missing + cnt.waiting;
    if (channels.length > 6 && absent > channels.length * 0.3) return Math.min(PREVIEW.intervalSec, 45);
    return PREVIEW.intervalSec;
  }
  function updatePvStatus(msg) {
    if (!pvStatus) return;
    var cnt = pvCounts();
    var base = '';
    if (channels.length) {
      var parts = [];
      if (cnt.missing > 0) parts.push('待轮到 ' + cnt.missing + ' 台');
      if (cnt.waiting > 0) parts.push(cnt.waiting + ' 台待重试');
      if (cnt.blocked > 0) parts.push(cnt.blocked + ' 台预览受限');
      base = parts.length ? parts.join(' · ') : '画面齐全';
    }
    pvStatus.textContent = msg ? (msg + (base ? ' · ' + base : '')) : base;
    pvStatus.title = '预览每轮只试 1 个台；同一台被拉流拒绝（如 udpxy 并发上限）会延迟重试；家人同时在看的台多了，预览会暂时受限';

    if (pvChip) {
      pvChip.classList.toggle('on', PREVIEW.on);
      if (!PREVIEW.on) {
        pvChip.textContent = '⏸ 预览已关闭';
      } else {
        var eff = effIntervalSec();
        var txt = (eff >= 60 ? (eff / 60) + '分钟' : eff + '秒');
        pvChip.textContent = '⚡ 预览 · ' + txt + (eff < PREVIEW.intervalSec ? '（补全中）' : '');
      }
    }
  }
  function pickPreviewTarget() {
    var now = Date.now();
    var noThumb = null, oldest = null, oldestT = Infinity;
    for (var i = 0; i < channels.length; i++) {
      var c = channels[i];
      if (currentChannel === c) continue;
      if (classifyUrl(c.url) === 'external') continue;
      var fm = failMarks[c.name];
      if (fm && fm.until > now) continue;
      if (!thumbs[c.name]) { noThumb = c; break; }
      var t = thumbStamp[c.name] || 0;
      if (t < oldestT) { oldestT = t; oldest = c; }
    }
    return noThumb || oldest;
  }
  function stopPreviewHard() {
    if (pv.mp) { try { pv.mp.unload(); pv.mp.detachMediaElement(); pv.mp.destroy(); } catch (e) {} pv.mp = null; }
    if (pv.hls) { try { pv.hls.destroy(); } catch (e) {} pv.hls = null; }
    if (pv.vid) {
      try { pv.vid.pause(); pv.vid.removeAttribute('src'); pv.vid.load(); } catch (e) {}
      pv.vid = null;
    }
    pv.busy = false;
  }

  function previewProbe(c, done) {
    if (pv.busy) { if (done) done(false); return; }
    if (!c._stream) c._stream = resolveStreamUrl(c.url);
    var kind0 = classifyUrl(c._stream);
    if (kind0 === 'external') { done(false); return; }
    pv.busy = true;
    var libGlobal = kind0 === 'ts' ? 'mpegts' : (kind0 === 'hls' ? 'Hls' : null);
    var libFile = kind0 === 'ts' ? 'mpegts.min.js' : (kind0 === 'hls' ? 'hls.light.min.js' : null);
    var preload = libGlobal ? loadLib(libGlobal, libFile) : Promise.resolve();
    preload.then(function () {
      previewProbeNow(c, done);
    }).catch(function () {
      var fm = failMarks[c.name] || (failMarks[c.name] = { count: 0, until: 0 });
      fm.count++;
      fm.until = Date.now() + 5 * 60e3;
      pv.busy = false;
      if (done) done(false);
    });
  }

  function previewProbeNow(c, done) {
    var kind = classifyUrl(c._stream);
    var vid = document.createElement('video');
    vid.muted = true;
    vid.playsInline = true;
    pv.vid = vid;
    var finished = false;
    var tHold = null, tStop = null;

    function finalize(attemptStore) {
      if (finished) return;
      finished = true;
      clearTimeout(tHold); clearTimeout(tStop);
      var ok = false;
      if (attemptStore) {
        var img = snapFrame(vid, 240);
        if (img) {
          thumbs[c.name] = img;
          thumbStamp[c.name] = Date.now();
          persistThumbs();
          renderList();
          ok = true;
        }
      }
      if (!ok) {
        var fm = failMarks[c.name] || (failMarks[c.name] = { count: 0, until: 0 });
        fm.count++;
        /* 连续失败多次→长时间冷却（多半是流不存在/拉不到），不再经常打搅 */
        fm.until = Date.now() + (fm.count >= 3 ? 6 * 3600e3 : 20 * 60e3);
      } else {
        delete failMarks[c.name];
      }
      stopPreviewHard();
      if (done) done(ok);
    }

    try {
      if (kind === 'ts') {
        var isStatic = /\.ts(\?|$)/i.test(c._stream) && !/(udp|rtp)\//i.test(c._stream);
        pv.mp = mpegts.createPlayer(
          { type: 'mpegts', isLive: !isStatic, url: c._stream },
          { enableStashBuffer: false, stashInitialSize: 384, liveBufferLatencyChasing: !isStatic }
        );
        pv.mp.attachMediaElement(vid);
        pv.mp.on(mpegts.Events.ERROR, function () { finalize(false); });
        pv.mp.load();
      } else if (kind === 'hls') {
        pv.hls = new Hls({ liveDurationInfinity: true });
        pv.hls.attachMedia(vid);
        pv.hls.loadSource(c._stream);
        pv.hls.on(Hls.Events.ERROR, function (e, d) { if (d && d.fatal) finalize(false); });
      } else {
        vid.src = c._stream;
        vid.load();
      }
      var p = vid.play();
      if (p && p.catch) p.catch(function () {});
    } catch (e) {
      finalize(false);
      return;
    }

    vid.addEventListener('playing', function () {
      tHold = setTimeout(function () { finalize(true); }, 1400);
    });
    tStop = setTimeout(function () { finalize(vid.videoWidth > 0); }, 9000);
  }

  function previewTick() {
    if (!PREVIEW.on || pv.busy || !channels.length) { scheduleNext(); return; }
    if (document.hidden) { scheduleNext(); return; }
    var c = pickPreviewTarget();
    if (!c) { updatePvStatus('全部频道已有画面'); scheduleNext(); return; }
    updatePvStatus('预览中：' + c.name);
    previewProbe(c, function (ok) {
      if (ok) {
        pv.failStreak = 0;
        updatePvStatus('已更新：' + c.name);
      } else {
        pv.failStreak++;
        updatePvStatus('跳过：' + c.name + '（连败 ' + pv.failStreak + '）');
        /* 双击直开（非启动器）时跨域拉流必败：连败 3 次自动暂停，别后台空转 */
        if (pv.failStreak >= 3 && IS_FILE && !IS_LAUNCHER) {
          PREVIEW.on = false;
          savePreviewCfg();
          if (pv.kick) { clearTimeout(pv.kick); pv.kick = null; }
          updatePvStatus('自动预览已暂停');
          toast('直开模式下无法后台拉流（跨域限制），预览已暂停；请用「IPTV播放器.bat」打开', true);
          return;
        }
      }
      scheduleNext();
    });
  }

  function scheduleNext() {
    if (pv.kick) { clearTimeout(pv.kick); pv.kick = null; }
    if (!PREVIEW.on || !channels.length) return;
    pv.kick = setTimeout(function () {
      pv.kick = null;
      previewTick();
    }, effIntervalSec() * 1000);
  }

  function restartPreviewLoop() {
    if (pv.kick) { clearTimeout(pv.kick); pv.kick = null; }
    updatePvStatus('');
    if (!PREVIEW.on || !channels.length) return;
    pv.kick = setTimeout(function () { pv.kick = null; previewTick(); }, 3500);
  }

  document.addEventListener('visibilitychange', function () {
    if (!document.hidden && PREVIEW.on && !pv.busy) {
      updatePvStatus('');
      previewTick();
    }
  });

  /* 预览设置菜单 */
  function syncPvMenu() {
    var sw = pvMenu.querySelector('#pvToggle');
    sw.classList.toggle('on', PREVIEW.on);
    var btns = pvMenu.querySelectorAll('#pvOpts button');
    for (var i = 0; i < btns.length; i++) {
      btns[i].classList.toggle('on', parseInt(btns[i].getAttribute('data-v'), 10) === PREVIEW.intervalSec);
    }
  }
  function closePvMenu() { pvMenu.classList.remove('show'); }
  pvChip.addEventListener('click', function (e) {
    e.stopPropagation();
    syncPvMenu();
    var r = pvChip.getBoundingClientRect();
    pvMenu.style.left = Math.max(8, Math.min(r.left, window.innerWidth - 290)) + 'px';
    pvMenu.style.bottom = (window.innerHeight - r.top + 8) + 'px';
    pvMenu.style.top = 'auto';
    pvMenu.classList.toggle('show');
  });
  pvMenu.addEventListener('click', function (e) { e.stopPropagation(); });
  pvMenu.querySelector('#pvClose').addEventListener('click', closePvMenu);
  document.addEventListener('click', function (e) {
    if (pvMenu.classList.contains('show') && e.target !== pvChip) closePvMenu();
  });
  pvMenu.querySelector('#pvToggle').addEventListener('click', function () {
    PREVIEW.on = !PREVIEW.on;
    savePreviewCfg();
    syncPvMenu();
    if (!PREVIEW.on) {
      if (pv.kick) { clearTimeout(pv.kick); pv.kick = null; }
      stopPreviewHard();
      updatePvStatus('已暂停自动预览');
    } else {
      updatePvStatus('已开启自动预览');
      restartPreviewLoop();
    }
    toast(PREVIEW.on ? '后台画面预览已开启' : '后台画面预览已暂停');
  });
  var pvOptBtns = pvMenu.querySelectorAll('#pvOpts button');
  for (var oi = 0; oi < pvOptBtns.length; oi++) {
    (function (btn) {
      btn.addEventListener('click', function () {
        PREVIEW.intervalSec = parseInt(btn.getAttribute('data-v'), 10);
        savePreviewCfg();
        syncPvMenu();
        updatePvStatus('');
        restartPreviewLoop();
        var eff = effIntervalSec();
        toast('预览间隔已设为 ' + (PREVIEW.intervalSec >= 60 ? (PREVIEW.intervalSec / 60) + ' 分钟' : PREVIEW.intervalSec + ' 秒') + (eff < PREVIEW.intervalSec ? '（当前补全期实际 ' + eff + ' 秒）' : ''));
      });
    })(pvOptBtns[oi]);
  }

  /* ========== M3U 解析 ========== */
  function isUrlStr(s) {
    s = (s || '').trim();
    return /^(https?|rtsp|rtmp|udp|mms|file):\/\//i.test(s) || /^\/\//.test(s);
  }
  function nextNonEmpty(lines, i) {
    while (i < lines.length && lines[i].trim() === '') i++;
    return i;
  }
  function parseM3U(text) {
    var lines = text.split(/\r?\n/);
    var list = [];
    var i = 0;
    while (i < lines.length) {
      var line = lines[i].trim();
      if (line === '') { i++; continue; }
      if (/^#EXTINF/i.test(line)) {
        var infoLine = line;
        var name = '';
        var comma = infoLine.indexOf(',');
        var afterComma = comma >= 0 ? infoLine.substring(comma + 1).trim() : '';

        var attrs = {};
        var attrRe = /([\w-]+)="([^"]*)"/g;
        var m;
        while ((m = attrRe.exec(infoLine)) !== null) attrs[m[1].toLowerCase()] = m[2];

        i = nextNonEmpty(lines, i + 1);
        var url = '';
        if (i < lines.length) {
          var n = lines[i].trim();
          if (n && !/^#/.test(n) && !isUrlStr(n)) {
            name = n;
            i = nextNonEmpty(lines, i + 1);
          }
          if (i < lines.length) {
            var u = lines[i].trim();
            if (u && !/^#/.test(u)) { url = u; i++; }
          }
        }
        if (!name && afterComma && !isUrlStr(afterComma)) name = afterComma;

        var group = attrs['group-title'] || '';
        if (!group) group = groupFromPath(url);
        if (!group) group = smartGroup(name);

        list.push({
          name: name || ('频道 ' + (list.length + 1)),
          logo: attrs['tvg-logo'] || '',
          group: group,
          tvgId: attrs['tvg-id'] || '',
          tvgName: attrs['tvg-name'] || '',
          tvgLang: attrs['tvg-language'] || '',
          tvgCountry: attrs['tvg-country'] || '',
          catchup: attrs['catchup'] || '',
          shift: attrs['shift'] || '',
          url: url
        });
      } else {
        i++;
      }
    }
    return list;
  }

  /* ========== 分组渲染 ========== */
  function groupsMap() {
    var g = {};
    channels.forEach(function (c) { g[c.group] = (g[c.group] || 0) + 1; });
    return g;
  }
  function groupSort(a, b) {
    var ia = GROUP_ORDER.indexOf(a);
    var ib = GROUP_ORDER.indexOf(b);
    if (ia === -1) ia = 999;
    if (ib === -1) ib = 999;
    if (ia !== ib) return ia - ib;
    return a.localeCompare(b, 'zh');
  }
  function renderGroups() {
    var g = groupsMap();
    var keys = Object.keys(g).sort(groupSort);
    var html = '<span class="group-chip' + (currentGroup === '全部' ? ' active' : '') + '" data-g="全部">全部<span class="cnt">' + channels.length + '</span></span>';
    keys.forEach(function (k) {
      html += '<span class="group-chip' + (currentGroup === k ? ' active' : '') + '" data-g="' + esc(k) + '">' + esc(k) + '<span class="cnt">' + g[k] + '</span></span>';
    });
    groupBar.innerHTML = html;
  }

  function filteredChannels() {
    var kw = $('searchInput').value.trim().toLowerCase();
    return channels.filter(function (c) {
      if (currentGroup !== '全部' && c.group !== currentGroup) return false;
      if (kw && c.name.toLowerCase().indexOf(kw) === -1) return false;
      return true;
    });
  }

  function renderList() {
    var list = filteredChannels();
    if (list.length === 0) {
      chList.innerHTML = '<div class="empty"><div class="big">&#128251;</div>' + (channels.length ? '没有匹配的频道' : '尚未加载频道清单') + '</div>';
      return;
    }
    var html = '';
    list.forEach(function (c, idx) {
      var isActive = (currentChannel === c);
      var thumb = thumbs[c.name];
      var fm = failMarks[c.name];
      var fmDead = !!(fm && fm.count >= 3);
      var fmWait = !fmDead && !!(fm && fm.until > Date.now());
      var visual;
      if (thumb) visual = '<img class="snap" src="' + thumb + '" alt="">';
      else if (c.logo) visual = '<img class="logo" src="' + esc(c.logo) + '" alt="">';
      else visual = '<span>&#128250;</span>';
      html += '<div class="ch-item' + (isActive ? ' active' : '') + '" data-idx="' + idx + '">'
        + '<div class="ch-logo">' + visual + '<span class="live-dot-mini' + (isActive ? ' on' : '') + '"></span></div>'
        + '<div class="ch-info">'
        + '<div class="ch-name">' + esc(c.name) + '</div>'
        + '<div class="ch-meta">' + esc(c.group)
        + (fmDead ? ' · 预览受限' : fmWait ? ' · 待重试' : thumb ? ' · 有画面' : '')
        + '</div>'
        + '</div>'
        + '<span class="ch-play">&#9654;</span>'
        + '</div>';
    });
    chList.innerHTML = html;
    var imgs = chList.querySelectorAll('.ch-logo img');
    for (var k = 0; k < imgs.length; k++) {
      imgs[k].onerror = function () { this.style.display = 'none'; };
    }
    var items = chList.querySelectorAll('.ch-item');
    for (var j = 0; j < items.length; j++) {
      (function (el) {
        el.addEventListener('click', function () {
          var real = filteredChannels()[parseInt(el.getAttribute('data-idx'), 10)];
          var gi = channels.indexOf(real);
          if (gi >= 0) playChannel(channels[gi]);
        });
      })(items[j]);
    }
  }

  /* ========== 播放引擎 ========== */
  var engine = { type: 'none', mp: null, hls: null };
  var failTimer = null;
  var mediaInfo = null;
  var mpegtsTried = false;

  function clearFailTimer() {
    if (failTimer) { clearTimeout(failTimer); failTimer = null; }
  }
  function setEngineBadge(txt) {
    if (!txt) { engineBadge.style.display = 'none'; return; }
    engineBadge.style.display = 'inline-block';
    engineBadge.textContent = txt;
  }

  function stopEngine() {
    clearFailTimer();
    if (snapTimer) { clearTimeout(snapTimer); snapTimer = null; }
    snapFailNotified = false;
    if (engine.mp) {
      try { engine.mp.pause(); } catch (e) {}
      try { engine.mp.unload(); } catch (e) {}
      try { engine.mp.detachMediaElement(); } catch (e) {}
      try { engine.mp.destroy(); } catch (e) {}
      engine.mp = null;
    }
    if (engine.hls) {
      try { engine.hls.destroy(); } catch (e) {}
      engine.hls = null;
    }
    engine.type = 'none';
    try { player.pause(); } catch (e) {}
    try { player.removeAttribute('src'); player.load(); } catch (e) {}
  }

  function classifyUrl(url) {
    var u = (url || '').toLowerCase();
    if (/\.m3u8(\?|#|$)/.test(u)) return 'hls';
    if (/\/(udp|rtp)\//.test(u)) return 'ts';
    if (/\.ts(\?|#|$)|\/ts\/|udpxy|\/stream\//.test(u)) return 'ts';
    if (/^(rtsp|rtmp|mms|udp):/.test(u)) return 'external';
    if (/\.(mp4|m4v|webm|ogv|ogg|mov)(\?|#|$)/.test(u)) return 'native';
    return 'auto';
  }
  function classifyLabel(kind) {
    var map = { hls: 'HLS (m3u8)', ts: 'HTTP-TS (udpxy)', native: 'MP4/WebM', auto: 'HTTP 流', external: '外部协议' };
    return map[kind] || kind;
  }

  function tryPlay() {
    var p = player.play();
    if (p && p.catch) {
      p.catch(function () {
        player.muted = true;
        unmuteHint.style.display = 'block';
        syncPcBtns();
        var p2 = player.play();
        if (p2 && p2.catch) p2.catch(function () {});
      });
    }
  }
  unmuteHint.addEventListener('click', function () {
    player.muted = false;
    unmuteHint.style.display = 'none';
    syncPcBtns();
    var p = player.play();
    if (p && p.catch) p.catch(function () {});
  });

  function diagnoseError(kind, detail) {
    var msg = '播放失败';
    var net = /network|fetch|timeout|connect/i.test(String(detail) + String(kind));
    if (net) {
      if (IS_FILE && !IS_LAUNCHER) {
        msg = '跨域限制（本地直开模式）：部署到软路由后通过网页访问即可正常播放';
      } else {
        msg = '网络拉流失败：请确认软路由 udpxy 服务在线、网线/WiFi 正常';
      }
    } else if (/media|codec|demux|parse/i.test(String(detail))) {
      msg = '该频道编码浏览器不支持（如 H.265/AC3）';
    } else {
      msg = '播放失败：' + (detail || '未知错误');
    }
    toast(msg, true);
  }

  function startMpegts(c) {
    loading.style.display = 'block';
    loadLib('mpegts', 'mpegts.min.js').then(function () {
      loading.style.display = 'none';
      startMpegtsNow(c);
    }).catch(function (err) {
      loading.style.display = 'none';
      setEngineBadge('失败 · 引擎未加载');
      toast('解码引擎加载失败：' + err.message + '，请检查页面文件是否完整', true);
    });
  }

  function startMpegtsNow(c) {
    if (typeof mpegts === 'undefined' || !mpegts.getFeatureList().mseLivePlayback) {
      toast('当前浏览器缺少 TS 解码能力，改用原生方式尝试', true);
      startNative(c);
      return;
    }
    engine.type = 'mpegts';
    mpegtsTried = true;
    setEngineBadge('正在连接 · TS引擎');
    try {
      engine.mp = mpegts.createPlayer(
        { type: 'mpegts', isLive: true, url: c._stream },
        {
          enableStashBuffer: false,
          liveBufferLatencyChasing: true,
          liveBufferLatencyMaxLatency: 6,
          liveBufferLatencyMinRemain: 0.8,
          lazyLoad: false,
          autoCleanupSourceBuffer: true,
          stashInitialSize: 384,
          fixAudioTimestampGap: true
        }
      );
      engine.mp.attachMediaElement(player);
      engine.mp.on(mpegts.Events.ERROR, function (type, detail) {
        clearFailTimer();
        loading.style.display = 'none';
        diagnoseError(type, detail);
        setEngineBadge('失败 · TS引擎');
      });
      engine.mp.on(mpegts.Events.MEDIA_INFO, function (mi) {
        mediaInfo = mi;
        if (mi && mi.videoCodec) {
          setEngineBadge('TS引擎 · ' + mi.videoCodec + (mi.audioCodec ? ' / ' + mi.audioCodec : ''));
        }
        renderInfo(currentChannel);
      });
      engine.mp.load();
      tryPlay();
      failTimer = setTimeout(function () {
        if (player.readyState < 2) {
          loading.style.display = 'none';
          diagnoseError('NetworkError', 'timeout');
        }
      }, 15000);
    } catch (e) {
      loading.style.display = 'none';
      diagnoseError('ConstructError', e.message);
    }
  }

  function startHls(c) {
    loading.style.display = 'block';
    loadLib('Hls', 'hls.light.min.js').then(function () {
      loading.style.display = 'none';
      startHlsNow(c);
    }).catch(function (err) {
      loading.style.display = 'none';
      setEngineBadge('失败 · 引擎未加载');
      toast('解码引擎加载失败：' + err.message + '，请检查页面文件是否完整', true);
    });
  }

  function startHlsNow(c) {
    if (typeof Hls !== 'undefined' && Hls.isSupported()) {
      engine.type = 'hls';
      setEngineBadge('正在连接 · HLS引擎');
      try {
        engine.hls = new Hls({ liveDurationInfinity: true, lowLatencyMode: false, backBufferLength: 60 });
        engine.hls.on(Hls.Events.ERROR, function (evt, data) {
          if (data && data.fatal) {
            clearFailTimer();
            loading.style.display = 'none';
            diagnoseError(data.type, data.details);
            setEngineBadge('失败 · HLS引擎');
          }
        });
        engine.hls.attachMedia(player);
        engine.hls.loadSource(c._stream);
        engine.hls.on(Hls.Events.MANIFEST_PARSED, function () {
          setEngineBadge('HLS引擎');
          tryPlay();
        });
        failTimer = setTimeout(function () {
          if (player.readyState < 2) {
            loading.style.display = 'none';
            diagnoseError('NetworkError', 'timeout');
          }
        }, 15000);
        return;
      } catch (e) {
        loading.style.display = 'none';
        diagnoseError('ConstructError', e.message);
        return;
      }
    }
    startNative(c);
  }

  function startNative(c) {
    engine.type = 'native';
    setEngineBadge('原生播放');
    player.src = c._stream;
    player.load();
    tryPlay();
    failTimer = setTimeout(function () {
      if (player.readyState < 2) {
        loading.style.display = 'none';
        diagnoseError('NetworkError', 'timeout');
      }
    }, 12000);
  }

  player.addEventListener('error', function () {
    if (engine.type !== 'native' || !currentChannel) return;
    clearFailTimer();
    loading.style.display = 'none';
    var kind = classifyUrl(currentChannel._stream);
    if (!mpegtsTried && kind !== 'native') {
      toast('原生播放失败，切换 TS 引擎重试...');
      var c = currentChannel;
      stopEngine();
      currentChannel = c;
      startMpegts(c);
    } else {
      diagnoseError('MediaError', 'native');
    }
  });
  player.addEventListener('playing', function () {
    clearFailTimer();
    loading.style.display = 'none';
    if (engine.type === 'native') setEngineBadge('原生播放');
    scheduleFirstSnap();
    if (currentChannel && !thumbs[currentChannel.name]) doSnap(true);
  });

  function playChannel(c) {
    if (!c) return;
    stopEngine();
    if (!c._stream) c._stream = resolveStreamUrl(c.url);
    mediaInfo = null;
    mpegtsTried = false;
    currentChannel = c;
    currentIndex = channels.indexOf(c);
    noSignal.style.display = 'none';
    loading.style.display = 'block';
    playingTag.style.display = 'flex';
    if (c.logo) {
      playingLogo.src = c.logo;
      playingLogo.style.display = 'block';
      playingLogo.onerror = function () { this.style.display = 'none'; };
    } else {
      playingLogo.style.display = 'none';
    }
    playingName.textContent = c.name;
    nowPlaying.textContent = (c.group ? c.group + ' · ' : '') + c.name;
    subtitle.textContent = '已加载 ' + channels.length + ' 个频道 · ' + c.name;
    renderList();
    renderInfo(c);
    updThumbUI(null);

    var kind = classifyUrl(c._stream);
    if (kind === 'external') {
      loading.style.display = 'none';
      setEngineBadge('外部协议');
      toast('该地址为 ' + c.url.split(':')[0].toUpperCase() + ' 协议，网页不支持，已复制地址到剪贴板', true);
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(c.url);
      }
      return;
    }
    if (kind === 'hls') startHls(c);
    else if (kind === 'ts') startMpegts(c);
    else if (kind === 'native') startNative(c);
    else startNative(c);
  }

  /* ========== 自定义控制条（原生控制栏已移除） ========== */
  var pcPlay = $('pcPlay');
  var pcMute = $('pcMute');
  var pcFull = $('pcFull');

  function syncPcBtns() {
    if (pcPlay) {
      pcPlay.innerHTML = player.paused ? '&#9654;' : '&#9208;';
      pcPlay.title = player.paused ? '播放（空格）' : '暂停（空格）';
    }
    if (pcMute) {
      pcMute.innerHTML = (player.muted || player.volume === 0) ? '&#128263;' : '&#128266;';
      pcMute.title = (player.muted || player.volume === 0) ? '取消静音' : '静音';
    }
    if (pcFull) {
      pcFull.innerHTML = document.fullscreenElement ? '&#9974;' : '&#9974;';
      pcFull.title = document.fullscreenElement ? '退出全屏（F）' : '全屏（F，或双击画面）';
    }
  }
  pcPlay.addEventListener('click', function () {
    if (player.paused) {
      var p = player.play();
      if (p && p.catch) p.catch(function () {});
    } else {
      player.pause();
    }
    syncPcBtns();
  });
  pcMute.addEventListener('click', function () {
    player.muted = !player.muted;
    if (!player.muted && player.volume === 0) {
      player.volume = 0.5;
      $('volume').value = 50;
    }
    unmuteHint.style.display = 'none';
    syncPcBtns();
  });
  $('volume').addEventListener('input', function () {
    player.volume = this.value / 100;
    if (player.volume > 0) player.muted = false;
    syncPcBtns();
  });

  function toggleFullscreen() {
    if (document.fullscreenElement) {
      if (document.exitFullscreen) document.exitFullscreen();
    } else {
      var el = $('videoWrap');
      if (el.requestFullscreen) el.requestFullscreen();
    }
  }
  pcFull.addEventListener('click', toggleFullscreen);
  document.addEventListener('fullscreenchange', syncPcBtns);
  $('videoWrap').addEventListener('dblclick', function (e) {
    if (e.target && (e.target.id === 'loading' || e.target.id === 'hintBar' || e.target.id === 'unmuteHint')) return;
    toggleFullscreen();
  });
  player.addEventListener('play', syncPcBtns);
  player.addEventListener('pause', syncPcBtns);
  player.addEventListener('volumechange', syncPcBtns);

  /* ========== 频道信息 ========== */
  function renderInfo(c) {
    if (!c) {
      infoBody.innerHTML = '<div class="empty" style="padding:40px 20px"><div class="big">&#8505;&#65039;</div>选择频道后显示详细信息</div>';
      return;
    }
    var rows = [];
    function row(k, v) { rows.push('<div class="info-row"><div class="k">' + k + '</div><div class="v">' + v + '</div></div>'); }
    if (c.tvgId) row('频道ID', esc(c.tvgId));
    row('分组', esc(c.group));
    if (c.tvgName) row('名称', esc(c.tvgName));
    row('接入方式', classifyLabel(classifyUrl(c._stream || resolveStreamUrl(c.url))));
    if (mediaInfo && currentChannel === c) {
      var mi = [];
      if (mediaInfo.videoCodec) mi.push('视频 ' + esc(mediaInfo.videoCodec));
      if (mediaInfo.audioCodec) mi.push('音频 ' + esc(mediaInfo.audioCodec));
      if (mediaInfo.width) mi.push(mediaInfo.width + '×' + mediaInfo.height + ' @ ' + Math.round(mediaInfo.fps || 0) + 'fps');
      if (mi.length) row('流参数', mi.join('，'));
    }
    if (c.catchup) row('回看', esc(c.catchup));
    if (c.shift) row('时移', esc(c.shift));
    if (c.logo) row('台标', '<a href="' + esc(c.logo) + '" target="_blank" rel="noopener" style="color:var(--primary)">点击查看</a>');
    row('播放地址', '<span class="url">' + esc(c.url) + '</span>');
    rows.push('<div class="info-row"><div class="k">画面</div><div class="v">左侧列表将保留此台上次观看的画面快照（每 15 秒自动更新）</div></div>');
    infoBody.innerHTML =
      '<div class="live-thumb" id="liveThumb" title="点击刷新画面">'
      + '<span class="tag">当前节目画面</span>'
      + '<img id="liveThumbImg" alt="" style="display:none">'
      + '<div class="ph" id="thumbPh">等待画面…<br>播放后自动截取当前节目</div>'
      + '<div class="bar">'
      + '<button id="btnSnapRefresh" title="立即截取当前画面">&#8635; 刷新</button>'
      + '<button id="btnSnapSave" title="保存高清截图 PNG 到本地">&#128190; 截图</button>'
      + '</div>'
      + '</div>'
      + '<div class="info-hero">'
      + '<div class="hlogo"><span>&#128250;</span>' + (c.logo ? '<img src="' + esc(c.logo) + '" alt="">' : '') + '</div>'
      + '<div class="name">' + esc(c.name) + '</div>'
      + '<div class="group">' + esc(c.group) + '</div>'
      + '</div>'
      + rows.join('')
      + '<div class="info-actions">'
      + '<button class="btn small primary" id="btnCopyUrl" style="flex:1">&#128203; 复制播放地址</button>'
      + '</div>';
    var thumbBox = infoBody.querySelector('#liveThumb');
    if (thumbBox) {
      thumbBox.addEventListener('click', function (e) {
        if (e.target && e.target.id === 'btnSnapSave') return;
        doSnap(false);
      });
    }
    var br = infoBody.querySelector('#btnSnapRefresh');
    if (br) br.addEventListener('click', function (e) { e.stopPropagation(); doSnap(false); });
    var bs = infoBody.querySelector('#btnSnapSave');
    if (bs) bs.addEventListener('click', function (e) { e.stopPropagation(); saveSnapshot(); });
    var heroImg = infoBody.querySelector('.hlogo img');
    if (heroImg) heroImg.onerror = function () { this.style.display = 'none'; };
    var copyBtn = infoBody.querySelector('#btnCopyUrl');
    if (copyBtn) {
      copyBtn.addEventListener('click', function () {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(c.url).then(function () { toast('已复制播放地址'); });
        } else {
          toast('复制失败：浏览器权限受限', true);
        }
      });
    }
    if (thumbs[c.name] && currentChannel === c) updThumbUI(thumbs[c.name]);
  }

  /* ========== 分组/搜索/键盘 ========== */
  groupBar.addEventListener('click', function (e) {
    var chip = e.target;
    while (chip && chip !== groupBar && !chip.classList.contains('group-chip')) chip = chip.parentNode;
    if (!chip || chip === groupBar) return;
    currentGroup = chip.getAttribute('data-g');
    renderGroups();
    renderList();
  });
  $('searchInput').addEventListener('input', renderList);
  document.addEventListener('keydown', function (e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (e.key === ' ') {
      e.preventDefault();
      if (player.src || currentChannel) pcPlay.click();
      return;
    }
    if (e.key === 'f' || e.key === 'F') { e.preventDefault(); toggleFullscreen(); return; }
    if (currentIndex < 0) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); if (currentIndex + 1 < channels.length) playChannel(channels[currentIndex + 1]); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); if (currentIndex - 1 >= 0) playChannel(channels[currentIndex - 1]); }
  });

  /* ========== 导入弹窗 ========== */
  var modal = $('importModal');
  function openModal() { modal.classList.add('show'); }
  function closeModal() { modal.classList.remove('show'); }
  $('openImportBtn').addEventListener('click', openModal);
  $('btnCancelImport').addEventListener('click', closeModal);
  $('closeImport').addEventListener('click', closeModal);
  modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); });

  var tabs = document.querySelectorAll('.tab');
  for (var ti = 0; ti < tabs.length; ti++) {
    (function (t) {
      t.addEventListener('click', function () {
        var all = document.querySelectorAll('.tab');
        for (var x = 0; x < all.length; x++) all[x].classList.remove('active');
        t.classList.add('active');
        var ps = document.querySelectorAll('.tab-panel');
        for (var y = 0; y < ps.length; y++) ps[y].classList.remove('show');
        $('tab-' + t.getAttribute('data-tab')).classList.add('show');
      });
    })(tabs[ti]);
  }

  /* 网址导入快捷：B/S 模式填本站同源源，本地模式填路由器直连地址 */
  (function initFamilyChip() {
    if (IS_WEB) {
      $('familyChip').innerHTML = '&#127968; 同步本站源：/iptv.m3u';
    } else {
      $('familyChip').innerHTML = '&#127968; 填入家庭源：http://192.168.100.1/iptv.m3u';
    }
  })();
  $('familyChip').addEventListener('click', function () {
    $('urlInput').value = IS_WEB ? BUILTIN.webPath : BUILTIN.url;
  });

  /* 文件 */
  var dropzone = $('dropzone');
  var fileInput = $('fileInput');
  dropzone.addEventListener('click', function () { fileInput.click(); });
  dropzone.addEventListener('dragover', function (e) { e.preventDefault(); dropzone.classList.add('drag'); });
  dropzone.addEventListener('dragleave', function () { dropzone.classList.remove('drag'); });
  dropzone.addEventListener('drop', function (e) {
    e.preventDefault(); dropzone.classList.remove('drag');
    if (e.dataTransfer.files.length) handleFile(e.dataTransfer.files[0]);
  });
  fileInput.addEventListener('change', function () { if (this.files.length) handleFile(this.files[0]); });
  function handleFile(file) {
    var r = new FileReader();
    r.onload = function () {
      loadPlaylistText(r.result, file.name, true);
      closeModal();
    };
    r.readAsText(file, 'utf-8');
  }

  /* URL */
  $('btnLoadUrl').addEventListener('click', function () {
    var url = $('urlInput').value.trim();
    if (!url) { toast('请输入频道清单地址', true); return; }
    var btn = this;
    btn.disabled = true; btn.textContent = '加载中...';
    fetch(url, { mode: 'cors' })
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.text();
      })
      .then(function (text) {
        loadPlaylistText(text, url, true);
        closeModal();
      })
      .catch(function (err) {
        if (IS_FILE && !IS_LAUNCHER) {
          toast('拉取被跨域限制拦截：请用「IPTV播放器.bat」打开，或改用文件导入', true);
        } else {
          toast('加载失败：' + err.message, true);
        }
      })
      .finally(function () { btn.disabled = false; btn.textContent = '加载'; });
  });

  /* 粘贴 */
  $('btnPaste').addEventListener('click', function () {
    var text = $('pasteInput').value;
    if (!text.trim()) { toast('请先粘贴内容', true); return; }
    loadPlaylistText(text, '', true);
    closeModal();
  });

  function loadPlaylistText(text, source, autoplay) {
    var list = parseM3U(text);
    if (!list.length) { toast('未能解析到频道，请检查清单格式', true); return; }
    list.forEach(decorateGroup);
    channels = list;
    currentGroup = '全部';
    currentIndex = -1;
    currentChannel = null;
    renderGroups();
    renderList();
    renderInfo(null);
    stopEngine();
    setEngineBadge('');
    noSignal.style.display = 'flex';
    playingTag.style.display = 'none';
    nowPlaying.textContent = '';
    subtitle.textContent = '已加载 ' + channels.length + ' 个频道' + (source ? ' · ' + source : '');
    try { localStorage.setItem(STORE_KEY, JSON.stringify({ source: source || '', text: text })); } catch (e) {}
    toast('已加载 ' + channels.length + ' 个频道');
    restartPreviewLoop();
    if (autoplay) {
      setTimeout(function () {
        if (channels.length) playChannel(channels[0]);
      }, 150);
    }
  }

  /* ========== 恢复上次 ========== */
  function restore() {
    var saved = null;
    try { saved = JSON.parse(localStorage.getItem(STORE_KEY)); } catch (e) {}
    if (saved && saved.text) {
      var list = parseM3U(saved.text);
      if (list.length) {
        list.forEach(decorateGroup);
        channels = list;
        renderGroups();
        renderList();
        subtitle.textContent = '已加载 ' + channels.length + ' 个频道' + (saved.source ? ' · ' + saved.source : '');
        toast('已恢复上次的频道清单（' + channels.length + ' 个频道）');
        return true;
      }
    }
    return false;
  }

  /* ========== 重置 ========== */
  $('btnReset').addEventListener('click', function () {
    localStorage.removeItem(STORE_KEY);
    localStorage.removeItem(THUMB_KEY);
    localStorage.removeItem(STAMP_KEY);
    thumbs = {};
    thumbStamp = {};
    failMarks = {};
    stopPreviewHard();
    channels = [];
    currentGroup = '全部';
    currentIndex = -1;
    currentChannel = null;
    stopEngine();
    setEngineBadge('');
    renderGroups();
    renderList();
    renderInfo(null);
    noSignal.style.display = 'flex';
    playingTag.style.display = 'none';
    loading.style.display = 'none';
    subtitle.textContent = '未加载频道清单（下次打开将自动载入内置家庭源）';
    nowPlaying.textContent = '';
    $('searchInput').value = '';
    updatePvStatus('');
    toast('已重置');
  });

  /* ========== 提示条 ========== */
  hintBar.addEventListener('click', function (e) {
    if (e.target && e.target.id === 'hintBarClose') hintBar.style.display = 'none';
  });
  function maybeShowHint() {
    if (IS_FILE && !IS_LAUNCHER) hintBar.style.display = 'flex';
  }

  /* ========== 自检钩子（#autotest） ========== */
  function runAutotest() {
    var box = document.createElement('div');
    box.id = 'autostatus';
    box.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:#fff;z-index:99999;font:12px/1.8 Consolas,monospace;overflow:auto;padding:10px;color:#000;white-space:pre;';
    document.body.appendChild(box);
    var seq = [];
    function step(name, ok, extra) {
      seq.push((ok ? 'PASS' : 'FAIL') + ' | ' + name + (extra ? ' | ' + extra : ''));
      box.textContent = seq.join('\n');
    }
    var finished = false;
    function finish() {
      if (finished) return;
      finished = true;
      box.textContent = seq.join('\n') + '\nAUTOTEST_DONE';
      /* 把结果摘要写进窗口标题，供无头以外的真实浏览器验证读取 */
      var fails = [];
      for (var i = 0; i < seq.length; i++) if (seq[i].indexOf('FAIL') === 0) fails.push(seq[i].split(' | ')[1]);
      document.title = 'ATR:pass=' + (seq.length - fails.length) + ',fail=' + fails.length + (fails.length ? ' |' + fails.join(',') : '');
    }
    setTimeout(finish, 25000);

    /* 解析 hash 参数：#autotest,ts=<url>,live=<url> */
    var params = {};
    var parts = location.hash.replace(/^#/, '').split(',');
    for (var pi = 0; pi < parts.length; pi++) {
      var kv = parts[pi].split('=');
      if (kv[0] !== 'autotest' && kv.length > 1) params[kv[0]] = decodeURIComponent(kv.slice(1).join('='));
    }

    /* 等频道清单就绪（B/S 模式为异步加载）再开始断言 */
    function waitReady(cb, tries) {
      if (channels.length || (tries || 0) >= 60) { cb(); return; }
      setTimeout(function () { waitReady(cb, (tries || 0) + 1); }, 250);
    }
    waitReady(function () {

      loadLib('mpegts', 'mpegts.min.js').then(function () {
        step('lib-mpegts', !!window.mpegts && mpegts.getFeatureList().mseLivePlayback, 'v' + mpegts.version + (window.__EMBEDDED_LIBS__ ? '（内嵌版）' : '（按需加载）'));
      }).catch(function (e) { step('lib-mpegts', false, String(e)); });
      loadLib('Hls', 'hls.light.min.js').then(function () {
        step('lib-hls', !!window.Hls && Hls.isSupported(), window.__EMBEDDED_LIBS__ ? '内嵌版' : '按需加载');
      }).catch(function (e) { step('lib-hls', false, String(e)); });

    /* UI 子模式：验证缩略图相关 DOM 渲染 */
    if (params.ui) {
      var fake = { name: (channels[0] ? channels[0].name : 'TEST'), group: '测试', url: 'http://127.0.0.1:8011/a.ts', logo: '' };
      renderInfo(fake);
      step('ui-live-thumb', !!$('liveThumb') && !!$('liveThumbImg') && !!$('thumbPh'), '缩略图容器/图/占位');
      step('ui-snap-buttons', !!$('btnSnapRefresh') && !!$('btnSnapSave'), '刷新与截图按钮');
      step('ui-no-native-controls', !$('player').hasAttribute('controls'), '原生控制栏(含进度条)已移除');
      step('ui-pc-buttons', !!$('pcPlay') && !!$('pcMute') && !!$('pcFull'), '自定义控制按钮(播放/静音/全屏)');
      /* 标签页图标 */
      var faviconLink = document.querySelector('link[rel="icon"]');
      step('ui-favicon', !!(faviconLink && /data:image\/svg\+xml/.test(faviconLink.href) && faviconLink.href.indexOf('%3ETV%3C') !== -1), '内嵌SVG图标已配置');
      /* 同源化改写（B/S 核心逻辑） */
      var r1 = resolveStreamUrl('http://192.168.100.1:4022/udp/239.49.8.74:8000');
      var r2 = resolveStreamUrl('http://any-host:9999/rtp/239.3.1.1:8208');
      var r3 = resolveStreamUrl('http://192.168.100.1/live/stream.m3u8');
      step('resolve-url', r1 === '/udp/239.49.8.74:8000' && r2 === '/rtp/239.3.1.1:8208' && r3 === 'http://192.168.100.1/live/stream.m3u8',
        'udp→' + r1 + ', rtp→' + r2 + ', 其他不改写');
      step('ui-pv-foot', !!$('pvChip') && !!$('pvStatus') && !!$('pvMenu'), '列表底部状态栏/菜单');
      step('ui-pv-pick', (function () {
        var curBackup = currentChannel;
        currentChannel = null;
        var t = pickPreviewTarget();
        currentChannel = curBackup;
        return !!t;
      })(), '能选出待预览目标');
      /* 状态分类统计与首轮加速逻辑 */
      if (channels.length) {
        var cnt0 = pvCounts();
        var eff0 = effIntervalSec();
        step('pv-counts', cnt0.missing + cnt0.waiting + cnt0.blocked > 0 || Object.keys(thumbs).length === channels.length,
          '待轮到=' + cnt0.missing + ',待重试=' + cnt0.waiting + ',受限=' + cnt0.blocked);
        step('pv-fill-mode', eff0 === Math.min(PREVIEW.intervalSec, 45), '配置=' + PREVIEW.intervalSec + 's,生效=' + eff0 + 's');
        /* 模拟受限标记，验证分类与列表标注 */
        if (channels[0] && !thumbs[channels[0].name]) {
          failMarks[channels[0].name] = { count: 3, until: Date.now() + 3600e3 };
          var cnt1 = pvCounts();
          renderList();
          step('pv-blocked-tag', cnt1.blocked === (cnt0.blocked + 1) && !!chList.querySelector('.ch-meta'), '列表出现「预览受限」分类=' + cnt1.blocked);
          delete failMarks[channels[0].name];
          renderList();
        }
      }
      if (channels[0]) {
        thumbs[channels[0].name] = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
        renderList();
        step('ui-list-snap-thumb', !!chList.querySelector('.ch-logo img.snap'), '列表项画面快照渲染');
        delete thumbs[channels[0].name];
        renderList();
      }
      finish();
      return;
    }

    /* 预览链路子模式：隐藏实例 + mpegts + canvas 截帧全链路 */
    if (params.prev) {
      if (pv.kick) { clearTimeout(pv.kick); pv.kick = null; }
      stopPreviewHard();
      var prevChannel = { name: 'AUTOTEST_PREV', group: '测试', url: params.prev };
      previewProbe(prevChannel, function (ok) {
        step('pv-probe-frame', ok && !!thumbs['AUTOTEST_PREV'], ok ? ((thumbs['AUTOTEST_PREV'] || '').length + ' chars dataURL, stamp=' + (thumbStamp['AUTOTEST_PREV'] || 0)) : '截帧失败');
        step('pv-probe-cleanup', !pv.busy && !pv.vid && !pv.mp && !pv.hls, 'busy=' + pv.busy + ',实例已释放=' + (!pv.vid && !pv.mp && !pv.hls));
        var markInfo = (function () {
          var ks = [];
          for (var kk in failMarks) ks.push(kk + '#' + (failMarks[kk] ? failMarks[kk].count : 0));
          return 'marks=[' + ks.join(', ') + '] thumbsN=' + Object.keys(thumbs).length;
        })();
        step('pv-fail-mark', !!failMarks['AUTOTEST_PREV'] !== ok, (ok ? '成功无失败标记' : '失败已标记延后') + ' | ' + markInfo);
        finish();
      });
      return;
    }

    /* 直播流头部探测（XHR 收到响应头即中止，避免无限流把测试挂住） */
    function liveProbe(cb) {
      if (!params.live) { step('live-udpxy-head', false, '未提供live参数'); cb(); return; }
      var xhr = new XMLHttpRequest();
      var called = false;
      function done(ok, extra) {
        if (called) return;
        called = true;
        step('live-udpxy-head', ok, extra);
        cb();
      }
      xhr.onreadystatechange = function () {
        if (xhr.readyState >= 2) {
          var ct = '';
          try { ct = xhr.getResponseHeader('Content-Type') || ''; } catch (e) {}
          done(xhr.status >= 200 && xhr.status < 300, 'status=' + xhr.status + ',type=' + ct);
          try { xhr.abort(); } catch (e) {}
        }
      };
      xhr.onerror = function () { done(false, 'onerror'); };
      try {
        xhr.open('GET', params.live, true);
        xhr.timeout = 8000;
        xhr.ontimeout = function () { done(false, 'timeout'); };
        xhr.send();
      } catch (e) {
        done(false, 'exception:' + e.message);
      }
    }

    fetch(IS_WEB ? BUILTIN.webPath : BUILTIN.url).then(function (r) {
      return r.text();
    }).then(function (t) {
      var list = parseM3U(t);
      step('fetch-m3u-cors-bypass', list.length > 0, list.length + '个频道');
      return list;
    }).then(function (list) {
      return new Promise(function (resolve) {
        liveProbe(function () { resolve(list); });
      });
    }).then(function (list) {
      if (!list || !params.ts) {
        if (!params.ts) step('engine-static', false, '未提供ts参数');
        finish();
        return;
      }
      loadLib('mpegts', 'mpegts.min.js').then(function () {
      /* 静态 TS 样本经 mpegts.js 引擎解码验证 */
      var v = document.getElementById('player');
      var mp = mpegts.createPlayer({ type: 'mpegts', isLive: false, url: params.ts }, { enableStashBuffer: false, stashInitialSize: 384 });
      var gotInfo = false;
      mp.attachMediaElement(v);
      mp.on(mpegts.Events.ERROR, function (t, d) {
        if (!gotInfo) { step('engine-static-demux', false, t + '/' + d); gotInfo = true; }
      });
      mp.on(mpegts.Events.MEDIA_INFO, function (mi) {
        gotInfo = true;
        step('engine-static-demux', true, 'video=' + (mi.videoCodec || '?') + ',audio=' + (mi.audioCodec || '?'));
      });
      var timer = setTimeout(function () {
        step('engine-static-play', v.videoWidth > 0, 'timeout,readyState=' + v.readyState + ',videoWidth=' + v.videoWidth + ',time=' + v.currentTime);
        var snapA = snapFrame(v, 160);
        step('canvas-snapshot', !!snapA, snapA ? snapA.length + ' chars dataURL' : 'null(污染或无帧)');
        try { mp.destroy(); } catch (e) {}
        finish();
      }, 15000);
      v.addEventListener('playing', function () {
        clearTimeout(timer);
        step('engine-static-play', true, 'videoWidth=' + v.videoWidth + ',time=' + v.currentTime.toFixed(2));
        var snapB = snapFrame(v, 160);
        step('canvas-snapshot', !!snapB, snapB ? snapB.length + ' chars dataURL' : 'null(污染或无帧)');
        finish();
      });
      mp.load();
      var p = v.play();
      if (p && p.catch) p.catch(function () {});
      }).catch(function (err2) {
        step('engine-static-lib', false, String(err2));
        finish();
      });
    }).catch(function (err) {
      step('fetch-m3u-cors-bypass', false, String(err));
      finish();
    });
    });
  }

  /* ========== 初始化 ========== */
  loadThumbs();
  /* 当前频道画面自动刷新：低频（45 秒）维护，手动刷新按钮不受影响 */
  setInterval(function () {
    if (currentChannel && player.videoWidth > 0 && !player.paused) doSnap(true);
  }, 45000);

  /* B/S 模式：从本站同步路由器上的最新清单（nginx 反代 /iptv.m3u） */
  function refreshWebSource(silent) {
    fetch(BUILTIN.webPath).then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.text();
    }).then(function (text) {
      var list = parseM3U(text);
      if (!list.length) throw new Error('empty');
      loadPlaylistText(text, BUILTIN.webPath + '（本站同步）', false);
      if (!silent) toast('已从软路由同步频道清单（' + list.length + ' 个频道）');
    }).catch(function (err) {
      if (!silent) toast('本站清单拉取失败：' + err.message + '，改用内置清单', true);
      if (!channels.length && BUILTIN.text) {
        loadPlaylistText(BUILTIN.text, BUILTIN.name, false);
      }
    });
  }

  var restoredFromStorage = restore();
  if (!restoredFromStorage) {
    if (IS_WEB) {
      refreshWebSource(false);
    } else if (BUILTIN.text) {
      loadPlaylistText(BUILTIN.text, BUILTIN.name, false);
      toast('已自动载入内置家庭源（' + channels.length + ' 个频道）');
    } else {
      renderGroups();
      renderList();
    }
  } else if (IS_WEB) {
    /* 已有上次的清单：若来源是本站/家庭源则静默刷新保持同步；自定义导入的不覆盖 */
    var lastSource = '';
    try { lastSource = ((JSON.parse(localStorage.getItem(STORE_KEY)) || {}).source) || ''; } catch (e) {}
    if (!lastSource || lastSource.indexOf('/iptv.m3u') !== -1 || lastSource === BUILTIN.url || lastSource === BUILTIN.name) {
      refreshWebSource(true);
    }
  }
  updatePvStatus('');
  restartPreviewLoop();
  maybeShowHint();
  if (location.hash.indexOf('autotest') !== -1) runAutotest();
})();
