// ==UserScript==
// @name         阻止B站检测后台标签页运行
// @namespace    http://tampermonkey.net/
// @homepage     https://github.com/QingFengM/Scripts/
// @version      0.1
// @description  阻止B站检测网页未处于当前页面运行时偷偷自动更改画质导致直播画面声音中断重连频繁卡顿
// @match        https://live.bilibili.com/*
// @grant        none
// ==/UserScript==

(function() {
    Object.defineProperty(document, 'hidden', { value: false });
    Object.defineProperty(document, 'visibilityState', { value: 'visible' });
    window.requestAnimationFrame = (callback) => setTimeout(() => callback(performance.now()), 16);
})();
