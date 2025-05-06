// ==UserScript==
// @name         阻止B站检测后台标签页运行
// @namespace    http://tampermonkey.net/
// @homepage     https://github.com/QingFengM/Scripts/
// @version      0.1
// @description  阻止B站检测网页未处于前台运行时更改画质导致直播频繁卡顿
// @match        https://live.bilibili.com/*
// @icon         https://www.bilibili.com/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
    Object.defineProperty(document, 'hidden', { value: false });
    Object.defineProperty(document, 'visibilityState', { value: 'visible' });
    window.requestAnimationFrame = (callback) => setTimeout(() => callback(performance.now()), 16);
})();
