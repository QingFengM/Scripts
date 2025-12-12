// ==UserScript==
// @name         B站直播间跨房弹幕标识修改
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  修改跨房弹幕标识为文本并调整用户名显示样式
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
        // 修改跨房弹幕标识为文本
        const mirrorTag = danmakuItem.querySelector('.uni-live-prefix-tag.uni-live-mirror-tag');
        if (mirrorTag) {
            // 修改文本内容（可选）
            mirrorTag.textContent = '跨房';

            // 修改样式为文本
            mirrorTag.style.cssText = `
                color: #9499a0 !important;
                background: transparent !important;
                border: none !important;
                padding: 0 !important;
                margin-right: 4px !important;
                font-weight: normal !important;
                font-size: inherit !important;
                display: inline-block !important;
                vertical-align: baseline !important;
                line-height: normal !important;
            `;

            // 移除所有类名，只保留必要的基本样式
            mirrorTag.className = 'uni-live-prefix-tag';
        }

        // 获取用户名
        const username = danmakuItem.getAttribute('data-uname');

        // 找到用户名容器
        const nameWrapper = danmakuItem.querySelector('.danmaku-item-left .common-nickname-wrapper');

        if (nameWrapper) {
            // 修改现有的用户名显示
            const userNameSpan = nameWrapper.querySelector('.user-name');
            if (userNameSpan) {
                userNameSpan.textContent = `${username} : `;
            }
        } else {
            // 如果不存在用户名容器，则创建新的
            const danmakuLeft = danmakuItem.querySelector('.danmaku-item-left');
            if (danmakuLeft) {
                const newNameWrapper = document.createElement('div');
                newNameWrapper.className = 'common-nickname-wrapper';

                const newUserNameSpan = document.createElement('span');
                newUserNameSpan.className = 'user-name v-middle pointer open-menu';
                newUserNameSpan.textContent = `${username} : `;

                newNameWrapper.appendChild(newUserNameSpan);
                danmakuLeft.appendChild(newNameWrapper);
            }
        }
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
