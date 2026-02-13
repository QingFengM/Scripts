// ==UserScript==
// @name         QQ链接污染修复
// @namespace    http://tampermonkey.net/
// @version      1.4
// @description  解除QQ对链接的跳转污染，恢复原始网址
// @author       豆包
// @match        *://c.pc.qq.com/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    // 提取并解析原始正确链接（兼容pfurl和url双参数）
    const getOriginalUrl = () => {
        // 兼容不同场景下的URL解析
        const currentUrl = window.location.href;
        const queryParams = new URLSearchParams(window.location.search);

        // 优先提取pfurl参数，提取不到则提取url参数
        let originalUrl = queryParams.get('pfurl') || queryParams.get('url');
        if (!originalUrl) {
            // 兜底：直接从URL字符串中匹配url=后的内容（防止参数解析失败）
            const urlMatch = currentUrl.match(/url=([^&]+)/);
            originalUrl = urlMatch ? urlMatch[1] : null;
        }

        if (!originalUrl) return null;

        // 解码URL（修复原脚本的中文“替换”错误）
        let decodedUrl = decodeURIComponent(originalUrl);
        // 去除末尾多余斜杠（英文replace）
        decodedUrl = decodedUrl.replace(/\/+$/, '');

        // 验证URL有效性
        try {
            new URL(decodedUrl);
            return decodedUrl;
        } catch (e) {
            console.error('原始URL解析失败：', e);
            return null;
        }
    };

    // 直接跳转（放弃模拟点击，改用原生replace，避免拦截）
    const jumpToCleanUrl = (cleanUrl) => {
        if (!cleanUrl) return;

        // 原生跳转+替换历史记录（最稳定的方式）
        window.location.replace(cleanUrl);
        // 替换历史记录，清除污染页痕迹
        history.replaceState(null, document.title, cleanUrl);
        console.log('QQ链接污染修复完成，跳转至：', cleanUrl);
    };

    // 主逻辑（增加延迟容错）
    setTimeout(() => {
        const cleanUrl = getOriginalUrl();
        if (cleanUrl) {
            jumpToCleanUrl(cleanUrl);
        }
    }, 100); // 小延迟确保参数解析完整
})();
