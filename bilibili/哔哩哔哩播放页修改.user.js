// ==UserScript==
// @name         哔哩哔哩播放页修改
// @namespace    http://tampermonkey.net/
// @version      0.3.1
// @description  播放页主题色修改为#FB7299；扩展播放器宽高尺寸，优化适配页面布局；隐藏导航栏冗余入口、广告横幅、弹幕投票等干扰元素，提升观看体验与视觉整洁度。
// @author       deepseek
// @icon         https://www.bilibili.com/favicon.ico
// @match        *://www.bilibili.com/video/*
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // ==================== 播放页修改 ====================
    GM_addStyle(`
        /* logo */
        .mini-header__logo {
            filter: sepia(0.42) hue-rotate(-202deg) saturate(2.55) brightness(1.28) !important;
            width: 54px !important;
        }

        /* 隐藏顶部导航栏 - 首页下拉箭头 */
        .mini-header__arrow {
            display: none !important;
        }
        .bili-header .left-entry__title .mini-header__title > span {
            margin-right: 0px !important;
        }

        /* 隐藏顶部导航栏 - 下载客户端 */
        li.v-popover-wrap a.download-client-trigger {
            display: none !important;
        }

        /* 隐藏顶部导航 - 游戏中心 */
        .left-entry li.v-popover-wrap a[href*="game.bilibili.com"] {
            display: none !important;
        }

        /* 隐藏顶部导航 - 会员购 */
        .left-entry li.v-popover-wrap a[href*="show.bilibili.com"] {
            display: none !important;
        }

        /* 隐藏顶部导航 - 漫画 */
        .left-entry li.v-popover-wrap a[href*="manga.bilibili.com"] {
            display: none !important;
        }

        /* 隐藏顶部导航 - 大会员 */
        .vip-wrap {
            display: none !important;
        }

        /* 隐藏顶部导航 -搜索框热搜 */
        .trending {
            display: none !important;
        }
        .nav-search-input::placeholder {
            color: transparent !important;
            opacity: 0 !important;
            visibility: visible !important;
        }

        /* 顶部导航 -搜索框 */
        .bili-header .center-search-container .center-search__bar {
            max-width: 400px !important;
        }
        .bili-header .center-search-container .center-search__bar #nav-searchform {
            height: 37.5px !important;
        }
        .bili-header .center-search-container .center-search__bar #nav-searchform,
        .bili-header .search-panel{
            border: none !important;
        }
        .bili-header .mini-header .center-search-container .center-search__bar #nav-searchform:hover {
            background: #E5E5E5 !important;
        }
        .bili-header .mini-header .center-search-container .center-search__bar #nav-searchform.is-focus:hover {
            background: var(--bg1) !important;
        }
        .bili-header .histories .history-item:hover,
        .bili-header .header .clear:hover,
        .bili-header .history-fold-wrap:hover .fold-text {
            color: #FB7299 !important;
        }
        .bili-header .history-fold-wrap:hover .fold-icon path {
            fill: #FB7299 !important;
        }

        /* 顶栏阴影 */
        .bili-header .mini-header {
            box-shadow: none !important;
        }

        /* 顶栏左右边距 */
        .bili-header .left-entry {
            padding-left: 46px !important;
        }
        .bili-header .right-entry {
            margin-right: 50px !important;
        }

        /* 顶部导航栏高度调整 */
        .bili-header .bili-header__bar {
            height: 50px !important;
        }
        #biliMainHeader,
        .bili-header {
            min-height: 50px !important;
        }

        /* 禁止顶部导航栏固定显示 */
        .bili-header.fixed-header .bili-header__bar {
            position: static !important;
        }
        #biliMainHeader {
            position: relative !important;
            z-index: 1000 !important;
        }

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

        /* 发消息按钮 */
        .send-msg {
            display: none !important;
        }

        /* 移除B站投票弹幕 移除弹幕引导 */
        .bili-danmaku-x-vote.bili-danmaku-x-show,
        .bili-danmaku-x-guide-all.bili-danmaku-x-guide.bili-danmaku-x-show {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            pointer-events: none !important;
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

        /* 弹幕栏 */
        .bpx-player-container .bpx-player-sending-bar, .bpx-player-container .bpx-player-sending-bar {
            height: 48px !important;
          }
        .bpx-player-container .bpx-player-sending-bar .bpx-player-video-inputbar, .bpx-player-container .bpx-player-sending-bar .bpx-player-video-inputbar {
            height: 32px !important;
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
        .bpx-player-mode-selection-container .bpx-player-mode-selection-panel .bpx-player-mode-selection-row.mode .selection-span.active,
        .bpx-player-mode-selection-container .bpx-player-mode-selection-panel .bpx-player-mode-selection-row.mode .selection-span.active:hover {
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
        .video-desc-container .toggle-btn[data-v-632962f9] {
            margin-top: 4px !important;
        }
        .video-desc-container {
            margin: 0 !important;
        }
        .video-tag-container {
            margin: 10px 0 10px 0 !important;
            padding-bottom: 0px !important;
        }
        .video-desc-container .basic-desc-info[style*="height: 91px"] {
            height: 80px !important;
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
            filter: sepia(0.42) hue-rotate(-202deg) saturate(2.55) brightness(1.28);
        }
        #v_desc .toggle-btn .toggle-btn-text:hover {
            color: #FB7299;
        }

        /* 记笔记 */
        .video-note-inner:hover .video-note-icon {
            fill: #FB7299 !important;
        }
        .video-note-inner:hover .video-note-info {
            color: #FB7299 !important;
        }

        /* 合集 */
        .video-pod .video-pod__header .header-top .left .title[data-v-dac4fbd2]:hover {
            color: #FB7299 !important;
        }
        .simple-base-item:hover .title-txt,
        .simple-base-item.head.active .title,
        .simple-base-item.sub.active .title,
        .simple-base-item:hover .stat-item.duration {
            color: #FB7299 !important;
        }
        .simple-base-item .title {
            font-size: 14px !important;
        }
        .pod-slide .slide-inner .slide-item.active, .slide-item:hover {
            color: #FB7299 !important;
        }
        .pod-slide .slide-inner .slide-item,.pod-slide .slide-inner .slide-item {
            font-weight: 500 !important;
            border-radius: 8px !important;
        }
        .pod-slide .slide-inner .slide-item.active::before {
            background-color: #555 !important;
        }
        .simple-base-item {
            border-radius: 8px !important;
        }

        /* 订阅合集 */
        .video-pod .video-pod__header .header-bottom .right .subscribe-btn {
            color: #FB7299 !important;
            border: 1px solid #FB7299 !important;
            border-radius: 8px !important;
        }

        /* 弹幕列表 菜单图标悬停时的颜色 */
        .bui-dropdown-icon:hover svg path {
            fill: #FB7299 !important;
        }

        /* 弹幕列表 菜单图标位置修复 */
        .bui-dropdown-icon {
            position: relative !important;
            top: -2px !important;
            margin-left: 0px !important;
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
        .video-page-card-small .card-box .pic-box .framepreview-box .video-awesome-img,
        .video-page-card-small .card-box .pic-box,
        .video-page-card-small .card-box .pic-box .pic {
            border-radius: 8px !important;
        }
        .video-page-card-small {
            margin-bottom: 8px !important;
        }
        .recommend-list-v1 .rec-list {
            margin-top: 8px !important;
        }
        .video-page-card-small .card-box .pic-box .framepreview-box .video-awesome-img,
        .video-page-card-small .card-box .pic-box {
            width: 168px !important;
            height: 94.5px !important;
        }
        .video-page-card-small .card-box .info .title {
            font-size: 14px !important;
        }
        .video-page-card-small .card-box .info .upname a,
        .video-page-card-small .card-box .info .playinfo {
            color: #606060 !important;
            font-size: 12px !important;
        }
        .recommend-list-v1 .rec-title .title-txt[data-v-17ce950e] {
            font-size: 14px !important;
        }
        .split-line {
            display: none !important;
        }
        .recommend-list-v1 .rec-title {
            margin-bottom: 4px !important;
        }

        /* 默认模式 (data-screen="normal") */
        .left-container {
            width: 1350px !important;
        }
        #bilibili-player {
            width: 1350px !important;
            height: 808px !important;
        }
        .video-toolbar-container,
        .video-tag-container {
            border-bottom: none !important;
        }

        /* 宽屏模式 (data-screen="wide") */
        body:has(.bpx-player-container[data-screen="wide"]) .left-container {
            width: 1350px !important;
            float: none !important;
            margin: 0 auto !important;
            display: block !important;
        }
        body:has(.bpx-player-container[data-screen="wide"]) #bilibili-player {
            width: 1350px !important;
            height: 808px !important;
        }
        body:has(.bpx-player-container[data-screen="wide"]) .video-toolbar-container {
            padding-top: 20px !important;
            margin: 0 auto !important;
            max-width: 100% !important;
            border-bottom: none !important;
        }
        body:has(.bpx-player-container[data-screen="wide"]) .video-tag-container {
            border-bottom: none !important;
        }
        body:has(.bpx-player-container[data-screen="wide"]) .right-container {
            display: none !important;
        }
        #playerWrap {
            height: 808px !important;
        }

        /* 播放界面向上移动的距离 */
        .video-container-v1 {
            margin-top: -10px !important;
        }
        .video-info-container .video-info-meta {
            margin-top: -2px !important;
            height: 34px !important;
        }
        .video-info-container {
            height: 90px !important;
            padding-top: 20px !important;
        }
        .up-info-container {
            height: 90px !important;
            padding-top: 20px !important;
        }
        .up-info__btn-panel {
            display:none !important;
        }

        /* 左侧播放器与右边列表的间距 */
        .video-container-v1 .right-container {
            margin-left: 16px !important;
        }

        /* 右侧列表底部边距 */
        .video-container-v1 .right-container .video-pod {
            margin-bottom: 12px !important;
        }
        .video-container-v1 .right-container .danmaku-box {
            margin-bottom: 8px !important;
        }

        /* 右侧视频列表 顶部外边距微调 */
        .recommend-list-v1 {
            margin-top: -4px !important;
        }

        /* 右侧视频列表广告 */
        .video-card-ad-small, .video-page-game-card-small, .ad-report.ad-floor-exp.right-bottom-banner {
            display: none !important;
        }

        /* 右侧视频小窗 */
        .fixed-sidenav-storage .fixed-sidenav-storage-item.mini-player-window.on {
            color: #FB7299 !important;
        }
        .bpx-player-container[data-screen="mini"] {
            right: 100px !important;
            bottom: 30px !important;
            border-radius: 12px !important;
        }
        .bpx-player-video-area {
            background-color: #fff0 !important;
        }
        .bpx-player-mini-progress {
            display: none !important;
        }

        /* 移除广告横幅 */
        .activity-m-v1.act-end,
        .activity-m-v1.act-now,
        .strip-ad.left-banner.ad-report,
        #slide_ad.slide-ad-exp{
            display: none !important;
            visibility: hidden !important;
        }
    `);
})();

