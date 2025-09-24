// ==UserScript==
// @name         一键复制当前页磁力链
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  导航栏添加一键复制当前页磁力链的功能
// @author       deepseek
// @match        https://*.nyaa.si/*
// @match        https://share.dmhy.org/*
// @icon         https://img.icons8.com/color/48/000000/magnet.png
// @grant        GM_setClipboard
// @grant        GM_notification
// ==/UserScript==

(function() {
    'use strict';

    // 创建复制磁力链按钮
    const copyButton = document.createElement('li');
    copyButton.innerHTML = '<a class="copy-magnet" href="#" title="复制磁力链"><span>复制磁力链</span></a>';
    document.querySelector('.nav').appendChild(copyButton);

    // 添加样式
    const style = document.createElement('style');
    style.textContent = `
        .copy-magnet {
            background: #ff6b6b;
            display: flex;
            align-items: center;
            gap: 5px;
            color: white !important;
        }
        .copy-magnet:hover {
            background: #ff5252;
        }
        .copy-magnet.copied {
            background: #4caf50;
        }
        .message {
            position: fixed;
            top: 40px;
            right: 0px;
            padding: 18px 25px;
            color: white;
            border-radius: 500px;
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
            transform: translateX(100%);
            transition: transform 0.4s ease-out;
            z-index: 1000;
            display: flex;
            align-items: center;
            gap: 12px;

            /* 模糊效果 */
            background: rgba(76, 175, 80, 0.7);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .message.show {
            right: 20px;
            transform: translateX(0);
        }
    `;
    document.head.appendChild(style);

    // 显示消息函数
    function showMessage(text) {
        let message = document.querySelector('.message');
        if (!message) {
            message = document.createElement('div');
            message.className = 'message';
            document.body.appendChild(message);
        }

        message.textContent = text;
        message.classList.add('show');

        setTimeout(() => {
            message.classList.remove('show');
        }, 3000);
    }

    // 复制磁力链函数
    function copyMagnetLinks() {
        const magnetLinks = [];
        // 查找页面中的所有磁力链接
        const links = document.querySelectorAll('a[href^="magnet:?"]');

        links.forEach(link => {
            magnetLinks.push(link.href);
        });

        if (magnetLinks.length === 0) {
            showMessage('未找到磁力链接！');
            return;
        }

        // 复制到剪贴板
        const textToCopy = magnetLinks.join('\n');
        GM_setClipboard(textToCopy);

        // 更新按钮状态
        const button = document.querySelector('.copy-magnet');
        button.classList.add('copied');
        const originalText = button.querySelector('span').textContent;
        button.querySelector('span').textContent = '已复制!';

        showMessage(`已复制 ${magnetLinks.length} 个磁力链接到剪贴板`);

        // 3秒后恢复按钮状态
        setTimeout(() => {
            button.classList.remove('copied');
            button.querySelector('span').textContent = originalText;
        }, 3000);
    }

    // 绑定点击事件
    document.querySelector('.copy-magnet').addEventListener('click', function(e) {
        e.preventDefault();
        copyMagnetLinks();
    });
})();
