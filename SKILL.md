---
name: xasiat-video
description: "解析 xasiat.com 视频页的 MP4 直链并下载/唤起播放器。含页面字段提取、get_file 302 跳转 CDN 机制、时效 token、Referer 要求、Rewrite 重写脚本(xasiat.js/conf)部署、iOS 播放器 URL scheme 表、下载文件命名规则。代理 http://PROXY:PORT"
requires:
  runtime: "curl + ffmpeg(ffprobe)；脚本部署需 git"
  network: "HTTP/HTTPS 经代理 PROXY:PORT"
---

# xasiat.com 视频解析 → 下载 / 播放器唤起

## 适用场景
- 目标页：`https://www.xasiat.com/videos/<id>/<slug>/`（页面内嵌完整视频信息，无独立播放 API）。
- 需要：拿到 MP4 直链、验证大小/时长、命令行下载、或在手机端 Rewrite 框架里「点一下弹播放器/下载」。

## 关键坑与结论（务必先读）
1. **代理**：所有请求走 `http://PROXY:PORT`；git push 也要 `git -c http.proxy=... -c https.proxy=...`（直连 GitHub 不稳定，schannel TLS 会失败）。
2. **视频地址在页面 HTML 里**，两个 JS 变量（单引号包裹）：
   - `video_url: '...'` → SD 版（约 720p）
   - `video_alt_url: '...'` → **Source 高清 1080p**（优先用这个）
   - 提取正则：`/video_alt_url\s*:\s*'([^']+)'/`（注意 `video_url` 是 `video_alt_url` 的子串陷阱——`video_alt_url` 不含 `video_url`，直接匹配没问题，但别用「找最后一个 video_url」这种取法）。
3. **直链是 302 跳板**：`https://www.xasiat.com/get_file/<n>/<hash>/<vid>/...mp4/?v-acctoken=XXX`
   → 302 → `https://cabhs-ocrs1.xascdn.li/remote_control.php?file=...&acctoken=...`
   - **两层 token 都有时效**：页面里的 `v-acctoken` 和 CDN 的 `acctoken`。过期就重新抓页面 HTML 重新提取，别缓存 URL 过夜。
   - 必须带 `Referer: https://www.xasiat.com/`（CDN 校验）。
4. **验证大小/时长**（不下载整个 2.7GB）：
   - 大小：`curl -r 0-0 -L ...` 看 `Content-Range: bytes 0-0/<total>`。
   - 时长：下前 20MB 给 `ffprobe`（xasiat 的 moov 在文件头，20MB 足够读出 duration）；与页面 meta `PT1H59M28S` / `duration" content="7168"` 交叉验证一致 = 正片不是广告。
5. **时长两种格式**：`PT1H59M28S`（ISO8601）和纯秒数 `content="7168"`，都要处理。
6. **标题**：`og:title` meta，形如 `ATID-563 [Uncensored] My Wife...`（很长）。下载文件名**不要**用全标题——提取「番号+标签」：`/^([A-Z]{2,6}-?\d+[A-Z]?(?:\s*\[[^\]]+\])?)/` → `ATID-563 [Uncensored]`，提取不到截前 40 字符。

## 命令行解析流程
```
1. curl -L -x 代理 页面HTML (UA=Mozilla)
2. grep -oE "video_alt_url: '[^']+'" → HD 直链（含 v-acctoken）
3. 下载:
   curl -L -x http://PROXY:PORT -A "Mozilla/5.0" \
     -H "Referer: https://www.xasiat.com/" \
     -o "ATID-563 [Uncensored].mp4" "<HD直链>"
   大文件建议 ffmpeg -headers "Referer: https://www.xasiat.com/\r\n" -i <URL> -c copy out.mp4（可断点续传）
```

## 手机端部署（Rewrite 框架 header 重写）
仓库：`https://github.com/suertang/MMDigtal`（master 分支）
- `JSBOX/xasiat.conf` — 规则模块（`[rewrite_local]` + `[mitm]`），指向远程脚本
- `JSBOX/xasiat.js` — 脚本本体：拦截 `/videos/\d+/` 页面响应 → 解析 → 注入 UI

脚本行为（已实测）：
- 页面底部一条小横条：`🎬 标题(时长)  [▶ 播放] [⬇ 下载] [×]`
- 播放/下载 → 弹「选择播放器」层，内置 iOS scheme（与 Yu9191/Rewrite 的 javhd 模块同款），选择存 localStorage：
  | App | scheme | URL编码 |
  |---|---|---|
  | lenna | `lenna://x-callback-url/play?url=` | ✓ |
  | SenPlayer | `SenPlayer://x-callback-url/play?url=` | ✓ |
  | Infuse | `infuse://x-callback-url/play?url=` | ✓ |
  | Fileball | `filebox://play?url=` | ✓ |
  | VidHub | `vidhub://x-callback-url/play?url=` | ✓ |
  | IINA | `iina://weblink?url=` | ✓ |
  | Alook | `Alook://` | ✗ |
  | VLC | `vlc://` | ✗ |
  | KMPlayer | `kmplayer://` | ✗ |
  | NPlayer | `nplayer-http://` | ✗ |
  | Safari | 直开 http(s) 直链 | ✗ |
  | 自定义 | 用户输入 `myapp://play?url=` 格式 | 可选 |
- 下载默认 SenPlayer：`SenPlayer://x-callback-url/download?url=<编码>&name=<番号+标签>`（只有下载带 &name=，播放不带——参考脚本同款行为）。
- 脚本内要处理：body 重新编码后必须把 `content-encoding` 改 identity、删 `content-length`/`transfer-encoding`，否则页面乱码/截断。

## 修改/推送流程
1. 本地脚本在 `xasiat.js（本地）`；clone 在 `本地 clone`。
2. 测试：重新 curl 抓一个真实视频页 HTML，node 里模拟 `$request/$response/$done` 跑 eval，校验：注入脚本 `new Function()` 语法 OK、HD/SD 链接出现、scheme 齐全、`&name=` 是短文件名。
3. `cp` 到 clone 的 `JSBOX/` → commit → `git -c http.proxy=... -c https.proxy=... push origin master`（分支是 **master** 不是 main）。
4. 验证远端：raw 链接有 CDN 缓存（几分钟内可能返回旧版），用 `api.github.com/repos/.../contents/...` 取 blob 才是实时内容。
