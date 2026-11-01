/* IPTV 网页客户端构建脚本
   用法：node build.js
   输入：src/（源码三件套） + data/iptv.m3u（内置兜底清单） + html/js/vendor/（解码库，随仓库分发）
   输出：html/（部署目录，覆盖更新） + IPTV客户端.html（单文件版）
*/
const fs = require('fs');
const path = require('path');

const root = __dirname;
const srcDir = path.join(root, 'src');
const htmlDir = path.join(root, 'html');
const m3uFile = path.join(root, 'data', 'iptv.m3u');
const CLOSER = '<' + '/script>';

/* ---------- 读源码 ---------- */
const indexHtml = fs.readFileSync(path.join(srcDir, 'index.html'), 'utf8');
const mainCss = fs.readFileSync(path.join(srcDir, 'css', 'main.css'), 'utf8');
let appJs = fs.readFileSync(path.join(srcDir, 'js', 'app.js'), 'utf8');

/* ---------- 注入内置清单 ---------- */
let m3u = '';
try { m3u = fs.readFileSync(m3uFile, 'utf8'); } catch (e) { console.warn('WARN: data/iptv.m3u 缺失，内置清单为空'); }
const m3uToken = "/*__BUILTIN_M3U__*/''";
if (appJs.split(m3uToken).length - 1 !== 1) { console.error('FAIL: builtin marker count'); process.exit(1); }
appJs = appJs.replace(m3uToken, function () { return '(function(){return ' + JSON.stringify(m3u) + ';})()'; });
if (appJs.indexOf(CLOSER) !== -1) { console.error('FAIL: app.js contains script closer'); process.exit(1); }
console.log('app.js injected: ' + appJs.length + ' chars');

/* ---------- 产物1：部署目录 html/ ---------- */
fs.mkdirSync(path.join(htmlDir, 'css'), { recursive: true });
fs.mkdirSync(path.join(htmlDir, 'js', 'vendor'), { recursive: true });
fs.writeFileSync(path.join(htmlDir, 'index.html'), indexHtml, 'utf8');
fs.writeFileSync(path.join(htmlDir, 'css', 'main.css'), mainCss, 'utf8');
fs.writeFileSync(path.join(htmlDir, 'js', 'app.js'), appJs, 'utf8');
console.log('WRITE html/: index.html ' + Buffer.byteLength(indexHtml) + 'B, main.css ' + Buffer.byteLength(mainCss) + 'B, app.js ' + Buffer.byteLength(appJs) + 'B');
if (!fs.existsSync(path.join(htmlDir, 'js', 'vendor', 'mpegts.min.js'))) console.warn('WARN: html/js/vendor/mpegts.min.js 缺失');

/* ---------- 产物2：单文件版（库内联，双击即用） ---------- */
const libMpegts = fs.readFileSync(path.join(htmlDir, 'js', 'vendor', 'mpegts.min.js'), 'utf8').replace(/<\/script/gi, '<\\/script');
const libHls = fs.readFileSync(path.join(htmlDir, 'js', 'vendor', 'hls.light.min.js'), 'utf8').replace(/<\/script/gi, '<\\/script');
const cssLink = '<link rel="stylesheet" href="css/main.css">';
const appRef = '  <script defer src="js/app.js"></' + 'script>';
if (indexHtml.indexOf(cssLink) === -1) { console.error('FAIL: css link not found'); process.exit(1); }
if (indexHtml.indexOf(appRef) === -1) { console.error('FAIL: app ref not found'); process.exit(1); }
let single = indexHtml;
single = single.replace(cssLink, function () { return '<style>\n' + mainCss + '\n</style>'; });
single = single.replace(appRef, function () {
  return '<script>window.__EMBEDDED_LIBS__=true;</' + 'script>\n'
    + '<script>\n' + libMpegts + '\n</' + 'script>\n'
    + '<script>\n' + libHls + '\n</' + 'script>\n'
    + '<script>\n' + appJs + '\n</' + 'script>';
});
fs.writeFileSync(path.join(root, 'IPTV客户端.html'), single, 'utf8');
console.log('WRITE single: IPTV客户端.html ' + Buffer.byteLength(single, 'utf8') + 'B');
console.log('BUILD_OK');