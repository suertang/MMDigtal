/* xasiat.js - 为 Surge / Stash / Loon / QX / Egern / Shadowrocket 的 header 重写脚本
 * 拦截 https://www.xasiat.com/videos/<id>/... 页面响应
 * 解析 video_url (SD) / video_alt_url (Source HD) / 标题 / 时长
 * 注入悬浮面板: 全屏播放 / 用App打开 / 下载HD / 下载SD / 复制地址
 *
 * 规则示例:
 *   Surge:        header, ^https?://(www\.)?xasiat\.com/videos/\d+/.* , script-path=/scripts/xasiat.js, requires-body=true, timeout=15
 *   Stash:        header, ^https?://(www\.)?xasiat\.com/videos/\d+/.* , script=/scripts/xasiat.js, requires-body=true, timeout=15
 *   Loon:         header, ^https?://(www\.)?xasiat\.com/videos/\d+/.* , script-file=/scripts/xasiat.js, requires-body=true, timeout=15
 *   Quantumult X: header, ^https?://(www\.)?xasiat\.com/videos/\d+/.* , script-file=/scripts/xasiat.js, requires-body=true
 *   Egern:        header, ^https?://(www\.)?xasiat\.com/videos/\d+/.* , script-file=/scripts/xasiat.js, requires-body=true
 */

// ============ 环境检测 (与参考脚本一致) ============
const ENV = (() => {
  const has = (k) => k in globalThis;
  switch (true) {
    case has("$task"): return "Quantumult X";
    case has("$loon"): return "Loon";
    case has("$rocket"): return "Shadowrocket";
    case has("Egern"): return "Egern";
    case Boolean(globalThis.$environment?.["surge-version"]): return "Surge";
    case Boolean(globalThis.$environment?.["stash-version"]): return "Stash";
    case has("Cloudflare"): return "Worker";
    case Boolean(globalThis.process?.versions?.node): return "Node.js";
    default: return;
  }
})();

const STATUS_TEXT = {
  200: "OK", 206: "Partial Content", 301: "Moved Permanently", 302: "Found",
  304: "Not Modified", 403: "Forbidden", 404: "Not Found", 502: "Bad Gateway",
};

const log = {
  info: (...a) => console.log(...a.map((x) => `ℹ️ ${typeof x === "object" ? JSON.stringify(x) : x}`)),
  warn: (...a) => console.log(...a.map((x) => `⚠️ ${typeof x === "object" ? JSON.stringify(x) : x}`)),
  error: (...a) => console.log(...a.map((x) => `❌ ${typeof x === "object" ? JSON.stringify(x) : x}`)),
};

// ============ 各平台 $done 收尾 ============
function finish(response = {}) {
  log.info(`🚩 执行结束! (${ENV})`);
  switch (ENV) {
    case "Surge":
      $done(response);
      break;
    case "Stash":
      $done(response);
      break;
    case "Loon":
      if (response.policy) response.node = response.policy;
      $done(response);
      break;
    case "Quantumult X": {
      const r = { ...response };
      if (typeof r.status === "number") r.status = `HTTP/1.1 ${r.status} ${STATUS_TEXT[r.status] || ""}`;
      if (r.body instanceof ArrayBuffer) { r.bodyBytes = r.body; r.body = undefined; }
      else if (ArrayBuffer.isView(r.body)) { r.bodyBytes = r.body.buffer.slice(r.body.byteOffset, r.body.byteLength + r.body.byteOffset); r.body = undefined; }
      $done(r);
      break;
    }
    case "Egern":
    case "Shadowrocket":
    case "Worker":
    case "Node.js":
    default:
      $done?.(response);
      break;
  }
}

// ============ 工具函数 ============
function decodeBody(body) {
  if (!body) return "";
  if (typeof body === "string") return body;
  if (body instanceof Uint8Array) return new TextDecoder().decode(body);
  if (body instanceof ArrayBuffer) return new TextDecoder().decode(new Uint8Array(body));
  if (body.buffer) return new TextDecoder().decode(new Uint8Array(body.buffer || body, body.byteOffset || 0, body.byteLength));
  return String(body);
}

function strToUtf8(s) {
  const bytes = new TextEncoder().encode(s);
  return ENV === "Quantumult X" ? bytes.buffer : bytes;
}

// 从 HTML 中提取 video_url / video_alt_url / 标题 / 时长
function parsePage(html) {
  const pick = (name) => {
    const m = html.match(new RegExp(`${name}\\s*:\\s*'([^']+)'`));
    return m ? m[1] : null;
  };
  const titleM = html.match(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']/i)
    || html.match(/<title[^>]*>\s*([^<]+?)\s*<\/title>/i);
  const durM = html.match(/duration"\s+content="(\d+)"/i)
    || html.match(/PT(\d+)H(\d+)M(\d+)S/);
  let duration = null;
  if (durM) {
    if (durM[2] !== undefined) {
      duration = `${durM[1]}h${durM[2]}m${durM[3]}s`; // PT1H59M28S 格式
    } else {
      const sec = parseInt(durM[1], 10); // 纯秒数格式
      duration = `${Math.floor(sec / 3600)}h${Math.floor((sec % 3600) / 60)}m${sec % 60}s`;
    }
  }
  return {
    sd: pick("video_url"),
    hd: pick("video_alt_url"),
    title: titleM ? titleM[1].trim() : null,
    duration,
  };
}

// 文件名净化
function makeName(title, tag) {
  const safe = (title || "xasiat_video")
    .replace(/[\\/:*?"<>|\u0000-\u001f]/g, "_")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 80);
  return `${safe}[${tag}].mp4`;
}

// ============ 注入到页面的悬浮面板 + 全屏播放器 ============
function buildInjector(data) {
  const payload = JSON.stringify(data);
  return `
<div id="xs-panel" style="position:fixed;left:0;right:0;bottom:0;z-index:2147483647;background:#111;color:#fff;font-size:14px;line-height:1.5;box-shadow:0 -4px 16px rgba(0,0,0,.5);max-height:46vh;overflow:auto;">
  <div style="display:flex;align-items:center;padding:8px 12px;border-bottom:1px solid #333;">
    <span style="flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">\u{1F3AC} ${data.title || ""} <span style="color:#888;">${data.duration ? "(" + data.duration + ")" : ""}</span></span>
    <button id="xs-close" style="background:#333;border:none;color:#fff;width:30px;height:30px;border-radius:50%;font-size:18px;cursor:pointer;">&times;</button>
  </div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:10px 12px;">
    <button id="xs-play-hd" class="xs-btn" style="background:#e53935;border:none;color:#fff;padding:12px;border-radius:8px;font-size:15px;cursor:pointer;">\u25B6 播放 (HD 源)</button>
    <button id="xs-play-sd" class="xs-btn" style="background:#f9a825;border:none;color:#000;padding:12px;border-radius:8px;font-size:15px;cursor:pointer;">\u25B6 播放 (SD)</button>
    <button id="xs-open-hd" style="background:#1e88e5;border:none;color:#fff;padding:12px;border-radius:8px;font-size:15px;cursor:pointer;">\u{1F4F1} 用App打开 (HD)</button>
    <button id="xs-open-sd" style="background:#43a047;border:none;color:#fff;padding:12px;border-radius:8px;font-size:15px;cursor:pointer;">\u{1F4F1} 用App打开 (SD)</button>
    <button id="xs-dl-hd" style="background:#7b1fa2;border:none;color:#fff;padding:12px;border-radius:8px;font-size:15px;cursor:pointer;">\u2B07 下载 HD 源</button>
    <button id="xs-dl-sd" style="background:#546e7a;border:none;color:#fff;padding:12px;border-radius:8px;font-size:15px;cursor:pointer;">\u2B07 下载 SD</button>
    <button id="xs-copy-hd" style="background:#37474f;border:none;color:#fff;padding:12px;border-radius:8px;font-size:13px;cursor:pointer;">\u{1F4CB} 复制 HD 地址</button>
    <button id="xs-copy-sd" style="background:#37474f;border:none;color:#fff;padding:12px;border-radius:8px;font-size:13px;cursor:pointer;">\u{1F4CB} 复制 SD 地址</button>
  </div>
  <div style="padding:0 12px 10px;color:#999;font-size:12px;">提示: 直链带时效 token, 过期后刷新页面重新获取。下载/打开走系统网络, 若失败请确认直连可访问 xascdn.li。</div>
</div>
<div id="xs-player" style="position:fixed;top:0;left:0;width:100%;height:100vh;z-index:2147483646;background:#000;display:none;">
  <video id="xs-video" style="width:100%;height:100%;object-fit:contain;" controls autoplay playsinline></video>
  <button id="xs-pclose" style="position:absolute;top:12px;right:12px;background:rgba(255,255,255,.25);border:none;color:#fff;font-size:22px;width:44px;height:44px;border-radius:50%;cursor:pointer;">&times;</button>
</div>
<script>
(function () {
  var D = ${payload};
  var panel = document.getElementById("xs-panel");
  var player = document.getElementById("xs-player");
  var video = document.getElementById("xs-video");

  function closePanel() { panel.style.display = "none"; }
  document.getElementById("xs-close").onclick = closePanel;

  function play(src, label) {
    if (!src) { alert("未解析到 " + label + " 地址"); return; }
    panel.style.display = "none";
    video.src = src;
    player.style.display = "block";
    video.play().catch(function () {});
  }
  document.getElementById("xs-pclose").onclick = function () {
    video.pause(); video.removeAttribute("src"); video.load();
    player.style.display = "none";
  };
  document.getElementById("xs-play-hd").onclick = function () { play(D.hd, "HD"); };
  document.getElementById("xs-play-sd").onclick = function () { play(D.sd, "SD"); };

  function openWithApp(url, label) {
    if (!url) { alert("未解析到 " + label + " 地址"); return; }
    // 新开 tab 导航到直链: WebView 会触发系统"打开/下载"选择
    var a = document.createElement("a");
    a.href = url; a.target = "_blank"; a.rel = "noopener";
    document.body.appendChild(a); a.click(); a.remove();
  }
  document.getElementById("xs-open-hd").onclick = function () { openWithApp(D.hd, "HD"); };
  document.getElementById("xs-open-sd").onclick = function () { openWithApp(D.sd, "SD"); };

  function download(url, name, label) {
    if (!url) { alert("未解析到 " + label + " 地址"); return; }
    var a = document.createElement("a");
    a.href = url; a.download = name; a.target = "_blank";
    document.body.appendChild(a); a.click(); a.remove();
  }
  document.getElementById("xs-dl-hd").onclick = function () { download(D.hd, D.nameHd, "HD"); };
  document.getElementById("xs-dl-sd").onclick = function () { download(D.sd, D.nameSd, "SD"); };

  function copyText(text, label) {
    if (!text) { alert("未解析到 " + label + " 地址"); return; }
    function fallback() {
      var ta = document.createElement("textarea");
      ta.value = text; ta.style.position = "fixed"; ta.style.left = "-9999px";
      document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); alert("已复制 " + label + " 地址"); }
      catch (e) { prompt("长按复制 " + label + " 地址:", text); }
      ta.remove();
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { alert("已复制 " + label + " 地址"); }, fallback);
    } else fallback();
  }
  document.getElementById("xs-copy-hd").onclick = function () { copyText(D.hd, "HD"); };
  document.getElementById("xs-copy-sd").onclick = function () { copyText(D.sd, "SD"); };
})();
<\/script>`;
}

// ============ 主流程 ============
let result;
let isResponse = false;

(async () => {
  const response = (() => { try { return typeof $response !== "undefined" ? $response : void 0; } catch { return; } })();

  if (response) {
    isResponse = true;
    const url = ($request && $request.url) || "";
    log.info(`[xasiat] Response: ${url}`);

    if (/\/videos\/\d+/.test(url)) {
      let html = decodeBody(response.body);
      if (html) {
        const data = parsePage(html);
        if (data.hd || data.sd) {
          data.nameHd = makeName(data.title, "HD");
          data.nameSd = makeName(data.title, "SD");
          log.info("[xasiat] 解析成功", `标题: ${data.title}`, `时长: ${data.duration}`, `HD: ${data.hd ? "✅" : "❌"}`, `SD: ${data.sd ? "✅" : "❌"}`);

          const injector = buildInjector(data);
          html = html.includes("</body>") ? html.replace("</body>", injector + "\n</body>") : html + injector;
          response.body = strToUtf8(html);

          // 去掉压缩头, 避免长度不匹配
          const headers = response.headers || {};
          for (const k of Object.keys(headers)) {
            if (/^content-?encoding$/i.test(k)) headers[k] = "identity";
            if (/^content-?length$/i.test(k)) delete headers[k];
            if (/^transfer-?encoding$/i.test(k)) delete headers[k];
          }
          result = response;
        } else {
          log.warn("[xasiat] 未在页面中找到 video_url / video_alt_url");
        }
      }
    }
    if (!result) result = response;
  }

  // 收尾
  switch (typeof result) {
    case "object":
      finish(result);
      break;
    case "undefined":
      finish($request);
      break;
    default:
      finish({});
  }
})().catch((e) => {
  log.error(e?.stack || e);
  finish({});
});
