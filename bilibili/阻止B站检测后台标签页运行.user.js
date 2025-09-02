// ==UserScript==
// @name         阻止B站检测后台标签页运行
// @namespace    http://tampermonkey.net/
// @homepage     https://github.com/QingFengM/Scripts/
// @version      0.2
// @description  阻止B站检测网页未处于前台运行时更改画质导致直播频繁卡顿
// @match        https://live.bilibili.com/*
// @icon         https://www.bilibili.com/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
    Object.defineProperty(document, 'hidden', { value: false });
    Object.defineProperty(document, 'visibilityState', { value: 'visible' });
    window.requestAnimationFrame = (callback) => setTimeout(() => callback(performance.now()), 16);

    // 模拟鼠标移动
    function simulateMouseMovement() {
        const duration = 5000; // 模拟5秒
        const startTime = Date.now();
        let x = Math.random() * window.innerWidth;
        let y = Math.random() * window.innerHeight;

        const moveMouse = () => {
            if (Date.now() - startTime >= duration) return;

            // 随机微调位置
            x += (Math.random() - 0.5) * 20;
            y += (Math.random() - 0.5) * 20;
            x = Math.max(0, Math.min(x, window.innerWidth));
            y = Math.max(0, Math.min(y, window.innerHeight));

            // 触发鼠标移动事件
            document.dispatchEvent(new MouseEvent('mousemove', {
                clientX: x,
                clientY: y,
                bubbles: true,
                view: window
            }));

            requestAnimationFrame(moveMouse);
        };

        moveMouse();
    }


    // 获取当前时间格式化字符串
    const getCurrentTime = () => {
        const now = new Date();
        return now.toLocaleTimeString('zh-CN', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };

    // 每3分钟触发一次模拟并输出带时间的日志
    setInterval(() => {
        console.log(`[${getCurrentTime()}] 模拟鼠标移动...`);
        simulateMouseMovement();
    }, 3 * 60 * 1000);

    // 初始执行一次
    setTimeout(simulateMouseMovement, 5000);
})();

