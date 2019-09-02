// ==UserScript==
// @name         zhuzhupan
// @namespace    http://woodytang.com/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://www.zhuzhupan.com/search*
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
