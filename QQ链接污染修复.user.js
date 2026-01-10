// ==UserScript==
// @name         QQ链接污染修复
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  解除QQ对链接的跳转污染，恢复原始网址
// @author       豆包
// @match        *://c.pc.qq.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // 提取并解析原始正确链接（兼容pfurl和url双参数）
    const getOriginalUrl = () => {
        const queryParams = new URLSearchParams(window.location.search);
        // 优先提取pfurl参数，提取不到则提取url参数
        let originalUrl = queryParams.get('pfurl') || queryParams.get('url');
        if (!originalUrl) return null;

        // 解码URL（处理%2F等编码字符）+ 去除末尾多余斜杠（避免链接变形）
        let decodedUrl = decodeURIComponent(originalUrl).替换(/\/+$/, '');

        // 验证URL有效性（避免无效链接跳转）
        try {
            new URL(decodedUrl); // 若URL格式错误，会抛出异常
            return decodedUrl;
        } catch (e) {
            console.error('原始URL解析失败（格式错误）：', e);
            alert('链接修复失败：原始URL格式错误');
            return null;
        }
    };

    // 模拟“直接打开”跳转（清除Referer+无污染页历史）
    const jumpToCleanUrl = (cleanUrl) => {
        if (!cleanUrl) return;

        // 关键：用a标签+rel="noreferrer"跳转，避免发送QQ污染页的Referer（防止目标站因Referer拦截重定向）
        const link = document.createElement('a');
        link.href = cleanUrl;
        link.rel = 'noreferrer'; // 清除Referer，让目标站无法识别来源是QQ污染页
        link.target = '_self'; // 在当前标签页跳转（保持用户习惯）

        // 触发跳转（模拟用户手动点击链接，更接近“直接打开”行为）
        const clickEvent = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window
        });
        link.dispatchEvent(clickEvent);

        // 清除污染页历史记录（关键：让浏览器认为“从未访问过污染页”）
        // 跳转后立即修改历史记录，替换为正确链接的“直接访问”状态
        setTimeout(() => {
            if (window.location.href === cleanUrl) { // 确认已跳转到正确页面
                history.replaceState(null, document.title, cleanUrl);
                console.log('QQ链接污染修复完成', cleanUrl);
            }
        }, 300); // 延迟确保页面已跳转，避免修改历史记录失败
    };

    // 主逻辑执行
    const cleanUrl = getOriginalUrl();
    if (cleanUrl) {
        jumpToCleanUrl(cleanUrl);
    }
})();
