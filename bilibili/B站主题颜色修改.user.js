// ==UserScript==
// @name         B站主题颜色修改
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  修改B站主题色为粉色
// @author       You
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
        /* 高级弹幕旁小图标 */
        .bpx-player-block-advanced-more svg path {
            fill: #FB7299 !important;
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
        .bui-progress-bar {
            background-color: #FB7299 !important;
        }
        .bpx-player-sending-bar .bpx-player-video-btn-dm:hover {
            fill: #FB7299 !important;
        }
        /* 修改镜像画面开关文字悬停颜色 */
        .bpx-player-ctrl-setting-mirror:hover .bui-switch-name,
        /* 修改单集循环开关文字悬停颜色 */
        .bpx-player-ctrl-setting-loop:hover .bui-switch-name,
        /* 修改自动开播开关文字悬停颜色 */
        .bpx-player-ctrl-setting-autoplay:hover .bui-switch-name,
        /* 修改更多播放设置文字和图标悬停颜色 */
        .bpx-player-ctrl-setting-more:hover .bpx-player-ctrl-setting-more-text,
        .bpx-player-ctrl-setting-more:hover .bpx-common-svg-icon svg path,
        /* 修改倍速设置文字悬停颜色 */
        .bui-switch[style*="倍速设置"]:hover {
            color: #FB7299 !important;
        }
        /* 单独设置SVG图标路径的填充色 */
        .bpx-player-ctrl-setting-more:hover .bpx-common-svg-icon svg path {
            fill: #FB7299 !important;
        }
        .bui-radio.bui-dark .bui-radio-button .bui-radio-input:checked + .bui-radio-label {
            background: #FB7299 !important;
        }
        .bpx-player-ctrl-setting-others-content .bui-checkbox-label:hover .bui-checkbox-name {
            color: #FB7299 !important;
        }
        /* 发送按钮/登录按钮 */
        .bui-button-blue {
            background: #FB7299 !important;
            color: #FFFFFF !important;
        }
        .bpx-player-sending-bar .bpx-player-video-inputbar .bpx-player-dm-hint a:hover {
            color: #FB7299 !important;
            fill: #FB7299 !important;
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
        /* 弹幕列表 */
/* 修改三个点图标悬停时的颜色 */
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
            background-image: url('https://i0.hdslb.com/bfs/static/jinkela/playlist-video/asserts/playing.gif') !important;
            filter:
              sepia(1)              /* 先转为棕色基调 */
              hue-rotate(320deg)    /* 调整到粉色区域 */
              saturate(2.5)         /* 增加饱和度让粉色更鲜艳 */
              brightness(1.2)       /* 提亮颜色 */
              !important;
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
