// ==UserScript==
// @name         哔哩哔哩播放页修改 （YouTube 布局）
// @namespace    http://tampermonkey.net/
// @version      0.6.35
// @description  大肥鱼使用了 298,847,704 tok
// @author       deepseek
// @icon         https://www.bilibili.com/favicon.ico
// @match        *://www.bilibili.com/video/*
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

(function () {
    'use strict';

    // 尽早标记普通模式，避免播放器初始化时先出现一帧错误高度
    document.documentElement.classList.add('yt-normal');
    // 布局重排完成前先隐藏投稿者，避免它先在右侧栏闪一下
    document.documentElement.classList.add('yt-layout-pending');

    /* =====================================================================
     *  YouTube 播放页布局
     *  1920 宽度下对齐 YouTube：
     *    内容区左右 16px；播放器 1337px；间距 16px；右栏 520px
     *    标题 20/28；UP 主行 43px；简介灰底圆角 12px；右侧卡片 520x183
     *  弹幕发送条在非全屏时也常驻，位于播放器下方，高 48px。
     * ===================================================================== */

    const CSS = `
    /* ================= 基础与隐藏干扰项 ================= */
    .trending,
    .activity-m-v1.act-end,
    .activity-m-v1.act-now,
    .strip-ad.left-banner.ad-report,
    #slide_ad.slide-ad-exp,
    .video-card-ad-small,
    .video-page-game-card-small,
    .video-page-special-card-small,
    .ad-report.ad-floor-exp.right-bottom-banner,
    .video-resource-list,
    .bpx-player-viewpoint,
    .bpx-player-shadow-progress-area,
    .bpx-player-follow,
    .bpx-player-top-issue,
    .bpx-player-ctrl-btn.bpx-player-ctrl-web,
    .bili-danmaku-x-vote.bili-danmaku-x-show,
    .bili-danmaku-x-guide-all.bili-danmaku-x-guide.bili-danmaku-x-show,
    .be-settings,
    #bilibili-player-placeholder {
        display: none !important;
    }

    /* 顶栏：YouTube 为 56px，无阴影 */
    .bili-header .bili-header__bar,
    .bili-header .left-entry,
    .bili-header .mini-header .center-search-container {
        height: 56px !important;
    }
    #biliMainHeader,
    .bili-header {
        min-height: 56px !important;
    }
    .bili-header.bili-header--mini .bili-header__bar {
        box-shadow: none !important;
    }
    .trending {
        display: none !important;
    }

    /* ================= 主栅格 ================= */
    .video-container-v1 {
        display: grid !important;
        grid-template-columns: minmax(0, 1395px) auto !important;
        justify-content: center !important;
        column-gap: 16px !important;
        align-items: start !important;
        width: 100% !important;
        max-width: none !important;
        margin: 0 !important;
        margin-top: 4px !important;
        padding: 0 16px !important;
        box-sizing: border-box !important;
    }
    .left-container {
        display: grid !important;
        grid-template-columns: 100% !important;
        grid-auto-rows: max-content !important;
        position: static !important;
        width: auto !important;
        min-width: 0 !important;
        margin: 0 !important;
        padding: 0 !important;
    }
    #viewbox_report {
        grid-row: 2 !important;
        grid-column: 1 !important;
    }
    .left-container > :not(#viewbox_report):not(#playerWrap) {
        grid-row: auto !important;
        grid-column: 1 !important;
    }
    /* 右侧推荐列表保持 B 站默认宽度与封面尺寸，不再缩放 */
    .video-container-v1 .right-container {
        position: static !important;
        margin: 0 !important;
        padding: 0 !important;
    }
    .right-container-inner {
        position: sticky !important;
        top: 68px !important;
        padding: 0 0 40px !important;
    }

    /* ================= 播放器 ================= */
    #playerWrap {
        grid-row: 1 !important;
        grid-column: 1 !important;
        width: 100% !important;
        margin: 0 !important;
    }
    #bilibili-player {
        width: 100% !important;
    }
    .bpx-player-container {
        width: 100% !important;
        border-radius: 12px !important;
        box-shadow: none !important;
        overflow: hidden !important;
    }
    .bpx-player-primary-area {
        display: flex !important;
        flex-direction: column !important;
        height: 100% !important;
    }
    .bpx-player-video-area {
        width: 100% !important;
        flex: 0 0 auto !important;
        background: #000 !important;
        border-radius: 12px !important;
    }
    /* 普通模式由 CSS 直接维持精确 16:9，避免脚本反复改高度造成尺寸跳动 */
    html.yt-normal #playerWrap {
        height: auto !important;
        aspect-ratio: 16 / 9 !important;
    }
    html.yt-normal #bilibili-player,
    html.yt-normal .bpx-player-container,
    html.yt-normal .bpx-player-video-area {
        height: 100% !important;
    }
    /* 重排完成前隐藏投稿者/创作团队，避免右侧栏顶部闪现 */
    html.yt-layout-pending .up-info-container {
        visibility: hidden !important;
    }
    html.yt-layout-pending .up-panel-container {
        display: none !important;
    }
    /* 全屏/画中画不保留圆角 */
    :fullscreen .bpx-player-container,
    :fullscreen .bpx-player-video-area,
    .bpx-player-container:fullscreen,
    .bpx-player-rich-pip-stage .bpx-player-video-area {
        border-radius: 0 !important;
    }

    /* 弹幕发送条：并入播放器控制栏，控制栏显示时出现（与全屏完全一致） */
    .bpx-player-sending-area {
        display: none !important;
    }
    body.yt-bar .bpx-player-control-bottom-center {
        display: flex !important;
        align-items: flex-start !important;
        justify-content: center !important;
        height: 35px !important;
        padding: 0 !important;
        overflow: visible !important;
    }
    body.yt-bar .bpx-player-control-bottom-center .bpx-player-sending-bar {
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        box-sizing: border-box !important;
        width: 560px !important;
        max-width: 100% !important;
        height: 34px !important;
        margin: -6px auto 0 !important;
        padding: 0 !important;
        background: transparent !important;
    }
    /* 移除“XX人正在观看” */
    body.yt-bar .bpx-player-control-bottom-center .bpx-player-video-info {
        display: none !important;
    }
    body.yt-bar .bpx-player-control-bottom-center .bpx-player-dm-root {
        display: flex !important;
        flex: 1 1 auto !important;
        align-items: center !important;
        min-width: 0 !important;
    }
    body.yt-bar .bpx-player-control-bottom-center .bui-danmaku-switch {
        margin: 0 8px 0 0 !important;
    }
    body.yt-bar .bpx-player-control-bottom-center .bui-danmaku-switch svg path {
        fill: rgba(255, 255, 255, .9) !important;
    }
    /* 第二个弹幕设置按钮与第一个弹幕开关同色 */
    body.yt-bar .bpx-player-control-bottom-center .bpx-player-dm-setting {
        color: rgba(255, 255, 255, .9) !important;
    }
    body.yt-bar .bpx-player-control-bottom-center .bpx-player-dm-setting > svg path,
    body.yt-bar .bpx-player-control-bottom-center .bpx-player-dm-setting > .bpx-common-svg-icon svg path {
        fill: rgba(255, 255, 255, .9) !important;
    }
    body.yt-bar .bpx-player-control-bottom-center .bpx-player-video-inputbar {
        flex: 1 1 auto !important;
        width: auto !important;
        min-width: 0 !important;
        height: 34px !important;
        margin: 0 !important;
        background: rgba(255, 255, 255, .3) !important;
        border-radius: 8px !important;
    }
    body.yt-bar .bpx-player-control-bottom-center .bpx-player-video-btn-dm svg path {
        fill: rgba(255, 255, 255, .8) !important;
    }
    body.yt-bar .bpx-player-control-bottom-center .bpx-player-dm-input {
        height: 34px !important;
        color: #fff !important;
        font-size: 14px !important;
        line-height: 34px !important;
    }
    body.yt-bar .bpx-player-control-bottom-center .bpx-player-dm-input::placeholder {
        color: rgba(255, 255, 255, .6) !important;
    }
    body.yt-bar .bpx-player-control-bottom-center .bpx-player-dm-hint {
        color: rgba(255, 255, 255, .6) !important;
    }
    body.yt-bar .bpx-player-control-bottom-center .bpx-player-dm-hint a {
        color: rgba(255, 255, 255, .75) !important;
    }
    body.yt-bar .bpx-player-control-bottom-center .bpx-player-dm-hint a:hover {
        color: #fff !important;
    }
    body.yt-bar .bpx-player-control-bottom-center .bpx-player-dm-hint [data-i18n-status-icon],
    body.yt-bar .bpx-player-control-bottom-center .bpx-player-dm-hint [data-i18n-status-icon] svg,
    body.yt-bar .bpx-player-control-bottom-center .bpx-player-dm-hint [data-i18n-status-icon] svg path {
        fill: #9499a0 !important;
    }
    /* 弹幕礼仪文字与箭头同时悬停变白 */
    body.yt-bar .bpx-player-control-bottom-center .bpx-player-dm-hint a:hover [data-i18n-status-label],
    body.yt-bar .bpx-player-control-bottom-center .bpx-player-dm-hint a:hover [data-i18n-status-icon],
    body.yt-bar .bpx-player-control-bottom-center .bpx-player-dm-hint a:hover [data-i18n-status-icon] svg,
    body.yt-bar .bpx-player-control-bottom-center .bpx-player-dm-hint a:hover [data-i18n-status-icon] svg path {
        color: #fff !important;
        fill: #fff !important;
    }
    body.yt-bar .bpx-player-control-bottom-center .bpx-player-dm-btn-send {
        width: 64px !important;
        height: 34px !important;
    }
    body.yt-bar .bpx-player-control-bottom-center .bpx-player-dm-btn-send .bui-area {
        height: 34px !important;
        line-height: 34px !important;
        padding: 0 12px !important;
        border-radius: 0 8px 8px 0 !important;
        background: transparent !important;
        color: #fff !important;
        font-size: 14px !important;
    }
    body.yt-bar .bpx-player-control-bottom-center .bpx-player-dm-btn-send .bui-area:hover {
        background: rgba(255, 255, 255, .2) !important;
    }

    /* ================= 宽屏模式（沿用原始脚本的播放器尺寸） ================= */
    body:has(.bpx-player-container[data-screen="wide"]) .video-container-v1 {
        display: block !important;
        margin: 10px 0 0 !important;
        padding: 0 16px !important;
    }
    body:has(.bpx-player-container[data-screen="wide"]) .left-container {
        width: 1395px !important;
        max-width: 100% !important;
        margin: 0 auto !important;
        padding: 0 !important;
        float: none !important;
    }
    body:has(.bpx-player-container[data-screen="wide"]) .video-container-v1 .right-container {
        display: none !important;
    }
    body:has(.bpx-player-container[data-screen="wide"]) #playerWrap {
        width: 1395px !important;
        max-width: 100% !important;
        height: 784.6px !important;
        margin: -8px auto 0 !important;
    }
    body:has(.bpx-player-container[data-screen="wide"]) #bilibili-player {
        width: 1395px !important;
        max-width: 100% !important;
        height: 784.6px !important;
        margin: 0 auto !important;
    }
    body:has(.bpx-player-container[data-screen="wide"]) .bpx-player-container,
    body:has(.bpx-player-container[data-screen="wide"]) .bpx-player-video-area {
        width: 1395px !important;
        max-width: 100% !important;
        height: 784.6px !important;
        margin: 0 auto !important;
    }

    /* ================= 标题 / UP 主 / 操作按钮 ================= */
    #viewbox_report {
        height: auto !important;
        margin: 0 !important;
        padding: 12px 0 0 !important;
    }
    .video-info-title {
        height: auto !important;
        margin: 0 !important;
    }
    .video-info-title-inner .video-title {
        font-size: 20px !important;
        line-height: 28px !important;
        font-weight: 500 !important;
        color: #0f0f0f !important;
    }
    /* 观看数/日期移入简介框，原位置不再显示 */
    .video-info-meta {
        display: none !important;
    }

    .yt-meta-row {
        display: flex !important;
        align-items: flex-start !important;
        justify-content: space-between !important;
        gap: 16px !important;
        margin-top: 8px !important;
        min-height: 43px !important;
    }

    /* UP 主：头像 40，名字 16，订阅按钮黑色胶囊 */
    .yt-meta-row .up-info-container {
        display: flex !important;
        align-items: center !important;
        gap: 12px !important;
        width: auto !important;
        height: 43px !important;
        margin: 0 !important;
        padding: 0 !important;
    }
    .yt-meta-row .up-info--left {
        margin: 0 !important;
    }
    .yt-meta-row .up-avatar-wrap,
    .yt-meta-row .up-avatar,
    .yt-meta-row .up-avatar .bili-avatar {
        box-sizing: border-box !important;
        width: 40px !important;
        height: 40px !important;
        min-height: 40px !important;
        max-height: 40px !important;
        padding: 0 !important;
        margin: 0 !important;
    }
    .yt-meta-row .up-avatar .bili-avatar {
        position: relative !important;
        transform: none !important;
        border-radius: 50% !important;
    }
    .yt-meta-row .up-avatar .bili-avatar-img.bili-avatar-face {
        top: 50% !important;
        left: 50% !important;
        width: 40px !important;
        height: 40px !important;
        object-fit: cover !important;
        transform: translate(-50%, -50%) !important;
    }
    .yt-meta-row .up-avatar .bili-avatar-img {
        width: 40px !important;
        height: 40px !important;
        object-fit: cover !important;
    }
    .yt-meta-row .live-mask {
        display: none !important;
    }
    .yt-meta-row .live-cycle {
        width: 48px !important;
        height: 48px !important;
        transform: translate(-50%, -50%) scale(0.52) !important;
        transform-origin: 50% 50% !important;
    }
    .yt-meta-row .bili-avatar-nft-icon {
        top: auto !important;
        right: -2px !important;
        bottom: -2px !important;
        left: auto !important;
        display: block !important;
        width: 18px !important;
        height: 18px !important;
    }
    .yt-meta-row .bili-avatar-right-icon,
    .yt-meta-row .bili-avatar-pendent-dom,
    .yt-meta-row .up-avatar-wrap.has-pendant::after {
        display: none !important;
    }
    .yt-meta-row .up-info--right {
        display: flex !important;
        align-items: center !important;
        width: auto !important;
        height: 43px !important;
        margin: 0 !important;
        overflow: visible !important;
    }
    .yt-meta-row .up-info__detail {
        display: block !important;
        flex: 0 0 auto !important;
        width: auto !important;
        height: auto !important;
        margin: 0 !important;
        overflow: visible !important;
    }
    .yt-meta-row .up-detail {
        display: block !important;
        width: auto !important;
        height: auto !important;
        margin: 0 !important;
    }
    .yt-meta-row .up-detail-top {
        display: flex !important;
        align-items: center !important;
        width: auto !important;
        height: 22px !important;
    }
    .yt-meta-row .up-name {
        display: block !important;
        flex: 0 0 auto !important;
        width: auto !important;
        max-width: none !important;
        margin: 0 !important;
        font-size: 16px !important;
        line-height: 22px !important;
        font-weight: 500 !important;
        white-space: nowrap !important;
        overflow: visible !important;
    }
    .yt-meta-row .up-description,
    .yt-meta-row .send-msg {
        display: none !important;
    }
    .yt-subs {
        margin-top: 1px !important;
        font-size: 12px !important;
        line-height: 18px !important;
        color: #606060 !important;
    }
    .yt-meta-row .up-info__btn-panel {
        display: block !important;
        flex: 0 0 auto !important;
        margin: 0 0 0 16px !important;
    }
    .yt-meta-row .upinfo-btn-panel {
        display: flex !important;
        align-items: center !important;
        gap: 8px !important;
    }
    .yt-meta-row .upinfo-btn-panel .new-charge-btn {
        display: none !important;
    }
    .yt-meta-row .upinfo-btn-panel .follow-btn {
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        box-sizing: border-box !important;
        height: 36px !important;
        width: 76px !important;
        min-width: 76px !important;
        padding: 0 16px !important;
        border: none !important;
        border-radius: 18px !important;
    }
    .yt-meta-row .upinfo-btn-panel .follow-btn.not-follow {
        background: #0f0f0f !important;
        color: #fff !important;
    }
    .yt-meta-row .upinfo-btn-panel .follow-btn:not(.not-follow) {
        background: #f2f2f2 !important;
        color: #0f0f0f !important;
    }
    .yt-meta-row .upinfo-btn-panel .follow-btn:not(.not-follow):hover {
        background: rgba(0, 0, 0, .1) !important;
    }
    .yt-meta-row .upinfo-btn-panel .follow-btn .follow-btn-icon {
        display: none !important;
    }
    .yt-meta-row .upinfo-btn-panel .follow-btn .van-followed {
        display: none !important;
    }
    .yt-meta-row .upinfo-btn-panel .follow-btn .follow-btn-inner {
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        font-size: 0 !important;
        line-height: 36px !important;
    }
    .yt-meta-row .upinfo-btn-panel .follow-btn.not-follow .follow-btn-inner::after {
        content: "关注";
        font-size: 14px !important;
        font-weight: 500 !important;
        line-height: 36px !important;
        color: #fff !important;
    }
    .yt-meta-row .upinfo-btn-panel .follow-btn:not(.not-follow) .follow-btn-inner::after {
        content: "已关注";
        font-size: 14px !important;
        font-weight: 500 !important;
        line-height: 36px !important;
        color: #0f0f0f !important;
    }
    .usercard-wrap {
        left: 20px !important;
        top: 600px !important;
    }
    .latest-archives {
        display: none !important;
    }

    /* 创作团队：多位投稿人时，头像 + 名字 + 粉丝数依次向右排列 */
    .yt-meta-row.yt-team-mode .up-info-container {
        display: none !important;
    }
    .yt-meta-row .up-panel-container {
        display: block !important;
        flex: 0 1 auto !important;
        width: auto !important;
        min-width: 0 !important;
        height: 43px !important;
        margin: 0 !important;
        padding: 0 !important;
        background: transparent !important;
        overflow: visible !important;
    }
    .yt-meta-row .up-panel-container .members-info-container,
    .yt-meta-row .up-panel-container .membersinfo-normal {
        display: block !important;
        height: 43px !important;
        margin: 0 !important;
        padding: 0 !important;
        background: transparent !important;
        overflow: visible !important;
    }
    .yt-meta-row .up-panel-container .header {
        display: none !important;
    }
    .yt-meta-row .up-panel-container .container {
        display: flex !important;
        align-items: center !important;
        gap: 20px !important;
        height: 43px !important;
        max-height: none !important;
        margin: 0 !important;
        padding: 0 !important;
        overflow: visible !important;
    }
    .yt-meta-row .up-panel-container .membersinfo-upcard-wrap {
        display: flex !important;
        align-items: center !important;
        gap: 8px !important;
        flex: 0 0 auto !important;
        width: auto !important;
        margin: 0 !important;
        padding: 0 !important;
    }
    .yt-meta-row .up-panel-container .membersinfo-upcard {
        display: flex !important;
        flex-direction: row !important;
        align-items: center !important;
        gap: 10px !important;
        width: auto !important;
        height: 43px !important;
        margin: 0 !important;
        padding: 0 !important;
    }
    .yt-meta-row .up-panel-container .membersinfo-upcard .avatar {
        display: block !important;
        position: relative !important;
        flex: 0 0 40px !important;
        box-sizing: border-box !important;
        width: 40px !important;
        height: 40px !important;
        margin: 0 !important;
        padding: 0 !important;
        border: 0 !important;
        border-radius: 50% !important;
        background: transparent !important;
        overflow: visible !important;
    }
    .yt-meta-row .up-panel-container .membersinfo-upcard .avatar-img {
        display: block !important;
        box-sizing: border-box !important;
        width: 40px !important;
        height: 40px !important;
        border-radius: 50% !important;
        overflow: hidden !important;
    }
    .yt-meta-row .up-panel-container .membersinfo-upcard .avatar-img img {
        display: block !important;
        width: 40px !important;
        height: 40px !important;
        border-radius: 50% !important;
        object-fit: cover !important;
    }
    .yt-meta-row .up-panel-container .membersinfo-upcard .staff-info {
        display: flex !important;
        flex-direction: column !important;
        align-items: flex-start !important;
        justify-content: center !important;
        gap: 1px !important;
        height: 40px !important;
        margin: 0 !important;
        padding: 0 !important;
        text-align: left !important;
        overflow: visible !important;
    }
    .yt-meta-row .up-panel-container .membersinfo-upcard .staff-name {
        display: block !important;
        width: auto !important;
        height: 20px !important;
        margin: 0 !important;
        padding: 0 !important;
        overflow: visible !important;
        color: #0f0f0f !important;
        font-size: 16px !important;
        font-weight: 500 !important;
        line-height: 20px !important;
        white-space: nowrap !important;
    }
    .yt-meta-row .up-panel-container .membersinfo-upcard .info-tag {
        display: none !important;
    }
    .yt-meta-row .up-panel-container .membersinfo-upcard .yt-subs {
        display: block !important;
        height: 16px !important;
        margin: 0 !important;
        color: #606060 !important;
        font-size: 12px !important;
        font-weight: 400 !important;
        line-height: 16px !important;
        white-space: nowrap !important;
    }
    /* 非 UP 主成员保留 B 站默认的“加关注”小按钮，悬停成员卡时显示 */
    .yt-meta-row .up-panel-container .membersinfo-upcard .add-follow-btn {
        display: flex !important;
        position: absolute !important;
        right: -2px !important;
        bottom: -2px !important;
        top: auto !important;
        left: auto !important;
        align-items: center !important;
        justify-content: center !important;
        box-sizing: border-box !important;
        width: 18px !important;
        height: 18px !important;
        border: 2px solid #fff !important;
        border-radius: 50% !important;
        background: #0f0f0f !important;
        color: #fff !important;
        font-size: 12px !important;
        line-height: 14px !important;
        opacity: 0 !important;
        transition: opacity .15s ease !important;
    }
    .yt-meta-row .up-panel-container .membersinfo-upcard:hover .add-follow-btn {
        opacity: 1 !important;
    }
    .yt-meta-row .up-panel-container .membersinfo-upcard .add-follow-btn i {
        color: #fff !important;
        font-size: 12px !important;
        line-height: 1 !important;
    }
    .yt-meta-row .up-panel-container .membersinfo-upcard.yt-team-has-pill .add-follow-btn {
        display: none !important;
    }
    /* 每位投稿人：YouTube 黑色胶囊关注按钮（使用原成员卡关注事件） */
    .yt-follow-pill {
        display: flex !important;
        flex: 0 0 auto !important;
        align-items: center !important;
        justify-content: center !important;
        box-sizing: border-box !important;
        height: 36px !important;
        min-width: 76px !important;
        margin: 0 !important;
        padding: 0 16px !important;
        border: 0 !important;
        border-radius: 18px !important;
        background: #0f0f0f !important;
        color: #fff !important;
        font-family: inherit !important;
        font-size: 14px !important;
        font-weight: 500 !important;
        line-height: 36px !important;
        white-space: nowrap !important;
        cursor: pointer !important;
    }
    .yt-follow-pill:hover {
        background: #272727 !important;
    }
    .yt-follow-pill.following {
        background: #f2f2f2 !important;
        color: #0f0f0f !important;
    }
    .yt-follow-pill.following:hover {
        background: rgba(0, 0, 0, .1) !important;
    }

    /* 创作团队：最多显示 5 位，超过 5 位时左右翻页 */
    body.yt-team-mode .up-panel-container {
        display: none !important;
    }
    .yt-team-carousel {
        display: flex !important;
        flex: 0 1 auto !important;
        align-items: center !important;
        gap: 4px !important;
        height: 43px !important;
        margin: 0 !important;
        padding: 0 !important;
        min-width: 0 !important;
        overflow: hidden !important;
    }
    .yt-team-viewport {
        display: flex !important;
        flex: 0 1 auto !important;
        align-items: center !important;
        gap: 20px !important;
        width: max-content;
        max-width: 1066px;
        min-width: 0 !important;
        height: 43px !important;
        margin: 0 !important;
        padding: 0 !important;
        overflow-x: auto !important;
        overflow-y: hidden !important;
        scroll-behavior: smooth;
        scrollbar-width: none !important;
        -ms-overflow-style: none !important;
    }
    .yt-team-viewport::-webkit-scrollbar {
        display: none !important;
        width: 0 !important;
        height: 0 !important;
        background: transparent !important;
    }
    .yt-team-viewport::-webkit-scrollbar-thumb,
    .yt-team-viewport::-webkit-scrollbar-track {
        display: none !important;
        background: transparent !important;
    }
    .yt-team-member {
        display: flex !important;
        flex: 0 0 auto !important;
        align-items: center !important;
        gap: 6px !important;
        box-sizing: border-box !important;
        width: auto !important;
        height: 43px !important;
        margin: 0 !important;
        padding: 0 !important;
    }
    .yt-team-avatar {
        display: block !important;
        flex: 0 0 40px !important;
        width: 40px !important;
        height: 40px !important;
        border-radius: 50% !important;
        overflow: hidden !important;
    }
    .yt-team-avatar img {
        display: block !important;
        width: 40px !important;
        height: 40px !important;
        border-radius: 50% !important;
        object-fit: cover !important;
    }
    .yt-team-info {
        display: flex !important;
        flex: 0 0 auto !important;
        flex-direction: column !important;
        justify-content: center !important;
        gap: 1px !important;
        width: max-content !important;
        max-width: 128px !important;
        min-width: 0 !important;
        height: 40px !important;
    }
    .yt-team-name {
        display: block !important;
        width: auto !important;
        max-width: 100% !important;
        overflow: hidden !important;
        color: #0f0f0f !important;
        font-size: 14px !important;
        font-weight: 500 !important;
        line-height: 20px !important;
        text-decoration: none !important;
        text-overflow: ellipsis !important;
        white-space: nowrap !important;
    }
    .yt-team-member .yt-subs {
        display: block !important;
        width: auto !important;
        max-width: 100% !important;
        height: 16px !important;
        margin: 0 !important;
        overflow: hidden !important;
        color: #606060 !important;
        font-size: 11px !important;
        line-height: 16px !important;
        text-overflow: ellipsis !important;
        white-space: nowrap !important;
    }
    .yt-team-member .yt-follow-pill {
        flex: 0 0 auto !important;
        min-width: 66px !important;
        margin: 0 !important;
        padding: 0 12px !important;
    }
    .yt-team-arrow {
        display: flex !important;
        flex: 0 0 28px !important;
        align-items: center !important;
        justify-content: center !important;
        box-sizing: border-box !important;
        width: 28px !important;
        height: 28px !important;
        margin: 0 !important;
        padding: 0 !important;
        border: 0 !important;
        border-radius: 50% !important;
        background: rgba(0, 0, 0, .06) !important;
        color: #0f0f0f !important;
        cursor: pointer !important;
    }
    .yt-team-arrow:hover {
        background: rgba(0, 0, 0, .12) !important;
    }
    .yt-team-arrow[disabled] {
        opacity: .25 !important;
        cursor: default !important;
    }
    .yt-team-arrow.yt-team-arrow-hidden {
        display: none !important;
    }
    .yt-team-arrow svg {
        display: block !important;
        width: 14px !important;
        height: 14px !important;
        margin: 0 !important;
    }
    .yt-team-carousel:not(.yt-team-has-more) .yt-team-arrow {
        display: none !important;
    }

    /* 点赞/投币/收藏/分享：右侧 YouTube 胶囊按钮 */
    .yt-meta-row #arc_toolbar_report {
        display: flex !important;
        flex: 0 0 auto !important;
        align-items: center !important;
        width: auto !important;
        height: 40px !important;
        margin: 0 0 0 auto !important;
        padding: 0 !important;
        border: 0 !important;
    }
    .yt-meta-row .video-toolbar-left {
        display: flex !important;
        align-items: center !important;
        height: 40px !important;
        gap: 0 !important;
    }
    .yt-meta-row .video-toolbar-left-main {
        display: flex !important;
        align-items: center !important;
        gap: 8px !important;
    }
    .yt-meta-row .toolbar-left-item-wrap {
        display: block !important;
        margin: 0 !important;
        padding: 0 !important;
    }
    .yt-meta-row .video-toolbar-left-item {
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        gap: 6px !important;
        box-sizing: border-box !important;
        height: 40px !important;
        padding: 0 16px !important;
        border-radius: 20px !important;
        background: rgba(0, 0, 0, .05) !important;
        color: #0f0f0f !important;
        font-size: 14px !important;
        font-weight: 500 !important;
        cursor: pointer !important;
    }
    .yt-meta-row .video-toolbar-left-item:hover {
        background: rgba(0, 0, 0, .1) !important;
        color: #0f0f0f !important;
    }
    .yt-meta-row .video-toolbar-item-icon {
        width: 24px !important;
        height: 24px !important;
    }
    /* 圆形按钮内只留图标：去掉 B 站给文字预留的右边距，保证图标居中 */
    .yt-meta-row .video-coin .video-toolbar-item-icon,
    .yt-meta-row .video-fav .video-toolbar-item-icon,
    .yt-meta-row .video-share-wrap .video-share-icon.video-toolbar-item-icon {
        display: block !important;
        margin: 0 !important;
    }
    .yt-meta-row .video-like {
        width: auto !important;
        min-width: 94px !important;
    }
    .yt-meta-row .video-like-info {
        width: auto !important;
        max-width: none !important;
        overflow: visible !important;
        text-overflow: clip !important;
        white-space: nowrap !important;
        font-size: 14px !important;
        font-weight: 500 !important;
        line-height: 20px !important;
    }
    .yt-meta-row .video-like.on {
        color: #FB7299 !important;
    }
    .yt-meta-row .video-coin,
    .yt-meta-row .video-fav,
    .yt-meta-row .video-share-wrap {
        width: 40px !important;
        padding: 0 !important;
    }
    .yt-meta-row .video-coin-info,
    .yt-meta-row .video-fav-info,
    .yt-meta-row .video-share-info {
        display: none !important;
    }
    .yt-meta-row .video-share-wrap .video-share-icon {
        display: block !important;
    }
    .yt-meta-row .video-toolbar-right {
        display: none !important;
    }

    /* ================= 简介框 ================= */
    .yt-desc-box {
        box-sizing: border-box !important;
        margin: 12px 0 0 !important;
        padding: 12px !important;
        background: rgba(0, 0, 0, .05) !important;
        border-radius: 12px !important;
        color: #0f0f0f !important;
        font-size: 14px !important;
        line-height: 20px !important;
    }
    .yt-desc-box .video-info-meta {
        display: block !important;
        height: auto !important;
        margin: 0 !important;
        padding: 0 !important;
    }
    .yt-desc-box .video-info-detail-list {
        display: flex !important;
        align-items: center !important;
        gap: 4px !important;
        height: auto !important;
    }
    .yt-desc-box .item:not(.honor) {
        height: 20px !important;
        font-size: 14px !important;
        line-height: 20px !important;
        color: #0f0f0f !important;
    }
    .yt-desc-box .video-info-detail-list .item[data-v-038b5956]:not(.honor) {
        margin-right: 8px !important;
    }
    .video-desc-container .basic-desc-info {
        font-size: 14px!important;
    }
    /* 抵消简介框的 20px 行高继承，恢复荣誉条目默认 1.5 倍行高 */
    .yt-desc-box .honor.item {
        line-height: 1.5 !important;
    }
    .honor,
    .honor.honor-rank {
        border-radius: 8px !important;
    }
    .yt-desc-box .dm.item,
    .yt-desc-box .copyright.item {
        display: none !important;
    }
    .yt-desc-box .view-text {
        font-weight: 500 !important;
    }
    .yt-desc-box .pubdate-ip-text {
        color: #000 !important;
        font-weight: 400 !important;
    }
    .yt-desc-box .video-desc-container {
        display: block !important;
        margin: 4px 0 0 !important;
        padding: 0 !important;
    }
    .yt-desc-box .basic-desc-info a {
        color: #FB7299 !important;
    }
    .yt-desc-box .toggle-btn {
        margin-top: 4px !important;
    }
    .yt-desc-box .toggle-btn-text:hover {
        color: #FB7299 !important;
    }

    /* 标签：从简介框中拆出，使用 B 站胶囊样式放在简介下方 */
    /* 标签移动/重排前也保持黑字，避免加载瞬间先闪成粉色 */
    .video-tag-container .tag-link,
    .video-tag-container .tag-link:hover {
        color: #000 !important;
    }
    .yt-tags {
        margin: 12px 0 0 !important;
    }
    .yt-tags .video-tag-container {
        height: auto !important;
        min-height: 32px !important;
        margin: 0 !important;
        padding: 0 !important;
        border: 0 !important;
        overflow: visible !important;
    }
    .yt-tags .tag-panel {
        display: flex !important;
        flex-wrap: wrap !important;
        align-items: center !important;
        gap: 8px 12px !important;
        height: auto !important;
        margin: 0 !important;
        padding: 0 !important;
        font-size: 14px !important;
        line-height: 32px !important;
        white-space: normal !important;
        overflow: visible !important;
    }
    .yt-tags .tag {
        display: inline-flex !important;
        align-items: center !important;
        height: 32px !important;
        margin: 0 !important;
        padding: 0 !important;
        border: 0 !important;
        background: none !important;
    }
    /* B 站用行内 display:none 隐藏的标签（例如“展开更多”按钮）不要强行显示 */
    .yt-tags .tag[style*="display: none"],
    .yt-tags .tag[style*="display:none"] {
        display: none !important;
    }
    .yt-tags .ordinary-tag {
        display: inline-flex !important;
        align-items: center !important;
        height: 32px !important;
        margin: 0 !important;
        padding: 0 !important;
        border: 0 !important;
        background: none !important;
        line-height: 32px !important;
    }
    .yt-tags .tag-link {
        display: inline-flex !important;
        align-items: center !important;
        box-sizing: border-box !important;
        height: 32px !important;
        padding: 0 12px !important;
        border-radius: 16px !important;
        background: #f1f2f3 !important;
        color: #000 !important;
        font-size: 14px !important;
        font-weight: 400 !important;
        line-height: 32px !important;
        text-decoration: none !important;
        white-space: nowrap !important;
    }
    .yt-tags .tag-link:hover {
        background: #e3e5e7 !important;
        color: #000 !important;
        text-decoration: none !important;
    }
    .yt-tags .tag-link::after {
        content: none !important;
    }
    .yt-tags .tag-panel.yt-empty {
        display: none !important;
    }

    /* 视频争议/评分：中性状态使用黑色文字 */
    .video-argue .video-argue-inner.neutral {
        color: #000 !important;
    }
    .video-argue .video-argue-inner {
        font-size: 14px !important;
    }

    /* ================= 评论区 ================= */
    #commentapp {
        margin-top: 24px !important;
    }

    /* ================= 右侧推荐列表 ================= */
    /* 合集面板：8px 圆角 */
    .video-pod[data-v-f1afcdb0] {
        border-radius: 8px !important;
    }
    /* 合集当前集播放指示条由蓝色改为粉色 */
    .simple-base-item .title .playing-gif {
        filter: sepia(0.42) hue-rotate(-202deg) saturate(2.55) brightness(1.28) !important;
    }
    .danmaku-box {
        display: none !important;
    }
    .recommend-list-v1 {
        margin-top: -4px !important;
    }
    .recommend-list-v1 .rec-title {
        margin-bottom: 8px !important;
    }
    .recommend-list-v1 .rec-title .title-txt {
        font-size: 14px !important;
    }
    .split-line {
        display: none !important;
    }
    .video-page-card-small {
        margin-bottom: 8px !important;
    }
    /* 右侧列表封面跟随容器宽度自适应（B 站自身的 16:9 尺寸），不再固定 192×108 */
    .video-page-card-small .card-box .pic-box {
        max-width: 100% !important;
        height: auto !important;
        aspect-ratio: 16 / 9 !important;
        border-radius: 8px !important;
    }
    .video-page-card-small .card-box .pic-box .pic,
    .video-page-card-small .card-box .pic-box .pic .framepreview-box,
    .video-page-card-small .card-box .pic-box .pic .b-img,
    .video-page-card-small .card-box .pic-box .pic img {
        border-radius: 8px !important;
    }
    .video-page-card-small .card-box .pic-box .pic {
        height: 100% !important;
    }
    .video-page-card-small .card-box .pic-box .pic img {
        height: 100% !important;
        object-fit: cover !important;
    }
    /* 右栏其他类型卡片（运营卡等）的封面同样 8px 圆角 */
    .video-container-v1 .right-container .pic-box,
    .video-container-v1 .right-container .pic-box .pic,
    .video-container-v1 .right-container .pic-box .pic .b-img,
    .video-container-v1 .right-container .pic-box .pic img {
        border-radius: 8px !important;
    }
    .video-page-card-small .card-box .info {
        margin-left: 8px !important;
    }
    .video-page-card-small .card-box .info .title {
        font-size: 14px !important;
    }
    .video-page-card-small .card-box .info .upname a,
    .video-page-card-small .card-box .info .playinfo {
        color: #606060 !important;
        font-size: 12px !important;
    }
    .video-page-card-small .card-box .pic-box .pic .duration {
        color: #fff !important;
        background: rgba(0, 0, 0, .6) !important;
        border-radius: 4px !important;
        font-size: 12px !important;
    }
    .continuous-btn {
        margin-left: auto !important;
    }

    /* ================= B 站粉色点缀 ================= */
    /* 全局把 B 站的蓝色强调变量改为粉色（显示与悬停一致） */
    html,
    body,
    :root {
        --brand_blue: #FB7299 !important;
        --Lb5: #FB7299 !important;
        --Lb5_u: #FB7299 !important;
        --custom-related-active: #FB7299 !important;
    }
    .bpx-player-progress-schedule-current,
    .bui-progress-bar {
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
    .bpx-player-ctrl-quality-menu-item.bpx-state-active,
    .bpx-player-ctrl-playbackrate-menu-item.bpx-state-active {
        color: #FB7299 !important;
    }
    .bui-slider .bui-track.bui-track-vertical .bui-bar-wrap .bui-bar,
    .bui-slider .bui-track .bui-bar-wrap .bui-bar {
        background: #FB7299 !important;
    }
    .bui-slider .bui-track .bui-thumb .bui-thumb-dot {
        background: #FB7299 !important;
    }
    .bpx-player-ctrl-subtitle-title-area .bpx-player-ctrl-subtitle-close-switch.bpx-state-active,
    .bpx-player-ctrl-subtitle-setting:hover,
    .bpx-player-ctrl-setting-more:hover .bpx-common-svg-icon,
    .bpx-player-ctrl-setting-more:hover,
    .bpx-player-dm-setting-left-more:hover,
    .bpx-player-dm-setting-right-more:hover {
        color: #FB7299 !important;
        fill: #FB7299 !important;
    }
    .bui-checkbox .bui-checkbox-input:checked + .bui-checkbox-label .bui-checkbox-icon svg,
    .bui-checkbox:hover .bui-checkbox-icon svg,
    .bui-switch .bui-switch-input:checked + .bui-switch-label .bui-switch-body {
        fill: #FB7299 !important;
        background: #FB7299 !important;
    }
    /* 弹幕设置菜单内的复选框与图标保持粉色 */
    .bpx-player-dm-setting-box .bui-checkbox.bui-dark .bui-checkbox-label .bui-checkbox-icon svg,
    .bpx-player-dm-setting-box .bui-checkbox.bui-dark:hover .bui-checkbox-label .bui-checkbox-icon svg {
        fill: #FB7299 !important;
        background: transparent !important;
        background-color: transparent !important;
    }
    .bpx-player-dm-setting-box .bui-checkbox.bui-dark .bui-checkbox-label .bui-checkbox-icon svg path,
    .bpx-player-dm-setting-box .bui-checkbox.bui-dark:hover .bui-checkbox-label .bui-checkbox-icon svg path {
        fill: #FB7299 !important;
    }
    /* 订阅合集、话题标签、合集选中项等原本的蓝色/悬停蓝色统一改粉色 */
    .subscribe-btn,
    .subscribe-btn:hover,
    .subscribe-btn *,
    .tag-link svg,
    .tag-link svg path,
    .video-pod .simple-base-item.active .title,
    .video-pod .simple-base-item.active .title-txt,
    .bpx-player-ctrl-eplist-multi-menu-item.bpx-state-multi-active-item,
    .bpx-player-ctrl-eplist-multi-menu-item.bpx-state-multi-active-item .bpx-player-ctrl-eplist-multi-menu-item-text,
    .bpx-player-ctrl-eplist-multi-menu-item.bpx-state-multi-active-item .bpx-common-svg-icon,
    .bpx-player-ctrl-eplist-multi-menu-item.bpx-state-multi-active-item svg,
    .bpx-player-ctrl-eplist-multi-menu-item.bpx-state-multi-active-item svg path,
    .bpx-player-ctrl-eplist-multi-menu-item:hover,
    .bpx-player-ctrl-eplist-multi-menu-item:hover .bpx-player-ctrl-eplist-multi-menu-item-text,
    .bpx-player-ctrl-eplist-multi-menu-item:hover .bpx-common-svg-icon,
    .bpx-player-ctrl-eplist-multi-menu-item:hover svg,
    .bpx-player-ctrl-eplist-multi-menu-item:hover svg path {
        color: #FB7299 !important;
        fill: #FB7299 !important;
    }
    .bui-button-blue {
        background: #FB7299 !important;
        color: #FFFFFF !important;
    }

    /* ================= 窄屏适配 ================= */
    @media (max-width: 1200px) {
        .video-container-v1 {
            grid-template-columns: minmax(0, 1fr) !important;
        }
        .video-container-v1 .right-container,
        .right-container-inner {
            position: static !important;
            width: 100% !important;
            margin-top: 24px !important;
        }
        /* 推荐列表改为自适应网格，封面跟随窗口宽度 */
        .video-container-v1 .right-container .recommend-list-v1 .rec-list {
            display: grid !important;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)) !important;
            gap: 16px !important;
        }
        .video-container-v1 .right-container .video-page-card-small {
            margin-bottom: 0 !important;
        }
        .video-container-v1 .right-container .rec-list .video-page-card-small .card-box {
            display: block !important;
            height: auto !important;
        }
        .video-container-v1 .right-container .rec-list .video-page-operator-card-small .card-box {
            display: block !important;
            height: auto !important;
        }
        .video-container-v1 .right-container .rec-list .video-page-card-small .card-box .pic-box,
        .video-container-v1 .right-container .rec-list .video-page-operator-card-small .card-box .pic-box {
            width: 100% !important;
            height: auto !important;
            aspect-ratio: 16 / 9 !important;
        }
        /* 网格卡片里的封面图片铺满整个 16:9 区域 */
        .video-container-v1 .right-container .rec-list .video-page-card-small .card-box .pic-box .pic,
        .video-container-v1 .right-container .rec-list .video-page-card-small .card-box .pic-box .pic .framepreview-box,
        .video-container-v1 .right-container .rec-list .video-page-card-small .card-box .pic-box .pic .video-awesome-img,
        .video-container-v1 .right-container .rec-list .video-page-card-small .card-box .pic-box .pic .b-img,
        .video-container-v1 .right-container .rec-list .video-page-card-small .card-box .pic-box .pic img,
        .video-container-v1 .right-container .rec-list .video-page-operator-card-small .card-box .pic-box .pic,
        .video-container-v1 .right-container .rec-list .video-page-operator-card-small .card-box .pic-box .pic .framepreview-box,
        .video-container-v1 .right-container .rec-list .video-page-operator-card-small .card-box .pic-box .pic .video-awesome-img,
        .video-container-v1 .right-container .rec-list .video-page-operator-card-small .card-box .pic-box .pic .b-img,
        .video-container-v1 .right-container .rec-list .video-page-operator-card-small .card-box .pic-box .pic img {
            width: 100% !important;
            height: 100% !important;
            object-fit: cover !important;
        }
        .video-container-v1 .right-container .rec-list .video-page-card-small .card-box .info,
        .video-container-v1 .right-container .rec-list .video-page-operator-card-small .card-box .info {
            width: auto !important;
            height: auto !important;
            margin: 8px 0 0 !important;
        }
        /* “接下来播放”第一张保持横向大卡，封面随窗口缩放 */
        .video-container-v1 .right-container .next-play .video-page-card-small .card-box .pic-box {
            width: min(46%, 360px) !important;
            height: auto !important;
            aspect-ratio: 16 / 9 !important;
        }
    }

    /* ================= 网页小窗播放 ================= */
    /* 只调整固定定位的小窗容器；不要直接改 .bpx-player-mini-warp，它是播放器内部覆盖层 */
    .bpx-player-container:has(.bpx-player-mini-warp[style=""]),
    .bpx-player-container:has(.bpx-player-mini-warp:not([style*="display: none"])),
    .bpx-player-container[style*="bottom:"] {
        width: 360px !important;
        height: 202.5px !important;
        max-width: calc(100vw - 32px) !important;
        aspect-ratio: 16 / 9 !important;
        border-radius: 8px !important;
    }
    .bpx-player-container:has(.bpx-player-mini-warp[style=""]) .bpx-player-primary-area,
    .bpx-player-container:has(.bpx-player-mini-warp[style=""]) .bpx-player-video-area,
    .bpx-player-container:has(.bpx-player-mini-warp[style=""]) #bilibili-player,
    .bpx-player-container[style*="bottom:"] .bpx-player-primary-area,
    .bpx-player-container[style*="bottom:"] .bpx-player-video-area,
    .bpx-player-container[style*="bottom:"] #bilibili-player {
        width: 100% !important;
        height: 100% !important;
    }
    `;

    if (typeof GM_addStyle === 'function') {
        GM_addStyle(CSS);
    } else {
        const style = document.createElement('style');
        style.id = 'yt-bili-layout-style';
        style.textContent = CSS;
        (document.head || document.documentElement).appendChild(style);
    }

    /* ================= 工具函数 ================= */
    const q = (selector, root = document) => root.querySelector(selector);

    function formatFans(value) {
        const count = Number(value) || 0;
        if (count >= 100000000) {
            return (count / 100000000).toFixed(1).replace(/\.0$/, '') + '亿';
        }
        if (count >= 10000) {
            return (count / 10000).toFixed(1).replace(/\.0$/, '') + '万';
        }
        return String(count);
    }

    function fansLabel(value) {
        const count = Number(value) || 0;
        return count ? formatFans(count) + '粉丝' : '';
    }

    function stateFans(mid) {
        const state = window.__INITIAL_STATE__;
        if (!state) return 0;
        const staff = state.staffData || (state.videoData && state.videoData.staff) || [];
        const hit = Array.from(staff).find((item) => String(item.mid) === String(mid));
        if (hit && hit.follower) return Number(hit.follower);
        if (state.upData && String(state.upData.mid) === String(mid)) {
            return Number(state.upData.fans) || 0;
        }
        return 0;
    }

    function clearImportantHeight(el) {
        if (!el) return;
        el.style.removeProperty('height');
    }

    /* ================= 结构重排 ================= */
    // 点击胶囊直接关注/取消关注（不再弹出“设置分组/取消关注”浮层）
    function bindSingleFollow(metaRow) {
        const followBtn = metaRow.querySelector('.follow-btn');
        if (!followBtn || followBtn.dataset.ytFollowBound) return;
        followBtn.dataset.ytFollowBound = '1';
        followBtn.addEventListener('click', (event) => {
            const panel = followBtn.closest('.upinfo-btn-panel');
            const vm = panel && panel.__vue__;
            if (!vm || typeof vm.follow !== 'function') return;
            event.preventDefault();
            event.stopImmediatePropagation();
            vm.follow();
            window.setTimeout(() => updateSingleFans(metaRow), 300);
            window.setTimeout(() => updateSingleFans(metaRow), 1000);
        }, true);
    }

    // 单人 UP 主：粉丝数从原关注按钮的“关注/已关注 15.2万”中提取
    function updateSingleFans(metaRow) {
        const detail = metaRow.querySelector('.up-detail');
        if (!detail) return;
        const followInner = metaRow.querySelector('.follow-btn-inner');
        const match = (followInner && followInner.textContent || '').match(/([\d.]+\s*[万亿]?)\s*$/);
        let text = '';
        if (match) {
            text = match[1].replace(/\s+/g, '') + '粉丝';
        } else {
            const state = window.__INITIAL_STATE__;
            const fans = state && state.upData && Number(state.upData.fans);
            if (fans) text = fansLabel(fans);
        }
        if (!text) return;

        let subs = detail.querySelector('.yt-subs');
        if (!subs) {
            subs = document.createElement('div');
            subs.className = 'yt-subs';
            detail.insertBefore(subs, detail.querySelector('.up-description'));
        }
        if (subs.textContent !== text) {
            subs.textContent = text;
        }
    }

    // 创作团队：每位成员显示头像、名字、粉丝数和独立关注按钮
    function teamFollowing(card) {
        const vm = card && card.__vue__;
        const attr = Number(vm && vm.relation && vm.relation.attribute) || 0;
        if (attr) return attr !== 128;
        return !card.querySelector('.add-follow-btn');
    }

    function teamStaffList(upPanel) {
        const state = window.__INITIAL_STATE__;
        const raw = (state && (state.staffData || (state.videoData && state.videoData.staff))) || [];
        if (raw.length) {
            return raw.map((item) => ({
                mid: String(item.mid),
                name: item.name || '',
                face: item.face || '',
                follower: Number(item.follower) || 0,
            })).filter((item) => item.mid && item.name);
        }
        return Array.from(upPanel ? upPanel.querySelectorAll('.membersinfo-upcard') : []).map((card) => {
            const info = (card.__vue__ && card.__vue__.info) || {};
            const href = card.querySelector('.avatar') && card.querySelector('.avatar').getAttribute('href') || '';
            const mid = String(info.mid || (href.match(/space\.bilibili\.com\/(\d+)/) || [])[1] || '');
            const image = card.querySelector('img');
            return {
                mid,
                name: info.name || (card.querySelector('.staff-name') && card.querySelector('.staff-name').textContent || '').trim(),
                face: info.face || (image && image.getAttribute('src')) || '',
                follower: Number(info.follower) || stateFans(mid) || 0,
            };
        }).filter((item) => item.mid && item.name);
    }

    function findTeamCard(upPanel, mid) {
        if (!upPanel) return null;
        return Array.from(upPanel.querySelectorAll('.membersinfo-upcard')).find((card) => {
            const info = card.__vue__ && card.__vue__.info;
            if (info && String(info.mid) === String(mid)) return true;
            const href = card.querySelector('.avatar') && card.querySelector('.avatar').getAttribute('href') || '';
            return href.includes('/' + mid);
        }) || null;
    }

    function syncTeamPills(metaRow, upPanel) {
        const panel = upPanel || q('.up-panel-container');
        metaRow.querySelectorAll('.yt-team-member').forEach((item) => {
            const pill = item.querySelector('.yt-follow-pill');
            if (!pill) return;
            const card = findTeamCard(panel, item.dataset.mid);
            const following = card ? teamFollowing(card) : false;
            const label = following ? '已关注' : '关注';
            if (pill.textContent !== label) pill.textContent = label;
            pill.classList.toggle('following', following);
        });
    }

    function updateTeamArrows(carousel) {
        if (!carousel) return;
        const viewport = carousel.querySelector('.yt-team-viewport');
        const prev = carousel.querySelector('.yt-team-prev');
        const next = carousel.querySelector('.yt-team-next');
        if (!viewport || !prev || !next) return;
        if (!carousel.classList.contains('yt-team-has-more')) {
            prev.disabled = true;
            next.disabled = true;
            prev.classList.add('yt-team-arrow-hidden');
            next.classList.add('yt-team-arrow-hidden');
            return;
        }
        const max = viewport.scrollWidth - viewport.clientWidth;
        const atStart = viewport.scrollLeft <= 1;
        const atEnd = viewport.scrollLeft >= max - 1;
        prev.disabled = atStart;
        next.disabled = atEnd;
        prev.classList.toggle('yt-team-arrow-hidden', atStart);
        next.classList.toggle('yt-team-arrow-hidden', atEnd);
    }

    function createTeamArrow(direction) {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'yt-team-arrow ' + (direction === 'prev' ? 'yt-team-prev' : 'yt-team-next');
        button.setAttribute('aria-label', direction === 'prev' ? '上一页投稿人' : '下一页投稿人');
        button.innerHTML = direction === 'prev'
            ? '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M10 3 5 8l5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>'
            : '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M6 3l5 5-5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>';
        return button;
    }

    function updateTeamCarousel(metaRow, upPanel) {
        const staff = teamStaffList(upPanel);
        if (!staff.length) return;

        let carousel = metaRow.querySelector('.yt-team-carousel');
        if (!carousel) {
            carousel = document.createElement('div');
            carousel.className = 'yt-team-carousel';
            carousel.appendChild(createTeamArrow('prev'));
            const viewport = document.createElement('div');
            viewport.className = 'yt-team-viewport';
            carousel.appendChild(viewport);
            carousel.appendChild(createTeamArrow('next'));
            const toolbar = metaRow.querySelector('#arc_toolbar_report');
            if (toolbar) metaRow.insertBefore(carousel, toolbar);
            else metaRow.appendChild(carousel);

            const viewportEl = carousel.querySelector('.yt-team-viewport');
            const prev = carousel.querySelector('.yt-team-prev');
            const next = carousel.querySelector('.yt-team-next');
            const step = () => viewportEl.clientWidth + 4;
            const maxScroll = () => Math.max(0, viewportEl.scrollWidth - viewportEl.clientWidth);
            prev.addEventListener('click', () => viewportEl.scrollTo({
                left: Math.max(0, viewportEl.scrollLeft - step()),
                behavior: 'smooth',
            }));
            next.addEventListener('click', () => viewportEl.scrollTo({
                left: Math.min(maxScroll(), viewportEl.scrollLeft + step()),
                behavior: 'smooth',
            }));
            viewportEl.addEventListener('scroll', () => updateTeamArrows(carousel), { passive: true });
        }

        const toolbar = metaRow.querySelector('#arc_toolbar_report');
        if (toolbar && carousel.nextElementSibling !== toolbar) {
            metaRow.insertBefore(carousel, toolbar);
        }

        const viewport = carousel.querySelector('.yt-team-viewport');
        const signature = staff.map((item) => `${item.mid}:${item.name}:${item.follower}`).join('|');
        if (carousel.dataset.signature !== signature) {
            viewport.innerHTML = '';
            staff.forEach((member) => {
                const item = document.createElement('div');
                item.className = 'yt-team-member';
                item.dataset.mid = member.mid;

                const avatar = document.createElement('a');
                avatar.className = 'yt-team-avatar';
                avatar.href = '//space.bilibili.com/' + member.mid;
                avatar.target = '_blank';
                avatar.rel = 'noreferrer';
                const image = document.createElement('img');
                image.src = member.face;
                image.alt = member.name;
                image.loading = 'lazy';
                avatar.appendChild(image);

                const info = document.createElement('div');
                info.className = 'yt-team-info';
                const name = document.createElement('a');
                name.className = 'yt-team-name';
                name.href = avatar.href;
                name.target = '_blank';
                name.rel = 'noreferrer';
                name.title = member.name;
                name.textContent = member.name;
                const subs = document.createElement('div');
                subs.className = 'yt-subs';
                subs.textContent = member.follower ? fansLabel(member.follower) : '';
                info.appendChild(name);
                info.appendChild(subs);

                const pill = document.createElement('button');
                pill.type = 'button';
                pill.className = 'yt-follow-pill';
                pill.textContent = '关注';
                pill.addEventListener('click', (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    const panel = q('.up-panel-container');
                    const card = findTeamCard(panel, member.mid);
                    const component = card && card.__vue__;
                    if (!component || typeof component.follow !== 'function') return;
                    component.follow();
                    window.setTimeout(() => syncTeamPills(metaRow, panel), 250);
                    window.setTimeout(() => syncTeamPills(metaRow, panel), 1000);
                    window.setTimeout(() => syncTeamPills(metaRow, panel), 2200);
                });

                item.appendChild(avatar);
                item.appendChild(info);
                item.appendChild(pill);
                viewport.appendChild(item);
            });
            carousel.dataset.signature = signature;
            viewport.scrollLeft = 0;
        }

        carousel.classList.toggle('yt-team-has-more', staff.length > 5);
        syncTeamPills(metaRow, upPanel);
        requestAnimationFrame(() => updateTeamArrows(carousel));
        window.setTimeout(() => updateTeamArrows(carousel), 300);
    }

    function updateDescBox(metaRow) {
        let descBox = q('.yt-desc-box');
        if (!descBox) {
            descBox = document.createElement('div');
            descBox.className = 'yt-desc-box';
        }
        if (metaRow.nextElementSibling !== descBox) {
            metaRow.after(descBox);
        }

        const meta = q('.video-info-meta');
        if (meta && meta.parentElement !== descBox) {
            descBox.appendChild(meta);
        }

        const vDesc = q('#v_desc');
        const hasDesc = !!(vDesc && (vDesc.innerText || '').trim());
        if (vDesc) {
            if (hasDesc) {
                if (vDesc.parentElement !== descBox) {
                    descBox.appendChild(vDesc);
                }
                vDesc.style.display = 'block';
            } else {
                vDesc.style.display = 'none';
            }
        }

        // 标签从简介框拆出，放在简介下方的独立容器中
        let tagsBox = q('.yt-tags');
        if (!tagsBox) {
            tagsBox = document.createElement('div');
            tagsBox.className = 'yt-tags';
        }
        if (descBox.nextElementSibling !== tagsBox) {
            descBox.after(tagsBox);
        }
        const tags = q('.video-tag-container');
        if (tags && tags.parentElement !== tagsBox) {
            tagsBox.appendChild(tags);
        }
    }

    // 标签保持真实 <a>，可直接点击跳转搜索页；只负责清理样式和显隐
    function updateTags() {
        const tagsBox = q('.yt-tags');
        const tagPanel = q('.video-tag-container .tag-panel');
        if (!tagPanel) {
            if (tagsBox) tagsBox.style.display = 'none';
            return;
        }
        const items = Array.from(tagPanel.querySelectorAll('.tag'))
            .filter((tag) => tag.querySelector('.tag-link') && getComputedStyle(tag).display !== 'none');
        tagPanel.classList.toggle('yt-empty', items.length === 0);
        if (tagsBox) {
            tagsBox.style.display = items.length ? '' : 'none';
        }
    }

    // 发布日期保持 B 站默认文本，仅沿用简介框内的灰色样式
    function updatePubdate() {
        const dateEl = q('.pubdate-ip-text');
        if (!dateEl) return;
        if (dateEl.dataset.ytRaw) {
            if (dateEl.textContent.trim() !== dateEl.dataset.ytRaw) {
                dateEl.textContent = dateEl.dataset.ytRaw;
            }
            delete dateEl.dataset.ytRaw;
        }
    }

    function headerMounted() {
        const bar = q('#biliMainHeader .bili-header__bar');
        return !!(bar && bar.querySelector('.left-entry-main') && bar.querySelector('.right-entry'));
    }

    function safeEnsureLayout() {
        if (!headerMounted()) return false;
        return ensureLayout();
    }

    function whenHeaderReady(callback) {
        let done = false;
        const finish = () => {
            if (done) return;
            done = true;
            clearInterval(timer);
            window.setTimeout(callback, 60);
        };
        const timer = setInterval(() => {
            if (headerMounted()) finish();
        }, 100);
        window.setTimeout(finish, 6000);
    }

    function ensureLayout() {        const left = q('.left-container');
        const playerWrap = q('#playerWrap');
        const viewbox = q('#viewbox_report');
        if (!left || !playerWrap || !viewbox) return false;

        // 播放器已由 CSS grid 放在第 1 行，不再移动 DOM，避免干扰 B 站顶栏挂载
        // （原实现会在 boot 时 prepend #playerWrap，可能和 bili-header 的挂载产生竞态）

        // 弹幕发送条并入控制栏中央：和全屏时的位置/样式一致
        const controlCenter = q('.bpx-player-control-bottom-center');
        const sendBar = q('.bpx-player-sending-bar');
        if (controlCenter && sendBar && sendBar.parentElement !== controlCenter) {
            controlCenter.appendChild(sendBar);
        }

        // 标题下方：UP 主/创作团队 + 点赞操作
        let metaRow = q('.yt-meta-row');
        if (!metaRow) {
            metaRow = document.createElement('div');
            metaRow.className = 'yt-meta-row';
        }
        if (metaRow.previousElementSibling !== viewbox) {
            viewbox.after(metaRow);
        }

        const upInfo = q('.up-info-container');
        const upPanel = q('.up-panel-container');
        const hasTeam = !!(upPanel && upPanel.querySelector('.membersinfo-upcard'));
        const toolbar = q('#arc_toolbar_report');
        metaRow.classList.toggle('yt-team-mode', hasTeam);
        document.body.classList.toggle('yt-team-mode', hasTeam);

        if (hasTeam) {
            if (upInfo) upInfo.style.display = 'none';
            updateTeamCarousel(metaRow, upPanel);
        } else {
            const oldCarousel = metaRow.querySelector('.yt-team-carousel');
            if (oldCarousel) oldCarousel.remove();
            if (upInfo) {
                upInfo.style.display = '';
                if (upInfo.parentElement !== metaRow) {
                    metaRow.insertBefore(upInfo, toolbar && toolbar.parentElement === metaRow ? toolbar : null);
                }
                bindSingleFollow(metaRow);
                updateSingleFans(metaRow);
            }
        }

        if (toolbar && toolbar.parentElement !== metaRow) {
            metaRow.appendChild(toolbar);
        }
        if (toolbar && metaRow.lastElementChild !== toolbar) {
            metaRow.appendChild(toolbar);
        }

        updateDescBox(metaRow);
        updatePubdate();
        updateTags();
        observePlayerScreen();
        document.documentElement.classList.remove('yt-layout-pending');

        return true;
    }

    /* ================= 播放器高度（纯 16:9，弹幕条叠加在控制栏内） ================= */
    let resizeRaf = 0;
    let screenObserver = null;
    let observedPlayerContainer = null;

    function observePlayerScreen() {
        const container = q('.bpx-player-container');
        if (!container || container === observedPlayerContainer) return;
        if (screenObserver) screenObserver.disconnect();
        observedPlayerContainer = container;
        screenObserver = new MutationObserver(() => {
            layoutPlayer();
            scheduleLayout();
            window.setTimeout(layoutPlayer, 80);
        });
        screenObserver.observe(container, { attributes: true, attributeFilter: ['data-screen'] });
    }

    function layoutPlayer() {
        const wrap = q('#playerWrap');
        const player = q('#bilibili-player');
        const container = q('.bpx-player-container');
        const videoArea = q('.bpx-player-video-area');
        const sendArea = q('.bpx-player-sending-area');
        if (!wrap || !player || !container || !videoArea) return;

        const screen = container.getAttribute('data-screen');
        const isNormal = !document.fullscreenElement && (!screen || screen === 'normal');
        const isWide = !document.fullscreenElement && screen === 'wide';
        document.documentElement.classList.toggle('yt-normal', isNormal);
        document.body.classList.toggle('yt-bar', isNormal || isWide);

        // 尺寸完全交给 CSS（普通模式 aspect-ratio，宽屏固定尺寸），不再反复写高度
        clearImportantHeight(wrap);
        clearImportantHeight(player);
        clearImportantHeight(container);
        clearImportantHeight(videoArea);
        clearImportantHeight(sendArea);
    }

    function scheduleLayout() {
        if (resizeRaf) cancelAnimationFrame(resizeRaf);
        resizeRaf = requestAnimationFrame(() => {
            resizeRaf = 0;
            layoutPlayer();
        });
    }

    function boot() {
        safeEnsureLayout();
        layoutPlayer();
        observePlayerScreen();
        whenHeaderReady(() => {
            ensureLayout();
            layoutPlayer();
        });

        // B 站播放器初始化较慢，补几次（等顶栏挂载后再重排，避免顶栏丢失）
        setTimeout(() => { safeEnsureLayout(); layoutPlayer(); }, 400);
        setTimeout(() => { safeEnsureLayout(); layoutPlayer(); }, 1200);
        setTimeout(() => { safeEnsureLayout(); layoutPlayer(); }, 2400);

        // 页面尺寸变化 / 进入退出全屏
        window.addEventListener('resize', scheduleLayout, { passive: true });
        document.addEventListener('fullscreenchange', () => setTimeout(layoutPlayer, 120));

        // 播放器宽度变化（例如侧栏、窗口）
        const wrap = q('#playerWrap');
        if (wrap && typeof ResizeObserver !== 'undefined') {
            let lastWidth = Math.round(wrap.getBoundingClientRect().width);
            const observer = new ResizeObserver(() => {
                const width = Math.round(wrap.getBoundingClientRect().width);
                if (width !== lastWidth) {
                    lastWidth = width;
                    scheduleLayout();
                }
            });
            observer.observe(wrap);
        }

        // B 站是 SPA，切换视频/重新渲染后自动补回布局
        let lastHref = location.href;
        setInterval(() => {
            if (location.href !== lastHref) {
                lastHref = location.href;
                document.documentElement.classList.add('yt-layout-pending');
                setTimeout(() => { safeEnsureLayout(); layoutPlayer(); }, 300);
            }
            safeEnsureLayout();
            layoutPlayer();
        }, 1200);

        // 兜底：避免异常情况下投稿者一直处于隐藏状态
        setTimeout(() => document.documentElement.classList.remove('yt-layout-pending'), 8000);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot, { once: true });
    } else {
        boot();
    }
})();
