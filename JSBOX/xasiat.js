(()=>{
const e=(()=>{const e=e=>e in globalThis;switch(!0){case e("$task"):return"Quantumult X";case e("$loon"):return"Loon";case e("$rocket"):return"Shadowrocket";case e("Egern"):return"Egern";case Boolean(globalThis.$environment?.["surge-version"]):return"Surge";case Boolean(globalThis.$environment?.["stash-version"]):return"Stash";case e("Cloudflare"):return"Worker";case Boolean(globalThis.process?.versions?.node):return"Node.js";default:return}})();
const t={info:(...e)=>console.log(...e.map(e=>`ℹ️ ${e}`)),warn:(...e)=>console.log(...e.map(e=>`⚠️ ${e}`)),error:(...e)=>console.log(...e.map(e=>`❌ ${e?.stack??e}`))};
const s={200:"OK",206:"Partial Content",302:"Found",304:"Not Modified",403:"Forbidden",404:"Not Found"};
function a(n={}){t.info(`🚩 执行结束! (${e})`);switch(e){case"Surge":case"Stash":$done(n);break;case"Loon":n.policy&&(n.node=n.policy),$done(n);break;case"Quantumult X":{const t=n;switch(typeof t.status){case"number":t.status=`HTTP/1.1 ${t.status} ${s[t.status]}`;break}t.body instanceof ArrayBuffer?(t.bodyBytes=t.body,t.body=void 0):ArrayBuffer.isView(t.body)&&(t.bodyBytes=t.body.buffer.slice(t.body.byteOffset,t.body.byteLength+t.byteOffset),t.body=void 0),$done(t);break}case"Egern":case"Shadowrocket":case"Worker":case"Node.js":default:$done?.(n);break}}
function decode(e){if(!e)return"";if("string"==typeof e)return e;if(e instanceof Uint8Array)return new TextDecoder().decode(e);if(e instanceof ArrayBuffer)return new TextDecoder().decode(new Uint8Array(e));return new TextDecoder().decode(new Uint8Array(e.buffer||e,e.byteOffset||0,e.byteLength))}
function i(e){const r=e.match(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']/i)||e.match(/<title[^>]*>\s*([^<]+?)\s*<\/title>/i),o=e.match(/PT(\d+)H(\d+)M(\d+)S/)||e.match(/duration"\s+content="(\d+)"/);let n="";o&&(void 0!==o[2]?n=`(${o[1]}h${o[2]}m${o[3]}s)`:(n=`(${Math.floor(parseInt(o[1],10)/3600)}h${Math.floor(parseInt(o[1],10)%3600/60)}m${parseInt(o[1],10)%60}s)`));return{title:r?r[1].trim():"",dur:n,hd:(e.match(/video_alt_url\s*:\s*'([^']+)'/)||[])[1],sd:(e.match(/video_url\s*:\s*'([^']+)'/)||[])[1]}}
function u(e={hd:"",sd:"",title:"",dur:""}){const n=(e.title||"xasiat_video").replace(/[\\/:*?"<>|\u0000-\u001f]/g,"_").replace(/\s+/g," ").trim().slice(0,80);return`
<div id="xsp" style="position:fixed;left:0;right:0;bottom:0;z-index:2147483647;background:#111;color:#fff;font-size:14px;line-height:1.5;box-shadow:0 -4px 16px rgba(0,0,0,.5);max-height:46vh;overflow:auto;">
<div style="display:flex;align-items:center;padding:8px 12px;border-bottom:1px solid #333;"><span style="flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">\u{1F3AC} ${e.title}${e.dur?` <span style="color:#888;">${e.dur}</span>`:""}</span><button id="xsc" style="background:#333;border:none;color:#fff;width:30px;height:30px;border-radius:50%;font-size:18px;cursor:pointer;">&times;</button></div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:10px 12px;">
<button id="xph" style="background:#e53935;border:none;color:#fff;padding:12px;border-radius:8px;font-size:15px;cursor:pointer;">\u25B6 播放 HD</button>
<button id="xps" style="background:#f9a825;border:none;color:#000;padding:12px;border-radius:8px;font-size:15px;cursor:pointer;">\u25B6 播放 SD</button>
<button id="xoh" style="background:#1e88e5;border:none;color:#fff;padding:12px;border-radius:8px;font-size:15px;cursor:pointer;">\u{1F4F1} 用App打开 HD</button>
<button id="xos" style="background:#43a047;border:none;color:#fff;padding:12px;border-radius:8px;font-size:15px;cursor:pointer;">\u{1F4F1} 用App打开 SD</button>
<button id="xdh" style="background:#7b1fa2;border:none;color:#fff;padding:12px;border-radius:8px;font-size:15px;cursor:pointer;">\u2B07 下载 HD</button>
<button id="xds" style="background:#546e7a;border:none;color:#fff;padding:12px;border-radius:8px;font-size:15px;cursor:pointer;">\u2B07 下载 SD</button>
<button id="xch" style="background:#37474f;border:none;color:#fff;padding:12px;border-radius:8px;font-size:13px;cursor:pointer;">\u{1F4CB} 复制 HD 地址</button>
<button id="xcs" style="background:#37474f;border:none;color:#fff;padding:12px;border-radius:8px;font-size:13px;cursor:pointer;">\u{1F4CB} 复制 SD 地址</button>
</div>
<div style="padding:0 12px 10px;color:#999;font-size:12px;">直链带时效 token, 过期后刷新页面重新获取</div>
</div>
<div id="xpl" style="position:fixed;top:0;left:0;width:100%;height:100vh;z-index:2147483646;background:#000;display:none;">
<video id="xv" style="width:100%;height:100%;object-fit:contain;" controls autoplay playsinline></video>
<button id="xpcl" style="position:absolute;top:12px;right:12px;background:rgba(255,255,255,.25);border:none;color:#fff;font-size:22px;width:44px;height:44px;border-radius:50%;cursor:pointer;">&times;</button>
</div>
<script>
(function(){var D=${JSON.stringify({h:e.hd,s:e.sd,nh:n+"[HD].mp4",ns:n+"[SD].mp4"})},P="x-player://";var p=document.getElementById("xsp"),l=document.getElementById("xpl"),v=document.getElementById("xv");
document.getElementById("xsc").onclick=function(){p.style.display="none"};
function pl(s){if(!s)return;p.style.display="none";v.src=s;l.style.display="block";v.play().catch(function(){})}
document.getElementById("xpcl").onclick=function(){v.pause();v.removeAttribute("src");v.load();l.style.display="none"};
document.getElementById("xph").onclick=function(){pl(D.h)};document.getElementById("xps").onclick=function(){pl(D.s)};
function op(u){if(!u)return;var a=document.createElement("a");a.href=P+u;a.target="_blank";document.body.appendChild(a);a.click();a.remove()}
document.getElementById("xoh").onclick=function(){op(D.h)};document.getElementById("xos").onclick=function(){op(D.s)};
function dl(u,n){if(!u)return;var a=document.createElement("a");a.href=u;a.download=n;a.target="_blank";document.body.appendChild(a);a.click();a.remove()}
document.getElementById("xdh").onclick=function(){dl(D.h,D.nh)};document.getElementById("xds").onclick=function(){dl(D.s,D.ns)};
function cp(t){if(!t)return;function fb(){var ta=document.createElement("textarea");ta.value=t;ta.style.position="fixed";ta.style.left="-9999px";document.body.appendChild(ta);ta.select();try{document.execCommand("copy");alert("已复制")}catch(e){prompt("长按复制",t)}ta.remove()}navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(t).then(function(){alert("已复制")},fb):fb()}
document.getElementById("xch").onclick=function(){cp(D.h)};document.getElementById("xcs").onclick=function(){cp(D.s)};
})()<\/script>`}
(async()=>{
try{
const r=(()=>{try{return"undefined"!=typeof $response?$response:void 0}catch{return}})();
if(!r)return a($request);
const n=r.url||$request?.url||"";
if(!/\/videos\/\d+/.test(n))return a(r);
t.info(`[xasiat] ${n}`);
let b=decode(r.body);
if(!b)return a(r);
const d=i(b);
if(!d.hd&&!d.sd)return t.warn("[xasiat] 未找到 video_url / video_alt_url"),a(r);
t.info(`[xasiat] 解析成功: ${d.title} ${d.dur} HD=${!!d.hd} SD=${!!d.sd}`);
const inj=u(d);
b=-1!==b.indexOf("</body>")?b.replace("</body>",inj+"\n</body>"):b+inj;
r.body=e==="Quantumult X"?new TextEncoder().encode(b).buffer:new TextEncoder().encode(b);
const hd=r.headers||{};Object.keys(hd).forEach(k=>{if(/^content-?encoding$/i.test(k))hd[k]="identity";if(/^content-?length$/i.test(k))delete hd[k];if(/^transfer-?encoding$/i.test(k))delete hd[k]});
a(r);
}catch(err){t.error(err);a({})}})();
})();
