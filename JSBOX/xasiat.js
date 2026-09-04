(()=>{
const e=(()=>{const e=e=>e in globalThis;switch(!0){case e("$task"):return"Quantumult X";case e("$loon"):return"Loon";case e("$rocket"):return"Shadowrocket";case e("Egern"):return"Egern";case Boolean(globalThis.$environment?.["surge-version"]):return"Surge";case Boolean(globalThis.$environment?.["stash-version"]):return"Stash";case e("Cloudflare"):return"Worker";case Boolean(globalThis.process?.versions?.node):return"Node.js";default:return}})();
const t={info:(...e)=>console.log(...e.map(e=>`ℹ️ ${e}`)),warn:(...e)=>console.log(...e.map(e=>`⚠️ ${e}`)),error:(...e)=>console.log(...e.map(e=>`❌ ${e?.stack??e}`))};
const s={200:"OK",206:"Partial Content",302:"Found",304:"Not Modified",403:"Forbidden",404:"Not Found"};
function a(n={}){t.info(`🚩 执行结束! (${e})`);switch(e){case"Surge":case"Stash":$done(n);break;case"Loon":n.policy&&(n.node=n.policy),$done(n);break;case"Quantumult X":{const t=n;switch(typeof t.status){case"number":t.status=`HTTP/1.1 ${t.status} ${s[t.status]}`;break}t.body instanceof ArrayBuffer?(t.bodyBytes=t.body,t.body=void 0):ArrayBuffer.isView(t.body)&&(t.bodyBytes=t.body.buffer.slice(t.body.byteOffset,t.body.byteLength+t.byteOffset),t.body=void 0),$done(t);break}case"Egern":case"Shadowrocket":case"Worker":case"Node.js":default:$done?.(n);break}}
function decode(e){if(!e)return"";if("string"==typeof e)return e;if(e instanceof Uint8Array)return new TextDecoder().decode(e);if(e instanceof ArrayBuffer)return new TextDecoder().decode(new Uint8Array(e));return new TextDecoder().decode(new Uint8Array(e.buffer||e,e.byteOffset||0,e.byteLength))}
function i(e){const r=e.match(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']/i)||e.match(/<title[^>]*>\s*([^<]+?)\s*<\/title>/i),o=e.match(/PT(\d+)H(\d+)M(\d+)S/)||e.match(/duration"\s+content="(\d+)"/);let n="";o&&(void 0!==o[2]?n=`(${o[1]}h${o[2]}m${o[3]}s)`:(n=`(${Math.floor(parseInt(o[1],10)/3600)}h${Math.floor(parseInt(o[1],10)%3600/60)}m${parseInt(o[1],10)%60}s)`));const t=r?r[1].trim():"";let sn="video";const m=t.match(/^([A-Z]{2,6}-?\d+[A-Z]?(?:\s*\[[^\]]+\])?)/);m?sn=m[1]:t&&(sn=t.slice(0,40));return{title:t,dur:n,sn,hd:(e.match(/video_alt_url\s*:\s*'([^']+)'/)||[])[1],sd:(e.match(/video_url\s*:\s*'([^']+)'/)||[])[1]}}
function u(e={hd:"",sd:"",title:"",dur:""}){const n=(e.title||"xasiat_video").replace(/[\\/:*?"<>|\u0000-\u001f]/g,"_").replace(/\s+/g," ").trim().slice(0,80),p={h:e.hd,t:e.sn||e.title};return`
<div id="xsp" style="position:fixed;left:0;right:0;bottom:0;z-index:2147483647;background:#111;color:#fff;font-size:14px;line-height:1.4;box-shadow:0 -4px 16px rgba(0,0,0,.5);display:flex;align-items:center;gap:8px;padding:10px 12px;max-width:100%;">
<span style="flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:13px;">\u{1F3AC} ${e.title}${e.dur?` <span style="color:#888;">${e.dur}</span>`:""}</span>
<button id="xop" style="background:#e94560;border:none;color:#fff;padding:10px 18px;border-radius:8px;font-size:15px;cursor:pointer;flex-shrink:0;">\u25B6 播放</button>
<button id="xod" style="background:#0f3460;border:none;color:#fff;padding:10px 18px;border-radius:8px;font-size:15px;cursor:pointer;flex-shrink:0;">\u2B07 下载</button>
<button id="xsc" style="background:#333;border:none;color:#fff;width:30px;height:30px;border-radius:50%;font-size:18px;cursor:pointer;flex-shrink:0;">&times;</button>
</div>
<div id="xo" style="display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.85);z-index:2147483647;justify-content:center;align-items:center;">
<div style="background:#1a1a2e;border-radius:16px;padding:32px;max-width:420px;width:90%;color:#fff;box-shadow:0 8px 32px rgba(0,0,0,0.5);">
<h3 style="margin:0 0 20px;font-size:20px;text-align:center;">选择播放器</h3>
<select id="xo-p" style="width:100%;padding:12px;border-radius:8px;background:#16213e;border:1px solid #0f3460;color:#fff;font-size:15px;margin-bottom:16px;outline:none;">
<option value="lenna">lenna</option><option value="SenPlayer">SenPlayer</option><option value="Infuse">Infuse</option><option value="Fileball">Fileball</option><option value="VidHub">VidHub</option><option value="IINA">IINA</option><option value="Alook">Alook</option><option value="VLC">VLC</option><option value="KMPlayer">KMPlayer</option><option value="NPlayer">NPlayer</option><option value="Safari">Safari</option><option value="custom">自定义...</option>
</select>
<div id="xo-cw" style="display:none;margin-bottom:16px;">
<input id="xo-cs" type="text" placeholder="自定义播放 scheme 如 myapp://play?url=" style="width:100%;padding:10px;border-radius:8px;background:#16213e;border:1px solid #0f3460;color:#fff;font-size:14px;outline:none;" />
<label style="display:flex;align-items:center;gap:8px;margin-top:8px;font-size:14px;color:#aaa;"><input id="xo-ce" type="checkbox" checked /> URL编码</label>
</div>
<label style="display:flex;align-items:center;gap:8px;margin-bottom:16px;font-size:14px;color:#aaa;"><input id="xo-et" type="checkbox" checked /> URL编码 (默认开启)</label>
<hr style="border:none;border-top:1px solid #333;margin:16px 0;" />
<h3 style="margin:0 0 12px;font-size:16px;color:#aaa;">下载工具</h3>
<select id="xo-d" style="width:100%;padding:12px;border-radius:8px;background:#16213e;border:1px solid #0f3460;color:#fff;font-size:15px;margin-bottom:16px;outline:none;">
<option value="SenPlayer-dl">SenPlayer (默认)</option><option value="custom-dl">自定义...</option>
</select>
<div id="xo-dw" style="display:none;margin-bottom:16px;">
<input id="xo-ds" type="text" placeholder="自定义下载 scheme 如 myapp://download?url=" style="width:100%;padding:10px;border-radius:8px;background:#16213e;border:1px solid #0f3460;color:#fff;font-size:14px;outline:none;" />
<label style="display:flex;align-items:center;gap:8px;margin-top:8px;font-size:14px;color:#aaa;"><input id="xo-de" type="checkbox" checked /> URL编码</label>
</div>
<div style="display:flex;gap:12px;">
<button id="xo-cancel" style="flex:1;padding:12px;border-radius:8px;background:#333;border:none;color:#fff;font-size:15px;cursor:pointer;">取消</button>
<button id="xo-play" style="flex:1;padding:12px;border-radius:8px;background:#e94560;border:none;color:#fff;font-size:15px;cursor:pointer;font-weight:600;">播放</button>
<button id="xo-dl" style="flex:1;padding:12px;border-radius:8px;background:#0f3460;border:none;color:#fff;font-size:15px;cursor:pointer;font-weight:600;">下载</button>
</div>
</div>
</div>
<script>
(function(){
var D=${JSON.stringify(p)},K="xasiat_player";
var PLAYERS={lenna:{scheme:"lenna://x-callback-url/play?url=",e:1},SenPlayer:{scheme:"SenPlayer://x-callback-url/play?url=",e:1},Infuse:{scheme:"infuse://x-callback-url/play?url=",e:1},"SenPlayer-dl":{scheme:"SenPlayer://x-callback-url/download?url=",e:1,n:1},Fileball:{scheme:"filebox://play?url=",e:1},VidHub:{scheme:"vidhub://x-callback-url/play?url=",e:1},IINA:{scheme:"iina://weblink?url=",e:1},Alook:{scheme:"Alook://",e:0},VLC:{scheme:"vlc://",e:0},KMPlayer:{scheme:"kmplayer://",e:0},NPlayer:{scheme:"nplayer-http://",e:0},Safari:{scheme:"http://",e:0}};
var panel=document.getElementById("xsp"),ov=document.getElementById("xo"),ps=document.getElementById("xo-p"),cw=document.getElementById("xo-cw"),cs=document.getElementById("xo-cs"),ce=document.getElementById("xo-ce"),et=document.getElementById("xo-et"),dsel=document.getElementById("xo-d"),dw=document.getElementById("xo-dw"),ds=document.getElementById("xo-ds"),de=document.getElementById("xo-de");
document.getElementById("xsc").onclick=function(){panel.style.display="none"};
document.getElementById("xop").onclick=function(){ov.style.display="flex"};
document.getElementById("xod").onclick=function(){ov.style.display="flex"};
try{var sv=JSON.parse(localStorage.getItem(K)||"{}");
if(sv.player&&PLAYERS[sv.player])ps.value=sv.player;
else if(sv.player==="custom"){ps.value="custom";cw.style.display="block";cs.value=sv.customScheme||"";ce.checked=sv.customEncode!==false}
if(sv.needEncode!==undefined)et.checked=sv.needEncode;
if(sv.downloadPlayer==="custom-dl"){dsel.value="custom-dl";dw.style.display="block";ds.value=sv.customDlScheme||"";de.checked=sv.customDlEncode!==false}}catch(e){}
ps.onchange=function(){cw.style.display=ps.value==="custom"?"block":"none"};
dsel.onchange=function(){dw.style.display=dsel.value==="custom-dl"?"block":"none"};
function save(){try{localStorage.setItem(K,JSON.stringify({player:ps.value,customScheme:cs.value,customEncode:ce.checked,needEncode:et.checked,downloadPlayer:dsel.value,customDlScheme:ds.value,customDlEncode:de.checked}))}catch(e){}}
function go(mode){save();
var sc,en,nm;
if(mode==="play"){if(ps.value==="custom"){sc=cs.value;en=ce.checked}else{sc=PLAYERS[ps.value].scheme;en=et.checked&&!!PLAYERS[ps.value].e;nm=!!PLAYERS[ps.value].n}}
else{if(dsel.value==="custom-dl"){sc=ds.value;en=de.checked}else{sc=PLAYERS["SenPlayer-dl"].scheme;en=true;nm=true}}
if(!sc){alert("请填写 scheme");return}
var f=sc+(en?encodeURIComponent(D.h):D.h);
if(sc==="http://")f=D.h;
if(nm)f+="&name="+encodeURIComponent(D.t||"video");
ov.style.display="none";
window.location.href=f}
document.getElementById("xo-cancel").onclick=function(){ov.style.display="none"};
document.getElementById("xo-play").onclick=function(){go("play")};
document.getElementById("xo-dl").onclick=function(){go("dl")};
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
