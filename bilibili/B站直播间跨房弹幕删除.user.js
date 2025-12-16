// ==UserScript==
// @name         B站直播间跨房弹幕删除
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  删除跨房弹幕
// @author       deepseek
// @match        https://live.bilibili.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 观察DOM变化，处理动态加载的弹幕
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length) {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) { // 元素节点
                        // 检查是否是弹幕元素
                        if (node.classList && node.classList.contains('chat-item')) {
                            processDanmaku(node);
                        }
                        // 检查子节点中的弹幕元素
                        if (node.querySelectorAll) {
                            const danmakuItems = node.querySelectorAll('.chat-item.danmaku-item');
                            danmakuItems.forEach(processDanmaku);
                        }
                    }
                });
            }
        });
    });

    // 处理单个弹幕元素
    function processDanmaku(danmakuItem) {
        // 检查是否包含跨房弹幕标识
        const mirrorTag = danmakuItem.querySelector('.uni-live-prefix-tag.uni-live-mirror-tag');

        // 如果检测到跨房弹幕标识，则删除整个弹幕元素
        if (mirrorTag) {
            // 删除整个弹幕元素
            danmakuItem.remove();
        }
        // 如果没有检测到跨房弹幕标识，则不进行任何操作
    }

    // 初始化处理已存在的弹幕
    function init() {
        const existingDanmaku = document.querySelectorAll('.chat-item.danmaku-item');
        existingDanmaku.forEach(processDanmaku);

        // 开始观察DOM变化
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // 页面加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
