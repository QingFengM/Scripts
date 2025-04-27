// ==UserScript==
// @name         QQ链接修复
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  极致优化的QQ拦截链接修复
// @author       Code Optimizer
// @match        *://c.pc.qq.com/*
// @icon         https://im.qq.com/pcqq/images/windows/short_icon.ico
// @grant        none
// @run-at       document-start
// ==/UserScript==

+function() {
    // 1. 极速参数提取（优先高频参数）
    const search = location.search;
    let paramStart = search.indexOf('url=');
    if (paramStart < 0) paramStart = search.indexOf('pfurl=');
    if (paramStart < 0) paramStart = search.indexOf('target=');
    if (paramStart < 0) return;

    // 2. 快速协议验证（避免解码非HTTP链接）
    const encodedUrl = search.slice(paramStart);
    if (!encodedUrl.startsWith('url=http') && !encodedUrl.startsWith('pfurl=http')) {
        return;
    }

    // 3. 提取并解码URL
    const ampPos = search.indexOf('&', paramStart);
    const u = search.substring(
        paramStart + (search[paramStart+3] === '=' ? 4 : 6),  // 处理url=和pfurl=
        ampPos > 0 ? ampPos : undefined
    );

    try {
        // 4. 安全跳转
        const cleanUrl = decodeURIComponent(u)
            .replace(/^([^:]+:)\/+/i, '$1//')  // 协议标准化
            .replace(/([^:])\/+/g, '$1/');     // 路径标准化

        if (/^https?:\/\/[^\s\/?#]+\.[^\s\/?#]+/i.test(cleanUrl)) {
            window.stop?.();
            location.replace(cleanUrl);
        }
    } catch(e) {}
}();
