// ==UserScript==
// @name         B站直播间音量记忆
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  记住每个B站直播间的音量，防止突然音量过大轰炸耳朵
// @match        *://live.bilibili.com/*
// @author       doubao
// @grant        GM_setValue
// @grant        GM_getValue
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    // 核心配置
    const CONFIG = {
        // 音量存储的前缀（避免和其他脚本冲突）
        storagePrefix: 'bilibili_live_volume_',
        // 初始默认音量（无保存记录时使用，范围0-1）
        defaultVolume: 0.5,
        // 轮询查找视频元素的间隔（ms）
        pollInterval: 500,
        // 最大轮询次数
        maxPollTimes: 20
    };

    // 获取当前直播间ID
    function getRoomId() {
        const match = window.location.href.match(/live\.bilibili\.com\/(?:blanc\/)?(\d+)/);
        return match ? match[1] : null;
    }

    // 获取/设置本地存储的音量
    function getSavedVolume(roomId) {
        const key = CONFIG.storagePrefix + roomId;
        const volume = GM_getValue(key, CONFIG.defaultVolume);
        // 确保音量在合法范围（0-1）
        return Math.max(0, Math.min(1, volume));
    }

    function saveVolume(roomId, volume) {
        const validVolume = Math.max(0, Math.min(1, volume));
        const key = CONFIG.storagePrefix + roomId;
        GM_setValue(key, validVolume);
    }

    // 找到直播间的视频元素
    function findVideoElement() {
        // B站直播间视频元素的常见选择器（兼容不同布局）
        const selectors = [
            'video.bpx-player-video',
            'video[class*="video"]',
            'div.bpx-player-video-wrap video',
            'video'
        ];

        for (const selector of selectors) {
            const video = document.querySelector(selector);
            if (video && video.tagName === 'VIDEO') {
                return video;
            }
        }
        return null;
    }

    // 初始化音量监听和恢复
    function initVolumeControl(roomId) {
        let pollTimes = 0;
        const pollTimer = setInterval(() => {
            const video = findVideoElement();
            pollTimes++;

            // 找到视频元素 或 达到最大轮询次数 则停止轮询
            if (video || pollTimes >= CONFIG.maxPollTimes) {
                clearInterval(pollTimer);
            }

            if (!video) return;

            // 恢复保存的音量
            const savedVolume = getSavedVolume(roomId);
            video.volume = savedVolume;
            console.log(`[音量记忆] 恢复直播间 ${roomId} 音量：${(savedVolume * 100).toFixed(0)}%`);

            // 监听音量变化，自动保存
            let volumeChangeTimer = null;
            video.addEventListener('volumechange', () => {
                // 防抖：避免频繁保存（音量拖动时会多次触发）
                clearTimeout(volumeChangeTimer);
                volumeChangeTimer = setTimeout(() => {
                    saveVolume(roomId, video.volume);
                    console.log(`[音量记忆] 保存直播间 ${roomId} 音量：${(video.volume * 100).toFixed(0)}%`);
                }, 300);
            });

            // 监听页面切换/关闭时最后保存一次
            window.addEventListener('beforeunload', () => {
                saveVolume(roomId, video.volume);
            });
        }, CONFIG.pollInterval);
    }

    // 主执行逻辑
    function main() {
        const roomId = getRoomId();
        if (!roomId) {
            console.warn('[音量记忆] 无法获取直播间ID');
            return;
        }

        // 初始化音量控制
        initVolumeControl(roomId);

        // 兼容B站直播间路由跳转（不刷新页面切换直播间）
        const originalPushState = history.pushState;
        history.pushState = function(...args) {
            originalPushState.apply(this, args);
            // 跳转后重新初始化
            setTimeout(() => {
                const newRoomId = getRoomId();
                if (newRoomId) {
                    initVolumeControl(newRoomId);
                }
            }, 1000);
        };
    }

    // 启动脚本
    main();
})();
