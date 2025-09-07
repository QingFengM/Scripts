// ==UserScript==
// @name         一键复制当前页磁力链
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  在 Nyaa.si 导航栏添加一键复制当前页磁力链的功能
// @author       doubao & deepseek
// @match        https://*.nyaa.si/*
// @match        https://share.dmhy.org/*
// @icon         https://img.icons8.com/?size=200&id=GcEcPJ_xNrrA&format=png
// @grant        GM_setClipboard
// @grant        GM_notification
// ==/UserScript==

(function() {
    'use strict';

    // 创建复制按钮并插入到导航栏
    function createCopyButton() {
        // 检查是否已存在按钮
        if (document.getElementById('copy-all-magnet')) {
            return;
        }

        // 找到导航栏
        const navBar = document.querySelector('ul.nav');
        if (!navBar) {
            // 如果找不到导航栏，使用备用位置
            createFallbackButton();
            return;
        }

        // 创建按钮元素
        const listItem = document.createElement('li');
        const button = document.createElement('a');
        button.id = 'copy-all-magnet';
        button.textContent = '复制磁力链';
        button.href = '#';


        // 阻止默认链接行为并添加点击事件
        button.addEventListener('click', function(e) {
            e.preventDefault();
            copyAllMagnetLinks();
        });

        // 将按钮添加到导航栏
        listItem.appendChild(button);
        navBar.appendChild(listItem);
    }

    // 备用按钮位置（当找不到导航栏时使用）
    function createFallbackButton() {
        if (document.getElementById('copy-all-magnet-fallback')) {
            return;
        }

        const button = document.createElement('button');
        button.id = 'copy-all-magnet-fallback';
        button.innerHTML = '复制磁力链';
        button.style.position = 'fixed';
        button.style.top = '70px';
        button.style.right = '20px';
        button.style.zIndex = '1000';
        button.style.padding = '10px 15px';
        button.style.color = 'white';
        button.style.fontWeight = 'bold';
        button.style.cursor = 'pointer';

        // 添加点击事件
        button.addEventListener('click', copyAllMagnetLinks);

        document.body.appendChild(button);
    }

    // 复制所有磁力链接
    function copyAllMagnetLinks() {
        const magnetLinks = [];
        // 查找所有磁力链接
        const links = document.querySelectorAll('a[href^="magnet:?xt=urn:btih:"]');

        if (links.length === 0) {
            showNotification('未找到磁力链！', 'error');
            return;
        }

        // 收集所有磁力链接
        links.forEach(link => {
            magnetLinks.push(link.href);
        });

        // 复制到剪贴板
        const textToCopy = magnetLinks.join('\n');
        GM_setClipboard(textToCopy);

        // 显示成功消息
        showNotification(`已复制 ${magnetLinks.length} 个磁力链到剪贴板！`, 'success');

        // 添加视觉反馈
        provideVisualFeedback();
    }

    // 显示通知
    function showNotification(message, type) {
        // 使用GM_notification如果可用，否则使用alert
        if (typeof GM_notification !== 'undefined') {
            GM_notification({
                text: message,
                title: '磁力链复制',
                image: 'https://img.icons8.com/?size=200&id=GcEcPJ_xNrrA&format=png'
            });
        } else {
            alert(message);
        }

        // 也在页面上显示一个临时消息，应用模糊效果
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.position = 'fixed';
        notification.style.top = '40px';
        notification.style.left = '50%';
        notification.style.transform = 'translateX(-50%)';
        notification.style.padding = '10px 20px';
        notification.style.color = 'white';
        notification.style.borderRadius = '4px';
        notification.style.zIndex = '1001';
        notification.style.fontWeight = 'bold';

        // 应用模糊效果样式
        notification.style.backgroundColor = type === 'success'
            ? 'rgba(76, 175, 80, 0.7)'
            : 'rgba(244, 67, 54, 0.7)';
        notification。style。transition = 'all .2s ease-in-out';
        notification。style。border = 'none';
        notification.style.backdropFilter = 'blur(8px)';
        notification.style.webkitBackdropFilter = 'blur(8px)';
        notification.style.boxShadow = 'rgba(0, 0, 0, 0.16) 0px 1px 4px';

        document。body。appendChild(notification);

        // X秒后移除通知
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }， 1500);
    }

    // 初始化函数
    function init() {
        // 等待页面加载完成
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', createCopyButton);
        } else {
            createCopyButton();
        }

        // 监听页面变化（对于单页应用或AJAX加载的内容）
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.addedNodes.length) {
                    createCopyButton();
                }
            });
        });

        observer。observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // 启动脚本
    init();
})();
