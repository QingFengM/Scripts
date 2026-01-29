// ==UserScript==
// @name         Bilibili 新标签页打开视频
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  让B站视频播放页总是在新标签页打开
// @author       You
// @match        *://*.bilibili.com/video/*
// @icon         https://www.bilibili.com/favicon.ico
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    // 处理链接点击的核心函数
    function openInNewTab(e) {
        // 找到最外层的a标签
        let target = e.target;
        while (target && target.tagName !== 'A') {
            target = target.parentElement;
        }

        // 如果找到a标签且是视频播放页链接
        if (target && target.href) {
            // 匹配B站视频播放页链接 (av/bv号)
            const videoUrlRegex = /^https?:\/\/(www\.)?bilibili\.com\/video\/(av|bv|BV)\w+/;
            // 匹配直播播放页链接
            const liveUrlRegex = /^https?:\/\/(live\.)?bilibili\.com\/(bl|h|live)\/?/;

            // 如果是视频或直播播放页链接
            if (videoUrlRegex.test(target.href) || liveUrlRegex.test(target.href)) {
                // 阻止默认跳转行为
                e.preventDefault();
                e.stopPropagation();

                // 在新标签页打开链接
                window.open(target.href, '_blank');
            }
        }
    }

    // 初始化监听
    function initListener() {
        // 为整个文档添加点击监听（事件委托）
        document.addEventListener('click', openInNewTab, true);

        // 监听动态加载的内容（使用MutationObserver）
        const observer = new MutationObserver(() => {
            // 内容变化时无需重复绑定，事件委托会自动处理
        });

        // 观察整个文档的子节点变化
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // 页面加载完成后初始化
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        initListener();
    } else {
        document.addEventListener('DOMContentLoaded', initListener);
    }

})();
