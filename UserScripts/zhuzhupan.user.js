// ==UserScript==
// @name         zhuzhupan
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       You
// @match        http://www.zhuzhupan.com/search*
// @updateURL    https://github.com/suertang/MMDigtal/raw/master/zhuzhupan.user.js
// @downloadURL  https://github.com/suertang/MMDigtal/raw/master/zhuzhupan.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    const query=window.location.href.match(/query=(\S*?)&/)[1];
    //console.log(s==1)
    if(query && document.querySelector("a[onclick^='showPay']")){
    console.log('jump');
        window.location.href='http://www.zhuzhupan.com/paysuccess?id='+query +'||_||&_t='+Date.parse(new Date())
    }
})();
