// ==UserScript==
// @name         FuckReadMoreOnCSDN
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       suertang
// @match        https://blog.csdn.net/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // 去你的点击查看更多
    // Your code here...
    // Fuck you read more button
    const a = document.querySelector('a.btn-readmore');
    a.click();
})();
