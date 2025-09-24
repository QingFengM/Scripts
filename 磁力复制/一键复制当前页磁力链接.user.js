// ==UserScript==
// @name         一键复制当前页磁力链
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  在网页右上角添加一键复制当前页磁力链的功能
// @author       deepseek
// @match        https://*.nyaa.si/*
// @match        https://share.dmhy.org/*
// @icon         https://img.icons8.com/color/48/000000/magnet.png
// @grant        GM_setClipboard
// @grant        GM_notification
// ==/UserScript==

(function() {
    'use strict';

    // 创建固定在右上角的复制磁力链按钮
    const copyButton = document.createElement('button');
    copyButton.innerHTML = '复制';
    copyButton.className = 'fixed-copy-button';
    document.body.appendChild(copyButton);

    // 添加样式
    const style = document.createElement('style');
    style.textContent = `
        .fixed-copy-button {
            position: fixed;
            top: 40px;
            right: 20px;
            padding: 10px 20px;
            background: #ff6b6b;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 14px;
            font-weight: bold;
            z-index: 10000;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
            transition: all 0.3s ease;
        }
        .fixed-copy-button:hover {
            background: #ff5252;
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        }
        .fixed-copy-button:active {
            transform: translateY(0);
        }
        .fixed-copy-button.copied {
            background: #4caf50;
        }
        .message {
            position: fixed;
            top: 90px;
            right: 20px;
            padding: 12px 20px;
            background: rgba(76, 175, 80, 0.9);
            color: white;
            border-radius: 5px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            transform: translateX(150%);
            transition: transform 0.4s ease-out;
            z-index: 10000;
            font-size: 14px;

            /* 模糊效果 */
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .message.show {
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
        copyButton.classList.add('copied');
        const originalText = copyButton.textContent;
        copyButton.textContent = '已复制!';

        showMessage(`已复制 ${magnetLinks.length} 个磁力链接到剪贴板`);

        // 3秒后恢复按钮状态
        setTimeout(() => {
            copyButton.classList.remove('copied');
            copyButton.textContent = originalText;
        }, 3000);
    }

    // 绑定点击事件
    copyButton.addEventListener('click', copyMagnetLinks);
})();
