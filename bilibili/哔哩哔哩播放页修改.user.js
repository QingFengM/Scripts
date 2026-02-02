// ==UserScript==
// @name         哔哩哔哩播放页修改
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  修改主题色为粉色 修改播放器大小
// @author       You
// @icon         https://www.bilibili.com/favicon.ico
// @match        *://*.bilibili.com/*
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // 使用GM_addStyle添加自定义样式
    GM_addStyle(`
        /* upname */
        .up-detail .up-detail-top .up-name:hover {
            color: #FB7299 !important;
        }
        /* 关注按钮 */
        .upinfo-btn-panel .follow-btn.not-follow {
            background: #FB7299 !important;
        }
        .upinfo-btn-panel .follow-btn.not-follow:hover {
            background: #FB7299 !important;
        }
        .send-msg:hover .van-icon-videodetails_messag {
            color: #FB7299 !important;
        }
        .send-msg:hover {
            color: #FB7299 !important;
        }
        .user-card-m-exp .user-info-wrapper .info .btn-box .message:hover {
            border: 1px solid #FB7299 !important;
            color: #FB7299 !important;
        }
        .user-card-m-exp .user-info-wrapper .info .btn-box .like {
            border-color: #FB7299 !important;
            background-color: #FB7299 !important;
        }
        .user-card-m-exp .user-info-wrapper .info .btn-box .liked {
            color: var(--bg3) !important;
        }
        /* 进度条 */
        .bpx-player-progress-schedule-current {
            background-color: #FB7299 !important;
        }
        .bpx-player-progress-area .bpx-player-progress-wrap .bpx-player-progress-move-indicator-down {
            border-color: #FB7299 transparent transparent !important;
        }
        .bpx-player-progress-area .bpx-player-progress-wrap .bpx-player-progress-move-indicator-up {
            border-color: transparent transparent #FB7299 !important;
        }
        g.bpx-player-pbp-videoshot > rect:nth-child(2) {
            fill: #FB7299 !important;
        }
        /* 画质 */
        .bpx-player-ctrl-quality-menu-item.bpx-state-active {
            color: #FB7299 !important;
        }
        /* 倍速 */
        .bpx-player-ctrl-playbackrate-menu-item.bpx-state-active {
            color: #FB7299 !important;
        }
        /* 音量 */
        .bui-slider .bui-track.bui-track-vertical .bui-bar-wrap .bui-bar {
            background: #FB7299 !important;
        }
        .bui-slider .bui-track .bui-thumb .bui-thumb-dot {
            background: #FB7299 !important;
        }
        /*字幕 */
        .bpx-player-ctrl-subtitle-title-area .bpx-player-ctrl-subtitle-close-switch.bpx-state-active {
            color: #FB7299 !important;
        }
        .bui-slider .bui-track .bui-bar-wrap .bui-bar {
            background: #FB7299 !important;
        }
        .bui-button .bui-area.bui-button-transparent:hover {
            color: #FB7299 !important;
            border: 1px solid #FB7299 !important;
        }
        .bpx-player-ctrl-subtitle-setting:hover {
            color: #FB7299 !important;
            fill: #FB7299 !important;
        }
        .bui-checkbox:hover .bui-checkbox-name {
            color: #FB7299 !important;
        }
        /* 播放器阴影 */
        .bpx-player-container {
            box-shadow: 0 0 8px #0003 !important;
        }
        /* 弹幕开关 */
        .bui-danmaku-switch .bui-danmaku-switch-label .bui-danmaku-switch-on svg path:last-child{
            fill: #FB7299 !important;
        }
        .bui-danmaku-switch:not(.bui-disabled):hover {
            fill: #FB7299 !important;
        }

        /* 弹幕设置 */
        .bpx-player-sending-bar .bpx-player-dm-root .bpx-player-dm-setting:hover {
            fill: #FB7299 !important;
        }
        .bpx-player-dm-setting-left-block-content .bpx-player-block-filter-type.bpx-player-active .bpx-player-block-filter-image,
        .bpx-player-dm-setting-left-block-content .bpx-player-block-filter-type.bpx-player-active .bpx-player-block-filter-image:not(._) {
            fill: #FB7299 !important;
            color: #FB7299 !important;
        }
        .bpx-player-dm-setting-left-block-content .bpx-player-block-filter-type.bpx-player-active .bpx-player-block-filter-label,
        .bpx-player-dm-setting-left-block-content .bpx-player-block-filter-type.bpx-player-active .bpx-player-block-filter-label:not(._) {
            color: #FB7299 !important;
        }
        .bpx-player-block-advanced-more svg path {
            fill: #FB7299 !important;
        }
        .bui-progress-bar {
            background-color: #FB7299 !important;
        }
        .bpx-player-dm-setting-left-more:hover {
            fill: #FB7299 !important;
            color: #FB7299 !important;
        }
        .bpx-player-dm-setting-right-more:hover {
            fill: #FB7299 !important;
            color: #FB7299 !important;
        }
        /* 播放设置 */
        .bpx-player-ctrl-setting-more:hover .bpx-common-svg-icon {
            fill: #FB7299 !important;
        }
        .bpx-player-ctrl-setting-more:hover {
            color: #FB7299 !important;
        }
        .bui-switch:hover .bui-switch-name {
            color: #FB7299 !important;
        }
        .bui-radio.bui-dark .bui-radio-button .bui-radio-input:checked + .bui-radio-label {
            background: #FB7299 !important;
        }
        .bui-checkbox .bui-checkbox-input:checked + .bui-checkbox-label .bui-checkbox-icon svg {
            fill: #FB7299 !important;
        }
        .bui-checkbox:hover .bui-checkbox-icon svg {
            fill: #FB7299 !important;
        }
        .bui-checkbox:hover .bui-checkbox-name {
            fill: #FB7299 !important;
        }
        .bui-switch .bui-switch-input:checked + .bui-switch-label .bui-switch-body {
          background: #FB7299 !important;
        }
        /* 弹幕发送 */
        .bui-button-blue {
            background: #FB7299 !important;
            color: #FFFFFF !important;
        }
        .bpx-player-sending-bar .bpx-player-video-inputbar .bpx-player-dm-hint a:hover {
            color: #FB7299 !important;
            fill: #FB7299 !important;
        }
        .bpx-player-sending-bar .bpx-player-video-btn-dm:hover {
            fill: #FB7299 !important;
        }
        .bpx-player-ctrl-setting-others-content .bui-checkbox-label:hover .bui-checkbox-name {
            color: #FB7299 !important;
        }
        .bpx-player-mode-selection-container .bpx-player-mode-selection-panel .bpx-player-mode-selection-row .row-selection .selection-span.active[data-type="fontsize"] {
            background: #FB7299;
        }
        .bpx-player-mode-selection-container .bpx-player-mode-selection-panel .bpx-player-mode-selection-row .row-selection .selection-span.active[data-type="fontsize"]:hover {
            background: #FB7299;
        }
        .bpx-player-mode-selection-container .bpx-player-mode-selection-panel .bpx-player-mode-selection-row .row-selection .selection-span.active[data-type="mode"] {
            background: #0000 !important;
        }
        .bpx-player-mode-selection-container .bpx-player-mode-selection-panel .bpx-player-mode-selection-row.mode .selection-span.active, .bpx-player-mode-selection-container .bpx-player-mode-selection-panel .bpx-player-mode-selection-row.mode .selection-span.active:hover {
          fill: #FB7299 !important;
          background: transparent;
          color: #FB7299 !important;
        }
        /* 简介 */
        .video-desc-container .basic-desc-info a[data-v-4c8ea99d] {
            color: #FB7299 !important;
        }
        .video-desc-container .basic-desc-info .desc-info-text a {
            color: #FB7299 !important;
        }
        .video-desc-container .toggle-btn-text[data-v-4c8ea99d]:hover {
            color: #FB7299 !important;
        }
        .video-tag-container .tag-panel .tag-link:hover {
            color: #FB7299 !important;
        }
        .topic-tag .tag-link.topic-link .topic-tag-icon[data-v-76473342] {
            color: #FB7299 !important;
        }
        /* 三连 */
        .video-toolbar-left-item:hover {
            color: #FB7299 !important;
        }
        .video-toolbar-right-item:hover {
            color: #FB7299 !important;
        }
        .video-toolbar-left-item.on {
            color: #FB7299 !important;
        }
        .video-share-popover .video-share-dropdown .dropdown-top .dropdown-top-left .capture-bar .bar-right .copy-link {
            background-color: #FB7299 !important;
        }
        .video-share-popover .video-share-dropdown .dropdown-top .dropdown-top-left .capture-bar .bar-left > label #check-timestamp:checked::after {
            background: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAxNCAxNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjE0IiBoZWlnaHQ9IjE0IiByeD0iMiIgZmlsbD0iI2ZiNzI5OSIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTUuMDAwMDEgMTAuOTk4OUM0LjcwODYzIDExLjAxMTggNC40MTIxMyAxMC45MTIxIDQuMiAxMC43TDIuMyA4LjhDMS45IDguMyAxLjkgNy43IDIuMyA3LjNDMi43IDYuOSAzLjQgNi45IDMuOCA3LjNMNSA4LjVMMTAuMiAzLjNDMTAuNiAyLjkgMTEuMyAyLjkgMTEuNyAzLjNDMTIuMSAzLjcgMTIuMSA0LjQgMTEuNyA0LjhMNS44IDEwLjdDNS41ODc4OCAxMC45MTIxIDUuMjkxMzkgMTEuMDExOCA1LjAwMDAxIDEwLjk5ODlaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4=);
        }
        /* 合集 */
        .video-pod .video-pod__header .header-top .left .title[data-v-dac4fbd2]:hover {
            color: #FB7299 !important;
        }
        .simple-base-item:hover .title-txt,
        .simple-base-item:hover .stat-item.duration {
            color: #FB7299 !important;
        }
        /* 订阅合集 */
        .video-pod .video-pod__header .header-bottom .right .subscribe-btn[data-v-dac4fbd2] {
            color: #FB7299 !important;
            border: 1px solid #FB7299 !important;
        }
        /* 弹幕列表 修改三个点图标悬停时的颜色 */
        .bui-dropdown-icon:hover svg path {
            fill: #FB7299 !important;
        }
        /* 自动连播 */
        .switch-btn.on{
            background: #FB7299 !important;
        }
        .simple-base-item .title:hover {
            color: #FB7299 !important;
        }
        /* 当前播放标识 */
        .simple-base-item .title .playing-gif {
            background-image: url('https://i0.hdslb.com/bfs/static/jinkela/playlist-video/asserts/playing.gif');
            filter: sepia(0.42) hue-rotate(-202deg) saturate(2.55) brightness(1.28) !important;
        }
        /* 当前播放 */
        .simple-base-item.normal.active .title {
            color: #FB7299 !important;
        }
        /* 视频卡片 */
        .video-page-card-small .card-box .info .title:hover {
            color: #FB7299 !important;
        }
        .video-page-card-small .card-box .info .upname a:hover {
            color: #FB7299 !important;
        }
        .bili-video-card .bili-video-card__info--tit > a:hover {
            color: #FB7299 !important;
        }
        .bili-video-card .bili-video-card__info--owner:hover {
            color: #FB7299 !important;
        }
        .font-medium[data-v-d3a529ce]:hover {
            color: #FB7299 !important;
        }
        /* 播放器默认模式 */
        /* 播放器容器宽度 */
        body:not(.player-mode-wide) .left-container {
            width: 1350px !important;
        }
        /* 播放器本体尺寸 */
        body:not(.player-mode-wide) #bilibili-player {
            width: 1350px !important;
            height: 816px !important;
        }
        /* 播放器与三连的间距 */
        body:not(.player-mode-wide) .video-toolbar-container {
            padding-top: 150px !important;
        }
        body:not(.player-mode-wide) .video-toolbar-container,
        body:not(.player-mode-wide) .video-tag-container {
            border-bottom: none !important;
        }
        /* 播放器与列表的间距 */
        body:not(.player-mode-wide) .video-container-v1 .right-container {
            margin-left: 20px;
        }
        /* 播放器宽屏模式 */
        body.player-mode-wide .left-container {
            width: 1436px !important;
            float: none !important;
            margin: 0 auto !important;
            display: block !important;
        }
        body.player-mode-wide #bilibili-player {
            width: 1436px !important;
            height: 864px !important;
        }
        body.player-mode-wide .video-toolbar-container {
            padding-top: 20px !important;
            margin: 0 auto !important;
            max-width: 100% !important;
        }
        body.player-mode-wide .right-container {
            display: none !important;
        }
        /* 播放界面向上移动的距离 */
        .video-container-v1 {
            margin-top: -30px !important;
        }
        .video-info-container .video-info-meta {
            margin-top: 0px !important;
        }
        .video-info-container {
            height: 90px !important;
        }
        .up-info__btn-panel {
            display:none !important;
        }
        #danmukuBox {
            margin-top: -20px !important;
        }
    `);

    // 等待DOM加载完成的逻辑移到CSS样式外面
    function initScript() {
        // 这里可以添加需要DOM加载完成后执行的逻辑
    }

    // 等待DOM加载完成
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initScript);
    } else {
        // 延迟执行，避免与暴力猴初始化冲突
        setTimeout(initScript, 1000);
    }
})();
