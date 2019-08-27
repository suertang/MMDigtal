// @name         小可去转无限搜
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       suertang
// @match        https://www.xiaokesoso.com/*
// @match        https://www.quzhuanpan.com/download/*
// @grant        none
// ==/UserScript==




(function() {
    'use strict';

NodeList.prototype.remove=function(){
    this.forEach((item)=>item.parentNode.removeChild(item));
}

    // Your code here...
    document.querySelectorAll(".media-bottom> p:nth-child(1) > span:nth-child(4)").remove()
    document.querySelectorAll(".media-bottom> p:nth-child(1) > span:nth-child(4)").remove()
    const ele = document.querySelector('button[data-downloadurl]');
    if(ele){

        //const panurl = b64DecodeUnicode(ele.dataset.downloadurl);

        var jumpUrl = "http://norefer.mimixiaoke.com/api/jump?target=" + ele.dataset.downloadurl;
        window.location.href = jumpUrl;
    }
})();
