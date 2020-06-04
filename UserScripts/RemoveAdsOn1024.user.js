// ==UserScript==
// @name         RemoveAdsOn1024
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       suertang
// @match        *htm_data*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    
    const src = document.body.textContent.match(/img\[(.*?)\]/)[1];
    document.querySelectorAll('img[' + src +']').forEach(i=>{i.src=i.getAttribute(src).replace(/^http:/,'https:')});
    document.querySelectorAll('div.tpc_content.do_not_catch a').forEach(i=>{i.href=i.href.replace(/https?:\/\/www.viidii.info\/\?(\S*?)&z/,"$1").replace(/______/g,".")})
})();
