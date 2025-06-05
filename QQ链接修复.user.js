// ==UserScript==
// @name         QQ链接修复
// @namespace    http://tampermonkey.net/
// @homepage     https://github.com/QingFengM/Scripts/
// @version      1.1
// @description  修复被 QQ 拦截的链接，让用户能够直接访问原始网页。
// @author       Code Optimizer
// @match        *://c.pc.qq.com/*
// @icon         https://im.qq.com/pcqq/images/windows/short_icon.ico
// @grant        none
// @run-at       document-start
// ==/UserScript==

+function() {
    // 参数优先级：url > pfurl > target
    const { search } = location;
    const paramNames = ['url=', 'pfurl=', 'target='];
    
    let paramStart = -1;
    let paramName = '';
    
    // 查找第一个匹配的参数（避免多次遍历）
    for (const name of paramNames) {
        paramStart = search.indexOf(name);
        if (paramStart >= 0) {
            paramName = name;
            break;
        }
    }
    
    if (paramStart < 0) return;
    
    // 快速协议验证（避免解码非HTTP链接）
    const afterParam = search.slice(paramStart);
    if (!afterParam.startsWith(paramName + 'http')) return;
    
    // 提取URL参数值（使用 >>> 0 优化边界检查）
    const valueStart = paramStart + paramName.length;
    const valueEnd = search.indexOf('&', valueStart) >>> 0;
    const encodedValue = search.slice(valueStart, valueEnd || undefined);
    
    try {
        // 解码并标准化URL
        const cleanUrl = decodeURIComponent(encodedValue)
            .replace(/^([^:]+:)\/+/i, '$1//')  // 协议标准化（http:/ → http://）
            .replace(/([^:])\/+/g, '$1/');     // 路径标准化（/// → /）
        
        // 优化后的正则验证
        if (/^https?:\/\/(?:[a-z0-9-]+\.)+[a-z]{2,}(?:\/|$)/i.test(cleanUrl)) {
            window.stop?.();  // 阻止页面继续加载
            location.href = cleanUrl;  // 直接跳转
        }
    } catch(e) {}
}();
