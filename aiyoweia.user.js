// ==UserScript==
// @name         aiyoweiaJumper
// @namespace    http://woodytang.com/
// @version      0.1
// @description  Skip aiyoweia search engine
// @author       suertang
// @match        *://www.aiyoweia.com/*.shtml
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    window.location = atob(document.querySelector('a[rel]').href.match(/(aHR.*?)$/)[1])
})();
