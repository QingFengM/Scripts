// ==UserScript==
// @name         Bilibili直播间禁止轮播
// @homepageURL  https://github.com/c-basalt/bilibili-live-seeker-script/
// @supportURL   https://space.bilibili.com/521676
// @namespace    https://space.bilibili.com/521676
// @version      1.0
// @description  自动阻止Bilibili直播间轮播，还原未开播界面，无多余界面
// @author       c_b
// @match        https://live.bilibili.com/*
// @icon         https://www.bilibili.com/favicon.ico
// @license      GPLv3 License
// @run-at       document-start
// @grant        unsafeWindow
// ==/UserScript==
// 声明
// 基于c_b的脚本 [https://greasyfork.org/zh-CN/scripts/453967] 修改
// 修改内容：移除了原脚本的追帧功能，仅保留轮播拦截功能
// 严格遵循 GPLv3 许可

(function () {
    'use strict';
    const W = unsafeWindow;

    // 检查是否为有效的直播间页面
    const isLiveRoomPage = () => {
        return location.href.match(/https:\/\/live\.bilibili\.com\/(blanc\/)?\d+/);
    };

    // 检查是否为使用轮播功能的直播间
    const isRoundplayEnabledRoom = () => {
        // 检查页面中是否存在轮播相关元素
        const roundplayIndicators = [
            '.web-player-round-title',
            '.round-play-container',
            '.web-player-ending-panel'
        ];

        return roundplayIndicators.some(selector => {
            return document.querySelector(selector) !== null;
        });
    };

    // 拦截轮播请求
    const hookFetch = () => {
        const origFetch = W.fetch;
        W.fetch = async function () {
            try {
                /** @type {URL | RequestInfo} */
                const resource = arguments[0];
                let url = (resource instanceof Request) ? resource.url : resource.toString();

                // 拦截轮播请求
                if (url.match('api.live.bilibili.com/live/getRoundPlayVideo')) {
                    console.debug('[轮播拦截] 已阻止轮播视频请求');
                    return new Response('{"code":0,"data":{"cid":-3}}');
                }
            } catch (e) {
                console.error('[轮播拦截] 请求拦截出错:\n', e);
            }
            return origFetch.apply(this, arguments);
        }
    };

    // 还原未开播时的播放器界面
    const restorePlayerUI = () => {
        // 隐藏轮播相关元素
        const hideElements = [
            '.web-player-round-title',     // 轮播标题
          //'.web-player-ending-panel',    // 轮播结束面板
            '.round-play-container',       // 轮播容器
            '.web-player-round-play',      // 轮播播放控件
            '.round-play-progress'         // 轮播进度条
        ];

        hideElements.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                el.style.display = 'none';
            });
        });

        // 显示正常的未开播提示
        const playerContainer = document.querySelector('.web-player-container');
        if (playerContainer && !document.querySelector('.live-player-normal-tip')) {
            // 检查是否已有我们添加的提示
            if (!document.querySelector('.custom-live-offline-tip')) {
                const tipElement = document.createElement('div');
                tipElement.className = 'custom-live-offline-tip live-player-normal-tip';
                tipElement.style.cssText = `
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    color: #fff;
                    font-size: 16px;
                    text-align: center;
                    z-index: 10;
                `;
                tipElement.textContent = '当前直播间未开播';
                playerContainer.appendChild(tipElement);
            }
        }

        // 确保播放器控件正常显示
        const playerControls = document.querySelector('.web-player-controlbar');
        if (playerControls) {
            playerControls.style.display = '';
        }
    };

    // 初始化轮播检查和拦截
    const initRoundplayBlock = () => {
        // 只在有效的直播间页面运行
        if (!isLiveRoomPage()) return;

        // 设置请求拦截
        hookFetch();

        // 定期检查并处理轮播元素
        const checkInterval = setInterval(() => {
            // 只处理启用了轮播功能的直播间
            if (isRoundplayEnabledRoom()) {
                restorePlayerUI();
            } else {
                // 对于不使用轮播的直播间，停止检查
                clearInterval(checkInterval);
                console.debug('[轮播拦截] 当前直播间不使用轮播功能，已停止检查');
            }
        }, 1000);

        // 初始检查
        restorePlayerUI();
    };

    // 启动脚本
    initRoundplayBlock();
})();
