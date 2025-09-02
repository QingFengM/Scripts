// ==UserScript==
// @name         B站直播-用户名随机颜色
// @homepage     https://github.com/QingFengM/Scripts/
// @version      1.1
// @description  为聊天列表中的用户ID分配不同颜色
// @author       none
// @match        https://live.bilibili.com/*
// @icon         https://www.bilibili.com/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 定义多种不同的颜色
    const colors = [
    '#800000',  // 深红
    '#FF0000',  // 纯红
    '#FA8072',  // 浅珊瑚
    '#FF7F50',  // 珊瑚
    '#F4A460',  // 沙棕
    '#FFA500',  // 橙色
    '#556B2F',  // 暗橄榄绿
    '#228B22',  // 森林绿
    '#32CD32',  // 酸橙绿
    '#3CB371',  // 中海绿
    '#20B2AA',  // 浅海绿
    '#00CED1',  // 深青
    '#5F9EA0',  // 军蓝灰
    '#00BFFF',  // 深天蓝
    '#4682B4',  // 钢蓝
    '#1E90FF',  // 道奇蓝
    '#000080',  // 海军蓝
    '#483D8B',  // 暗板岩蓝
    '#7B68EE',  // 中板岩蓝
    '#8A2BE2',  // 蓝紫
    '#800080',  // 紫色
    '#DA70D6',  // 兰紫
    '#DB7093',  // 淡紫红
    '#c93485',  // 深粉红
    '#0078b9',  // 中蓝
    '#9d48a0',  // 紫红
    '#da1c00'   // 深红橙
    ];

    // 存储用户ID到颜色的映射
    const userColorMap = new Map();

    // 简单的字符串哈希函数
    function stringToHash(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return Math.abs(hash);
    }

    // 为每个.user-name元素分配固定颜色
    function colorizeUsernames() {
        const usernames = document.querySelectorAll('.user-name');

        usernames.forEach((username) => {
            const userId = username.textContent.trim();

            // 如果还没有为这个用户分配颜色
            if (!userColorMap.has(userId)) {
                // 使用用户ID的哈希值来确定颜色索引
                const hash = stringToHash(userId);
                const colorIndex = hash % colors.length;
                userColorMap.set(userId, colors[colorIndex]);
            }

            // 应用存储的颜色
            username.style.color = userColorMap.get(userId);
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
