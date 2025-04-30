// ==UserScript==
// @name         B站直播搜索框清理
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  删除B站直播搜索框中的默认搜索词
// @author       none
// @match        https://live.bilibili.com/*
// @icon         https://www.bilibili.com/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function cleanSearchBox() {
        // 查找搜索框元素
        const searchInput = document.querySelector('input[name="keyword"]');
        if (searchInput) {
            // 删除title和placeholder属性
            searchInput.removeAttribute('title');
            searchInput.removeAttribute('placeholder');
        }
    }

    // 页面加载完成后执行
    window.addEventListener('load', cleanSearchBox);

    // 使用MutationObserver监听DOM变化，以防搜索框是动态加载的
    const observer = new MutationObserver(function(mutations) {
        cleanSearchBox();
    });

    // 开始观察整个body及其子元素的变化
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();
