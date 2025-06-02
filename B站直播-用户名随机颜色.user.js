// ==UserScript==
// @name         B站直播-用户名随机颜色
// @homepage     https://github.com/QingFengM/Scripts/
// @version      1.0
// @description  为聊天列表中的用户ID分配不同颜色
// @author       none
// @match        https://live.bilibili.com/*
// @icon         https://www.bilibili.com/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 定义10种明显不同的颜色
    const colors = [
      '#c93485',
      '#0078b9',
      '#008000',
      '#c93485',
      '#0068d0',
      '#9d48a0',
      '#800080',
      '#da1c00',
      '#000080',
      '#FF1493'
    ];

    // 为每个.user-name元素分配颜色
    function colorizeUsernames() {
        const usernames = document.querySelectorAll('.user-name');

        usernames.forEach((username, index) => {
            // 使用用户索引对颜色数量取模来循环使用颜色
            const colorIndex = index % colors.length;
            username.style.color = colors[colorIndex];

        });
    }

    // 初始运行
    colorizeUsernames();

    // 使用MutationObserver监听DOM变化，以便在动态加载内容时也能应用样式
    const observer = new MutationObserver(colorizeUsernames);
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();
