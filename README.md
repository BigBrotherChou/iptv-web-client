# IPTV 网页客户端（B/S · 局域网版）

浏览器打开即看的家庭 IPTV 客户端：部署在软路由（nginx 容器）上，局域网内任意设备访问网页播放，**解码全部发生在终端浏览器**（MPEG-TS 拆包 → H.264 → MSE 渲染），服务器只转发字节流、零解码负担。

## 功能特性

- **双引擎自动切换**：udpxy 组播流（HTTP-TS）→ mpegts.js；m3u8 → hls.js；mp4/webm → 原生播放
- **清单自动同步**：页面打开即从本站 `/iptv.m3u` 拉取最新频道清单（nginx 反代），另内置兜底清单
- **流地址同源化**：清单里任意主机的 `/udp/ /rtp/` 地址自动改写为本站相对路径，页面与流同源、天然规避跨域
- **频道缩略图**：右侧面板显示当前台实时画面（canvas 截帧，15 秒级刷新，可存 PNG）
- **后台低频预览**：轮流静默试播各频道几秒并截帧，为列表缩略图自动补全/轮换（首轮约 45 秒/台加速补全，之后回到设定节奏；跳过正在观看的台；失败自动延后）
- **智能分组**：无 `group-title` 的清单按台名归类（央视/卫视/少儿/影视/体育/新闻/纪录/超高清/其他）
- **纯原生实现**：无框架、无外网依赖（解码库已内置），单页面 5 文件部署
- **移动端自适应**：860px 以下单列布局，手机/平板可用（iOS Safari 受 MSE 限制除外）
- 解码库按需懒加载 + 一年强缓存 + gzip：首屏仅约 92KB

## 目录结构

```
├── src/                    源码（HTML / CSS / JS 三分离）
│   ├── index.html
│   ├── css/main.css
│   └── js/app.js           （内置清单占位符由构建注入）
├── data/                   频道清单（构建时注入 app.js 作为兜底数据）
│   └── iptv.example.m3u    示例：复制为 iptv.m3u 并替换为你自己的清单
├── html/                   构建产物 = 部署目录（直接整目录上传到服务器）
├── build.js                构建：注入清单 → 产出 html/ 与单文件版
├── nginx.conf              软路由 nginx 容器配置（静态托管 + 流/清单反代 + gzip + 缓存策略）
└── 部署说明.txt            iStoreOS 部署步骤
```

## 快速开始（iStoreOS / OpenWrt + Docker）

```bash
# 1. 上传
scp -r html root@192.168.100.1:/root/iptv-web/
scp nginx.conf root@192.168.100.1:/root/iptv-web/

# 2. 启动容器（host 网络，8088 端口）
docker run -d --name iptv-web --restart always \
  --network host \
  -v /root/iptv-web/html:/usr/share/nginx/html:ro \
  -v /root/iptv-web/nginx.conf:/etc/nginx/conf.d/default.conf:ro \
  nginx:alpine
```

局域网设备浏览器打开 `http://192.168.100.1:8088/` 即可。

前置要求：路由器已运行 udpxy（组播转单播）并托管频道清单（`/iptv.m3u`），nginx.conf 中相应调整上游地址与端口。

## 从源码构建

```bash
node build.js
```

把 `data/iptv.m3u` 换成你自己的清单即可定制内置兜底源；产物在 `html/`（部署目录）与 `IPTV客户端.html`（免部署的单文件版，双击可用但受浏览器 file:// 跨域限制）。

## 技术要点

- **为什么需要反代**：浏览器 fetch 直连 udpxy（不同源）会被 CORS 拦截；nginx 把 `/udp/` 反代到 udpxy 后页面与流同源，任何设备打开网页即播，无需任何浏览器设置
- **缓存与压缩**：`js/vendor/` 一年强缓存 + gzip（实测 mpegts.min.js 传输 275KB → 63KB）；页面/业务文件 `no-cache`，升级即生效
- **udpxy 并发上限**：标准版默认 3 个客户端，全家多设备同时观看 + 后台预览可能触碰上限，预览失败会自动延后重试，不影响正常观看

## 许可

自用项目，仅供学习参考。第三方解码库（mpegts.js / hls.js）遵循各自开源协议。