// ==UserScript==
// @name         小可去转无限搜
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       suertang
// @match        *://www.xiaokesoso.com/*
// @match        *://www.quzhuanpan.com/download/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // code here
    const ele = document.querySelector('button[data-downloadurl]');
    if(ele){
        const jumpUrl = "http://norefer.mimixiaoke.com/api/jump?target=" + ele.dataset.downloadurl;
        window.location.href = jumpUrl;
    }
})();
