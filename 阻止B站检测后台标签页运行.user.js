// ==UserScript==
// @name         阻止B站检测后台标签页运行
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Prevent websites from detecting background tabs
// @match        https://live.bilibili.com/*
// @grant        none
// ==/UserScript==

(function() {
    Object.defineProperty(document, 'hidden', { value: false });
    Object.defineProperty(document, 'visibilityState', { value: 'visible' });
    window.requestAnimationFrame = (callback) => setTimeout(() => callback(performance.now()), 16);
})();