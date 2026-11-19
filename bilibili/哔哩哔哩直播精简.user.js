// ==UserScript==
// @name            哔哩哔哩直播精简
// @description     提供简洁的界面，只为安心看直播。
// @homepage        https://github.com/QingFengM/Scripts/
// @author          清风醉梦
// @namespace       原作者：G-uang
// @version         3.2.4
// @match           *://live.bilibili.com/*
// @icon            https://www.bilibili.com/favicon.ico
// @grant           GM_addStyle
// @grant           unsafeWindow
// @run-at          document-end
// @license         MIT
// ==/UserScript==

(function() {
    'use strict';

    GM_addStyle(`
    /* 顶栏logo */
    .entry_logo,
    .tv-logo {
        display: none !important;
    }
    /* 顶栏精简 */
    .dp-table-cell.v-middle a.聊天室,
    .dp-table-cell.v-middle a.生活,
    .dp-table-cell.v-middle a.购物,
    .dp-table-cell.v-middle a.知识,
    .dp-table-cell.v-middle a.帮我玩,
    .dp-table-cell.v-middle a.互动玩法 {
        display: none !important;
    }
    /* 顶栏购买电池按钮 */
    div.pointer.f-left.p-relative.h-100.shortcut-item:nth-of-type(2) {
        display: none !important;
    }
    /* 顶栏下载客户端按钮 */
    div.pointer.f-left.p-relative.h-100.shortcut-item:nth-of-type(3) {
        display: none !important;
    }
    /* 顶栏我要开播按钮 */
    div.pointer.f-left.p-relative.h-100.shortcut-item:nth-of-type(4) {
        display: none !important;
    }
    /* 调整顶栏头像右边距 */
    .user-panel.dp-table.h-100.p-relative.v-top.f-clear.f-left {
        margin-right: 60px !important;
    }
    /* 调整顶栏右边距 */
    .shortcuts-ctnr .shortcut-item {
        margin-right: 30px !important;
    }
    /* 调整顶栏左边距 */
    .link-navbar .flex-block {
        padding-left: 22px !important;
    }
    /* 隐藏顶栏热搜 */
    .trending {
        display: none !important;
    }
    /* 顶栏搜索悬浮变色 */
    .history-item:hover, .clear:hover,.history-fold-wrap:hover .fold-text {
        color: #FB7299 !important;
        transition: color 0.2s ease;
    }
    /* 顶栏搜索悬浮变色图标 */
    .history-fold-wrap:hover .fold-icon path {
        fill: #FB7299 !important;
        transition: color 0.2s ease;
    }
    /* 顶栏搜索框颜色 */
    #nav-searchform {
        background-color: #ffffff !important;
        border: 1px solid #e4e4e4 !important;
        box-shadow: 0 0 12px #07070721 !important;
    }
    /* 顶栏搜索框宽度 */
    .search-bar-ctnr {
        max-width: 400px !important;
    }
    /* 顶栏搜索框高度 */
    .search-bar-ctnr .search-bar {
        height: 38px !important;
    }
    .link-navbar .search-block {
        top: 16px !important;
    }
    /* 顶栏搜索框搜索图标大小 */
    .search-bar-ctnr .search-bar .search-btn {
        width: 31px !important;
        height: 31px !important;
    }
    .search-bar-ctnr .search-bar .search-btn .search-icon {
        height: 16px !important;
        width: 16px !important;
    }
    /* 顶栏搜索框内部搜索 */
    .search-bar-ctnr .search-bar {
        padding: 0px 30px 0px 0px !important;
    }
    /* 顶栏搜索框圆角 */
    #nav-searchform,
    .search-bar-ctnr.is-focus,
    .search-bar-ctnr .search-bar,
    .search-bar-ctnr .search-bar input,
    .search-pannel,
    .search-bar-ctnr .search-bar .search-btn,
    .search-bar-ctnr .search-bar .search-btn:hover,
    .search-pannel .histories-wrap .histories .history-item {
        border-radius: 20px !important;
    }
    /* 顶栏搜索框面板边距 */
    .search-pannel {
        overflow-y: hidden !important;
        padding: 0 !important;
    }
    .search-pannel .suggestions {
        margin-top: 4px !important;
        margin-bottom: 4px !important;
    }
    /* 顶栏搜索框候选词背景 */
    .search-pannel .suggest-item.active,
    .search-pannel .suggest-item:hover,
    .search-pannel .suggest-item:focus {
        background: #ffffff !important;
    }
    /* 顶栏搜索框候选词取消斜体 */
    em.suggest_high_light {
        font-style: normal !important;
    }
    /* 顶栏搜索框搜索历史调整 */
    .search-pannel .header {
        padding: 4px 16px 0 16px !important;
    }
    .search-pannel .header .title {
        font-size: 14px !important;
    }
    /* 互换头像与关注的位置 */
    #right-part {
        display: flex !important;
    }
    /* 让头像排到后面 */
    .user-panel {
        order: 2;
    }
    /* 让关注排到前面 */
    .shortcuts-ctnr {
        order: 1;
    }
    /* 顶栏关注 */
    .follow-cntr {
        top: 70px !important;
    }
    .follow-cntr .my-follow {
        padding: 12px !important;
        height: auto !important;
        justify-content: flex-end !important;
    }
    .shortcuts-ctnr .shortcut-item {
        min-width: 40px !important;
        white-space: break-spaces !important;
    }
    .link-progress-tv {
        display: none !important;
    }
    /* 顶栏关注列表“更多关注”悬浮变色*/
    .more-follows:hover span {
        color: #FB7299 !important;
        transition: color 0.2s ease;
    }
    .more-follows:hover .blue-right-arrow {
        filter: sepia(0.42) hue-rotate(-202deg) saturate(2.55) brightness(1.28) !important;
        transition: color 0.2s ease;
    }
    /* 关注列表悬浮变色 */
    .follow-cntr .anchor-list .three-anchor .one-anchor .anchor-name p:hover {
        color: #FB7299 !important;
        transition: color 0.2s ease;
    }
    /* 关注列表高度调整 */
    .follow-cntr .anchor-list .three-anchor .one-anchor .anchor-name {
        height: auto !important;
    }
    .follow-cntr .anchor-list {
        height: auto !important;
        margin: auto !important;
    }
    .follow-cntr .anchor-list .three-anchor {
        height: auto !important;
    }
    .follow-cntr {
        width: auto !important;
    }
    /* 移除文字“我的关注” */
    .follow-cntr .my-follow .follow-text {
        display: none !important;
    }
    /* 隐藏顶栏关注列表中的“暂未开播” */
    .follow-cntr .anchor-list .live-status {
        display: none !important;
    }
    /* 移除顶栏字体抖动 */
    .shortcuts-ctnr .shortcut-item .text-label:hover {
        animation: none !important;
        -webkit-animation: none !important;
    }
    .link-navbar .nav-item:hover {
        animation: none !important;
       -webkit-animation: none !important;
    }
    /* 调整顶栏头像 */
    .user-panel-ctnr .user-avatar {
        width: 44px !important;
        height: 44px !important;
        margin: 12px 0 !important;
    }
    .user-panel-ctnr .user-avatar.active {
        transform: none !important;
        border: none !important;
    }
    .user-panel-ctnr.p-relative.dp-i-block.v-middle {
        width: 44px !important;
        margin: 0 !important;
    }
    /* 隐藏顶栏头像下方的消费等级进度条 */
    .user-panel-ctnr .user-panel .header-node .progress {
        display: none !important;
    }
    /* 调整顶栏头像下方菜单距离 */
    .user-panel-ctnr .user-panel .header-node {
        height: 85px !important;
        padding-top: 10px !important;
        display: none !important;
    }
    /* 调整顶栏头像菜单 */
    .user-panel-ctnr .user-panel {
        height: 262px !important;
        width: 180px !important;
        margin-left: -100px !important;
        border: none !important;
        box-shadow: 0 4px 32px 0 rgb(0 0 0 / 20%) !important;
    }
    .user-panel-ctnr .user-panel .lens-ctnr {
        min-height: 262px !important;
    }
    .user-panel-ctnr .user-panel .content-ctnr {
        padding: 10px !important;
    }
    .user-panel-ctnr .user-panel .content-ctnr .control-block {
        width: auto !important;
    }
    .user-panel-ctnr .user-panel .content-ctnr .cut-line[data-v-2051b66d] {
        border: none !important;
        margin-top: 0 !important;
    }
    .user-panel-ctnr .user-panel .content-ctnr .control-block[data-v-2051b66d]:last-child {
        margin-bottom: 0 !important;
    }
    .user-panel-ctnr .user-panel .content-ctnr .logout-block[data-v-2051b66d] {
         margin-top: 0 !important;
    }
    .a-move-in-left {
        animation: none !important;
    }
    .a-move-in-top {
        animation: none !important;
    }
    /* 隐藏电池相关区块 */
    .section-block.battery-block {
        display: none !important;
    }
    /* 隐藏顶栏更多中的下拉箭头符号 */
    .down-arrow-icon-block {
        display: none !important;
    }
    /* 隐藏视频区下方广告栏 */
    .w-100.over-hidden.p-relative.flip-view {
        display: none !important;
    }
    /* 隐藏视频区下方主播推荐 */
    .room-info-ctnr {
        display: none !important;
    }
    /* 隐藏网页底部版权信息 */
    #link-footer-vm {
        display: none !important;
    }
    /* 隐藏视频区下方动态标题栏 */
    .none-select.list-none.dp-i-block.new-tabs {
        display: none !important;
    }
    /* 设置动态转发区背景色 */
    .repost.post-content {
        background-color: #fcfcfc !important;
    }
    /* 隐藏视频区右下方主播荣誉标签 */
    li.t-center.dp-i-block.pointer.tab-candidate:nth-of-type(2) {
        display: none !important;
    }
    /* 调整视频区右下方主播公告内部高度 */
    .room-info-cntr {
        height: 280px !important;
    }
    /* 调整视频区右下方主播公告内容高度 */
    .room-info-cntr .content-wrapper {
        height: 210px !important;
        overflow-y: auto !important;
    }
    /* 隐藏主播简介里的tag标签 */
    .room-introduction-tags {
        display: none !important;
    }
    /* 隐藏主播公告未填写时显示的图片 */
    .room-announce-empty {
        display: none !important;
    }
    /* 调整主播公告区域位置高度 */
    .live-room-app .app-content .app-body .section-block .right-container {
        margin-top: 1px !important;
    }
    /* 设置主播公告区域边框圆角及透明边框 */
    .room-info-cntr {
        border-radius: 12px !important;
        border: 1px solid #E3E5E700 !important;
    }
    /* 调整动态区域位置高度 */
    .trends-content {
        margin-top: 1px !important;
    }
    /* 移除动态卡片边框 */
    .room-feed .room-feed-content .card {
        border: 1px solid #F1F2F300 !important;
    }
    /* 设置动态卡片圆角 */
    .bili-dyn-item {
        border-radius: 12px !important;
    }
    /* 隐藏动态未刷新时的占位图片 */
    .empty-content {
        display: none !important;
    }
    /* 隐藏直播间背景图 */
    .p-fixed.webp.room-bg {
        display: none !important;
    }
    /* 添加播放器阴影 */
    #player-ctnr {
        box-shadow: 0 0 12px #0003 !important;
    }
    /* 添加弹幕区阴影 */
    #aside-area-vm {
        box-shadow: 0 0 12px #0003 !important;
    }
    /* 隐藏右侧侧边栏 */
    .side-bar-cntr {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        height: 0 !important;
        width: 0 !important;
        overflow: hidden !important;
    }
    /* 隐藏侧边栏容器 */
    #sidebar-vm {
        display: none !important;
    }
    /* 小窗播放器比例调整为16:9 */
    .live-player-ctnr.minimal {
        width: 300px !important;
        height: 168.75px !important;
        padding-top: 0px !important;
        right: 60px !important;
    }
    /* 设置播放区域宽度 */
    body:not(.pure_room_root):not(.player-full-win) .live-room-app .app-content .app-body {
        width: clamp(980px, 93vw, 3420px) !important;
    }
    /* 设置播放区域网页模式宽度 */
    body.player-full-win #fullscreen-container {
        right: 320px !important;
    }
    /* 调整播放区与弹幕区间隔距离 */
    .live-room-app .app-content .app-body .player-and-aside-area .left-container {
        width: calc(100% - 320px - 10px) !important;
    }
    /* 调整动态区与公告间隔距离 */
    .live-room-app .app-content .app-body .section-block .left-container {
        width: calc(100% - 320px - 10px) !important;
    }
    /* 调整播放区与动态区间隔距离 */
    .live-room-app .app-content .app-body .player-and-aside-area {
        margin-bottom: 8px !important;
    }
    /* 网页顶部与播放区域的间距 */
    .live-room-app .app-content {
        padding-top: 70px !important;
    }
    /* 动态标签颜色 */
    .bili-dyn-tag {
        color: #FB7299 !important;
    }
    /* 隐藏底栏 */
    .link-footer {
        display: none !important;
    }
    /* 右侧弹幕栏与公告栏宽度 */
    body:not(.pure_room_root) .live-room-app .app-content .app-body .section-block .right-container,
    body:not(.pure_room_root) .live-room-app .app-content .app-body .player-and-aside-area .aside-area {
        width: 320px !important;
    }
    /* 网页全屏状态右侧弹幕栏与公告栏宽度 */
    html:not(.pc-app) body.player-full-win:not(.hide-aside-area) .aside-area {
        left: max(calc(100vw - 320px),668px) !important;
    }
    /* 顶栏背景颜色 */
    .link-navbar,
    .link-navbar-ctnr {
        background-color: transparent !important;
    }
    /* 顶栏与视频区分割线 */
    .link-navbar.link-navbar.link-navbar {
        box-shadow: none !important;
    }
    /* 移除顶栏分割线阴影 */
    .link-navbar-ctnr {
        box-shadow: inset 0 -1px #fff0 !important;
    }
    /* 顶栏高度 */
    .link-navbar-ctnr {
        min-height: 70px !important;
    }
    .link-navbar-wrap,
    .link-navbar,
    .user-panel-ctnr.p-relative.dp-i-block.v-middle {
        height: 70px !important;
    }

    /* 直播间标题栏 */
    /* 直播间标题栏圆角 */
    .live-room-app .app-content .app-body .player-and-aside-area .left-container .head-info-section {
        border-radius: 12px 12px 0 0 !important;
        border: 0px solid #e3e5e7 !important;
    }
    /* 移除标题栏助力与上舰按钮 */
    /* .p-relative.follow-ctnr  */
    .follow-ctnr .followed .left-part,
    .follow-ctnr .followed .right-part {
        display: none !important;
    }
    /* 移除标题栏推广 */
    .header-center {
        display: none !important;
    }
    /* 更多设置 */
    .header-right {
        margin-left: auto !important;
        display: flex !important;
        justify-content: flex-end !important;
        align-items: center !important;
    }
    .more-text {
        display: none !important;
    }
    .panel-head-title {
        display: none !important;
    }
    .more-setting-panel.non-anchor {
        width: 200px !important;
    }
    .more-entry {
        width: 30px !important;
        height: 30px !important;
    }
    /* 移除快捷键G关注主播 */
    #popup-shortcut-box,
    .follow-ctnr .not-yet-follow .follow-key-prompt {
        display: none !important;
    }
    /* 标题栏关注 */
    .follow-ctnr .not-yet-follow {
        width: 58px !important;
        background-color: #FB7299 !important;
        box-shadow: 0 0 12px #0707075e !important;
    }
    .follow-ctnr.p-relative {
        margin-left: 16px !important;
    }
    /* 直播间主播名称字符高度 */
    .header-info-ctnr .rows-ctnr .upper-row .room-owner-username {
        line-height: 20px !important;
    }
    /* 隐藏标题栏与视频区分割线 */
    .header-info-ctnr .blur-edges-ctnr {
        display: none !important;
    }
    /* 标题栏字体大小 */
    .header-info-ctnr .rows-ctnr .upper-row .room-owner-username,.header-info-ctnr .nowrap {
        font-size: 14px !important;
    }
    .initiator .initiator-name {
        font-size: 14px !important;
    }
    /* 标题栏字体大小（备选） */
    .header-info-ctnr .closedown-left .initiator-ctnr .initiator-name {
        font-size: 14px !important;
        margin-left: 16px !important;
    }
    /* 移除未开播直播间标题 */
    .live-title {
        display: none !important;
    }
    /* 直播间主播名称鼠标悬停字体颜色 */
    html body .live-skin-coloration-area .live-skin-normal-a-text:hover,
    html body .live-skin-coloration-area .live-skin-normal-a-text:active {
        color: #FB7299 !important;
        transition: color 0.2s ease;
    }
    /* 设置标题栏主播ID与标题为水平弹性布局 */
    .rows-content {
        display: flex !important;
        flex-direction: row !important;
        align-items: center !important;
    }
    /* 设置标题栏主播ID与标题水平排列并互换位置 */
    .closedown-left {
        display: flex !important;
        flex-direction: row-reverse !important;
        align-items: center !important;
    }
    /* 恢复标题分区：未开播标题栏水平排列 */
    .header-info-ctnr .closedown-profile {
        display: flex !important;
        flex-direction: row !important;
        align-items: center !important;
    }
    /* 恢复标题分区：标题与分区容器 */
    #custom-title-area {
        display: inline-flex !important;
        align-items: center !important;
        gap: 16px !important;
        margin-left: 16px !important;
        min-width: 0;
        white-space: nowrap;
        vertical-align: middle;
    }
    /* 恢复标题分区：标题与分区文字 */
    #custom-title-display,
    #custom-partition-display {
        display: inline-block !important;
        max-width: 40vw !important;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
        font-size: 14px !important;
        vertical-align: middle !important;
    }
    #custom-partition-display {
        text-decoration: none !important;
    }
    #custom-partition-display:hover {
        color: #FB7299 !important;
    }
    /* 删除“发起者:”文本标签 */
    .initiator-label.live-skin-normal-a-text {
        display: none !important;
    }
    /* 删除“未开播”状态标签 */
    .status-tag {
        display: none !important;
    }
    /* 删除标题栏气泡图标 */
    .live-title .icon-a-bubble_comment_linepinglun {
        display: none !important;
    }
    /* 调整直播间标题内容左下侧行元素上边距 */
    .left-lower-row {
        margin-top: 0px !important;
    }
    /* 调整直播间用户名左边距 */
    .profile-text {
        margin-left: 16px !important;
    }
    /* 直播间标题栏XX人点赞 */
    .header-info-ctnr .heat-index-scroll {
        display: none !important;
    }
    /* 隐藏头像右下认证图标和头像挂件 */
    .blive-avatar-icons, .blive-avatar-pendant {
        display: none !important;
    }
    /* 头像容器固定尺寸 */
    .blive-avatar {
        width: 36px !important;
        height: 36px !important;
    }
    /* 头像图片固定尺寸 */
    .blive-avatar-face {
        width: 36px !important;
        height: 36px !important;
        background-size: cover !important;
    }
    /* 头像信息内的头像固定尺寸 */
    .header-info-ctnr .avatar {
        width: 36px !important;
        height: 36px !important;
    }
    /* 头像信息容器内边距 */
    #head-info-vm {
        padding: 10px !important;
        padding-top: 10px !important;
    }
    /* 动态调整主播ID容器宽度 */
    .upper-row {
        width: fit-content !important;
        max-width: 100% !important;
    }

    /* 直播间视频区 */
    /* 隐藏PK相关元素 */
    .web-player-inject-wrap {
        display: none !important;
    }
    /* 隐藏PK提示 */
    .link-toast.info.center-animation {
        display: none !important;
    }
    /* 隐藏互动玩法 */
    #game-id {
        display: none !important;
    }
    /* 隐藏视频区反馈按钮 */
    .web-player-icon-feedback {
        display: none !important;
    }
    /* 隐藏视频区高帧率图标 */
    .selectedQnBadge.svelte-770q4t {
        display: none !important;
    }
    /* 隐藏恭喜主播获得超人气推荐奖励提示 */
    .content.border-box {
        display: none !important;
    }
    /* 隐藏节奏风暴特效 */
    #player-effect-vm > div > div.rhythm-storm {
        display: none !important;
    }
    /* 隐藏视频区直播水印 */
    .web-player-icon-roomStatus {
        display: none !important;
    }
    /* 隐藏礼物及广播条 */
    .announcement-wrapper.clearfix.no-select {
        display: none !important;
    }
    /* 隐藏网页端购物小橙车提示 */
    .shop-popover {
        display: none !important;
    }
    /* 隐藏未登录时显示登陆提示 */
    #switch-login-guide-vm {
        display: none !important;
    }
    /* 隐藏弹幕连击特效 */
    .bilibili-combo-danmaku-container {
        display: none !important;
    }
    /* 隐藏全屏弹幕发送框 */
    #fullscreen-danmaku-vm {
        display: none !important;
    }
    /* 隐藏付费观看直播提示 */
    #live-charge-vm {
        display: none !important;
    }
    /* 播放器底部圆角 */
    #player-ctnr {
        border-radius: 12px !important;
        overflow: hidden !important;
    }
    /* 播放器底部进度条颜色 */
    .PyF4K7mjqm4rpICeBFJA .wzMWH0YAfabG6H8wvpQO .XhJAZxh51Lj7dEy0AcpQ .TzW8pOv1omXIeb5MHnoh {
        background: #FB7299 !important;
    }
    /* 播放器背景透明 */
    body:not(.pure_room_root) .live-room-app .app-content .app-body .player-and-aside-area .left-container #fullscreen-container {
        background: #0000 !important;
        -webkit-mask-image: -webkit-radial-gradient(white, black) !important;
    }
    /* 开通大会员继续观看 */
    .universal-countdown-card {
        display: none !important;
    }

    /* 直播间礼物栏 */
    /* 移除礼物栏 */
    #gift-control-vm {
        display: none !important;
    }
    /* 调整礼物栏布局底部高度 */
    #fullscreen-container {
        grid-template-rows: auto 0px !important;
    }
    .fullscreen-container-paddingbox {
        height: auto !important;
    }
    /* 移除网页模式礼物栏 */
    body:not(.pure_room_root) .live-room-app .app-content .app-body .player-and-aside-area .left-container #fullscreen-container {
        grid-template-rows: auto 0px !important;
    }
    /* 移除全屏礼物栏 */
    #web-player__bottom-bar__container {
        display: none !important;
    }
    /* 移除播放器礼物按钮 */
    .live-web-player-controller .control-area .right-area > :last-child {
        display: none !important;
    }
    /* 隐藏天选时刻弹窗 */
    .m-nobar__popup-container {
        display: none !important;
    }

    /* 直播间弹幕区 */
    /* 弹幕区圆角 */
    html:not(.pc-app) body:not(.pure_room_root):not(.player-full-win):not(.fullscreen-fix):not(.lite-room) .live-room-app .aside-area>.chat-history-panel {
        border-radius: 12px 12px 0 0 !important;
    }
    body:not(.pure_room_root) .live-room-app .app-content .app-body .player-and-aside-area .aside-area .chat-control-panel {
        border-radius: 0 0 12px 12px !important;
    }
    /* 弹幕区边距 */
    body:not(.pure_room_root) .chat-history-panel .chat-history-list {
        padding: 5px 10px 5px 10px !important;
    }
    /* 隐藏弹幕区礼物榜背景 */
    #rank-list-vm {
        display: none !important;
    }
    /* 隐藏弹幕区顶部礼物榜 */
    #rank-list-ctnr-box {
        display: none !important;
    }
    /* 调整弹幕区高度 */
    .chat-history-panel {
        height: calc(100% - 0px - 110px) !important;
    }
    /* 隐藏弹幕区投喂礼物信息 */
    .chat-gift-bubble-vm {
        display: none !important;
    }
    /* 隐藏弹幕区投喂礼物条目 */
    .gift-item {
        display: none !important;
    }
    /* 隐藏弹幕区投喂礼物 */
    #relocated-slot-gift-popup-guide {
        display: none !important;
    }
    /* 隐藏弹幕区底部投喂礼物信息 */
    .penury-gift-msg {
        display: none !important;
    }
    /* 隐藏弹幕区底部其他人进入直播间信息 */
    .brush-prompt {
        display: none !important;
    }
    /* 隐藏弹幕区底部自己进入直播间信息 */
    .important-prompt-item {
        display: none !important;
    }
    /* 调整未读弹幕提醒位置 */
    .danmaku-buffer-prompt {
        bottom: 110px !important;
    }
    /* 固定弹幕区域滚动高度 */
    .with-penury-gift,.with-brush-prompt {
        height: -webkit-fill-available !important;
    }
    /* 隐藏弹幕区续费提示 */
    .guard-buy {
        display: none !important;
    }
    /* 隐藏恭喜XX成为高能榜提示 */
    .top3-notice {
        display: none !important;
    }
    /* 隐藏恭喜xxx成为高能用户 */
    .top3-notice.chat-item {
        display: none !important;
    }
    /* 隐藏恭喜主播成为航海第x名 */
    .chat-item.common-danmuku-msg.border-box {
        display: none !important;
    }
    /* 隐藏绝杀时刻系统提示弹幕 */
    .common-danmuku-msg {
        display: none !important;
    }
    /* 隐藏榜单系统提示弹幕 */
    .hot-rank-msg {
        display: none !important;
    }
    /* 隐藏系统提示弹幕 */
    .convention-msg {
        display: none !important;
    }
    .room-entry-intro {
        display: none !important;
    }
    /* 设置弹幕@用户ID字体大小 */
    .common-nickname-wrapper {
        font-size: 14px !important;
    }
    /* 设置弹幕字体大小 */
    .chat-history-list {
        font-size: 14px !important;
    }
    /* 设置弹幕ID字体大小 */
    .user-name {
        font-size: 14px !important;
        margin-right: 2px !important;
    }
    /* 设置弹幕ID字体颜色 */
    .user-name {
        color: #707070 !important;
    }
    body .common-nickname-wrapper > :nth-child(2) {
        color: #707070 !important;
    }
    /* 弹幕ID鼠标悬停字体颜色 */
    .chat-history-panel .chat-history-list .chat-item.danmaku-item .user-name:hover {
        color: #FB7299 !important;
        transition: color 0.2s ease;
    }
    /* 弹幕内容鼠标悬停字体颜色 */
    .chat-history-panel .chat-history-list .chat-item.danmaku-item .danmaku-item-right:hover {
        color: #FB7299 !important;
        transition: color 0.2s ease;
    }
    /* 弹幕换行行距 */
    .danmaku-item {
        line-height: 25px !important;
    }
    /* 弹幕之间行距 */
    body:not(.pure_room_root) .chat-history-panel .chat-history-list .chat-item {
        padding: 4px !important;
    }
    /* 隐藏弹幕ID前活动头衔徽章 */
    .title-label {
        display: none !important;
    }
    .common-nickname-wrapper .common-nickname-medal {
        display: none !important;
    }
    /* 隐藏弹幕ID前榜X图标 */
    .rank-icon {
        display: none !important;
    }
    /* 隐藏弹幕ID前粉丝徽章消费等级 */
    .fans-medal-item-ctnr,.fans-medal-item-target {
        display: none !important;
    }
    /* 隐藏PK弹幕广告 */
    .new-video-pk-item-dm {
        display: none !important;
    }
    /* 隐藏“找他玩”消费引导横条 */
    .play-together-service-card-container {
        display: none !important;
    }
    /* 调整弹幕区连击互动高度 */
    .chat-history-panel.new {
        padding-bottom: 0px !important;
    }
    /* 调整弹幕区连击互动区域高度 */
    .chat-history-panel .chat-history-list.with-brush-prompt {
        height: calc(100% - 0px) !important;
    }
    /* 隐藏弹幕连击卡片 */
    #combo-card {
        display: none !important;
    }
    /* 隐藏弹幕连击组件 */
    #combo-danmaku-vm {
        display: none !important;
    }
    .over-hidden.p-relative.w-100.relocated-cards-area {
        display: none !important;
    }
    /* 隐藏主播今日心愿 */
    .gift-wish-card-root {
        display: none !important;
    }
    /* 醒目留言展开后背景透明度 */
    .pay-note-panel .detail-info .mask {
        background: #fff0 !important;
        border-radius: 4px !important;
    }
    /* 醒目留言背景颜色 */
    .pay-note-panel {
        background-color: #0000 !important
    }
    /* 醒目留言展开后图片圆角 */
    .card-detail .card-item-middle-bottom {
        border-radius: 0px 0px 6px 6px !important;
    }
    /* 醒目留言图片角标圆角 */
    .card-detail .card-item-middle-bottom .bottom-background {
        border-radius: 6px !important;
    }
    /* 醒目留言图片角标圆角 */
    .chat-history-panel .chat-history-list .chat-item.superChat-card-detail .card-item-middle-bottom .bottom-background {
        border-radius: 6px !important;
    }
    /* 醒目留言头像 */
    .card-item-middle-top-left {
        display: none !important;
    }
    /* 醒目留言价格 */
    card-item-middle-top-right .content-bottom {
        display: none !important;
    }
    /* 醒目留言用户名 */
    body:not(.pure_room_root) .chat-history-panel .chat-history-list .chat-item.superChat-card-detail .card-item-middle-top .card-item-middle-top-right .card-item-name {
        height: 34px !important;
        line-height: 34px !important;
    }
    /* 弹幕区主播表情图片大小 */
    .chat-history-panel .chat-history-list .chat-item.danmaku-item .emoticon.bulge img {
        height: 45px !important;
    }
    /* 弹幕区滚动条触碰时透明效果 */
    .ps:hover > .ps__scrollbar-y-rail:hover {
        background-color: #eeeeee00 !important;
        opacity: 0.5 !important;
    }
    /* 弹幕区滚动条按下时透明效果 */
    .ps:hover.ps--in-scrolling.ps--y > .ps__scrollbar-y-raiy {
        background-color: #eeeeee00 !important;
        opacity: 0.5 !important;
    }
    /* 弹幕区滚动条滑动时透明效果 */
    .ps.ps--in-scrolling.ps--y > .ps__scrollbar-y-rail {
        background-color: #eeeeee00 !important;
        opacity: 0.5 !important;
    }
    /* 弹幕区“XXX为主播点赞” */
    .common-nickname-wrapper {
        display: contents !important;
    }
    /* 隐藏弹幕区礼物动画 */
    #gift-screen-animation-vm {
        display: none !important;
    }
    /* 隐藏弹幕区礼物动画（粉丝徽章弹窗） */
    #fans-medal-popover-vm {
        display: none !important;
    }
    /* 隐藏弹幕区礼物动画（礼物气泡） */
    #chat-gift-bubble-vm {
        display: none !important;
    }
    /* 隐藏弹幕区礼物动画（引导卡片） */
    #all-guide-cards {
        display: none !important;
    }
    /* 隐藏弹幕区礼物动画（礼物toast） */
    .lottery-gift-toast {
        display: none !important;
    }
    /* 隐藏SC礼物动画 */
    #chat-msg-bubble-vm {
        display: none !important;
    }
    /* 隐藏弹幕区入场动画（底部） */
    #welcome-area-bottom-vm {
        display: none !important;
    }
    /* 隐藏弹幕区入场动画（活动区） */
    #activity-welcome-area-vm {
        display: none !important;
    }
    /* 特权弹幕行距调整 */
    .chat-colorful-bubble {
        margin: 0px 0 !important;
    }
    /* 特权弹幕背景透明 */
    .chat-colorful-bubble {
        background: #00000000 !important;
    }
    /* 特权弹幕边框背景移除 */
    .chat-history-panel .chat-history-list .chat-item.danmaku-item.has-bubble {
        border-image-source: none !important;
    }
    /* 特权弹幕背景图片移除 */
    .chat-colorful-bubble {
        border-image-source: none !important;
    }
    /* 隐藏特权弹幕特效元素 */
    .chat-item.danmaku-item > div[style*="border-radius: 5px; overflow: hidden; width: 100%; height: 62px; position: absolute;"] {
        display: none !important;
    }
    /* 特权弹幕样式重置 */
    .chat-item.danmaku-item {
        border-image-source: none !important;
        border-image-slice: initial !important;
        border-image-width: initial !important;
        position: static !important;
    }
    /* 隐藏特权弹幕图标 */
    .pilot-icon {
        display: none !important;
    }
    /* 隐藏特权弹幕管理员图标后的换行 */
    .admin-icon ~ br {
        display: none !important;
    }
    /* 隐藏特权弹幕卡片右上角 */
    .card-item-top-right {
        display: none !important;
    }
    /* 隐藏粉丝徽章后的换行 */
    .fans-medal-item-ctnr ~ br {
        display: none !important;
    }
    /* 隐藏弹幕投票横幅 */
    .vote-card {
        display: none !important;
    }
    /* 移除弹幕点赞动画 */
    div[id*="like-animation"] {
        display: none !important;
    }
    /* 新弹幕消息提醒高度 */
    body:not(.pure_room_root) .chat-history-panel .danmaku-at-prompt {
        top: 90% !important;
    }

    /* 直播间弹幕输入区 */
    /* 直播间弹幕输入区内部圆角 */
    .chat-input-ctnr {
        border-radius: 12px !important;
    }
    /* 隐藏醒目留言按钮 */
    .super-chat {
        display: none !important;
    }
    /* 隐藏点赞按钮 */
    .like-btn {
        display: none !important;
    }
    /* 隐藏弹幕颜色按钮 */
    .danmaku-preference-btn {
        display: none !important;
    }
    .input-divider {
        display: none !important;
    }
    /* 弹幕输入框聚焦时边框颜色 */
    .chat-input-ctnr.chat-input-focus {
        border: 1px solid #E3E5E7 !important;
    }
    /* 弹幕输入区字体大小 */
    .chat-input {
        font-size: 14px !important;
    }
    `);

// ====== 搜索框热词清理 ======
    const clean = () => {
        const el = document.querySelector('input[name="keyword"]');
        if (el) {
            el.removeAttribute('title');
            el.removeAttribute('placeholder');
        }
    };

    (function init() {
        if (!document.body) return setTimeout(init, 50);
        clean();
        new MutationObserver(() => clean()).observe(document.body, { childList: true, subtree: true });
    })();


// ====== 恢复标题分区 ======
    (function () {
        'use strict';

        const CONTAINER_ID = 'custom-title-area';
        const TITLE_ID = 'custom-title-display';
        const PARTITION_ID = 'custom-partition-display';
        const AREA_PAGE = 'https://live.bilibili.com/p/eden/area-tags';

        const norm = (s) => (s || '').replace(/\s+/g, ' ').trim();

        // 主播ID元素：开播时 .anchor-username，未开播时 .initiator .initiator-name
        function getNameEl() {
            return document.querySelector('.live-profile .anchor-username')
                || document.querySelector('.closedown-profile .initiator .initiator-name')
                || document.querySelector('.anchor-username')
                || document.querySelector('.initiator .initiator-name');
        }

        // 找到标题栏中与主播ID同行的容器
        function resolveHost(nameEl) {
            const liveProfile = nameEl.closest('.live-profile');
            if (liveProfile) {
                return { host: liveProfile, anchor: nameEl.closest('.profile-text') || nameEl };
            }
            const initiator = nameEl.closest('.initiator');
            if (initiator) {
                return { host: initiator.closest('.closedown-profile') || initiator.parentElement, anchor: initiator };
            }
            return null;
        }

        function getRoomId() {
            const m = location.pathname.match(/(?:blanc\/)?(\d{3,})/);
            return m ? m[1] : '';
        }

        // 标题：优先弹幕区的房间卡片，其次未开播标题，最后网页标题
        function readTitle() {
            const card = document.querySelector('.room-entry-card-title');
            if (card && norm(card.textContent)) return norm(card.textContent);
            const nativeTitle = document.querySelector('.live-title .title-text');
            if (nativeTitle && norm(nativeTitle.textContent)) return norm(nativeTitle.textContent);
            return norm(document.title.split(' - ')[0]);
        }

        // 分区：弹幕区的房间卡片（形如“单机游戏 · 新游推荐”）
        function readArea() {
            const card = document.querySelector('.room-entry-card-area');
            return card ? norm(card.textContent) : '';
        }

        // 分区链接：用接口拿到 parentAreaId / areaId，缓存避免重复请求
        const areaHrefCache = new Map();
        const areaHrefPending = new Map();

        function applyAreaHref(link, roomId) {
            if (!roomId) return;
            const cached = areaHrefCache.get(roomId);
            if (cached) {
                link.href = cached;
                return;
            }
            let pending = areaHrefPending.get(roomId);
            if (!pending) {
                pending = fetch('https://api.live.bilibili.com/room/v1/Room/get_info?room_id=' + encodeURIComponent(roomId), { credentials: 'include' })
                    .then((res) => res.json())
                    .then((json) => {
                        const data = json && json.code === 0 && json.data;
                        if (!data || !data.area_id) return '';
                        const href = AREA_PAGE + '?parentAreaId=' + data.parent_area_id + '&areaId=' + data.area_id;
                        areaHrefCache.set(roomId, href);
                        return href;
                    })
                    .catch(() => '')
                    .finally(() => areaHrefPending.delete(roomId));
                areaHrefPending.set(roomId, pending);
            }
            pending.then((href) => {
                if (href && link.getAttribute('data-room') === roomId) link.href = href;
            });
        }

        let box = null;
        // 主播ID悬停时会变粉色，这里只缓存未悬停时的基准色，避免把悬停色带到标题/分区
        let cachedTextColor = '';

        function ensure() {
            const nameEl = getNameEl();
            if (!nameEl) return;
            const target = resolveHost(nameEl);
            if (!target) return;

            if (!box) {
                box = document.createElement('span');
                box.id = CONTAINER_ID;

                const titleEl = document.createElement('span');
                titleEl.id = TITLE_ID;
                box.appendChild(titleEl);

                const partEl = document.createElement('a');
                partEl.id = PARTITION_ID;
                partEl.target = '_blank';
                partEl.rel = 'noopener noreferrer';
                box.appendChild(partEl);
            }

            // Vue 重建标题栏后重新挂载
            if (box.parentElement !== target.host || box.previousElementSibling !== target.anchor) {
                target.anchor.insertAdjacentElement('afterend', box);
            }

            // 跟随主播ID的字体样式（悬停变色时不要把粉色当成基准色）
            const nameStyle = getComputedStyle(nameEl);
            if (!nameEl.matches(':hover')) {
                cachedTextColor = nameStyle.color;
            } else if (!cachedTextColor) {
                // 页面加载时就悬停在主播ID上：用隐藏副本取一次未悬停的基准色
                const probe = nameEl.cloneNode(true);
                probe.removeAttribute('id');
                probe.style.cssText = 'position:absolute;left:-9999px;top:0;visibility:hidden;pointer-events:none;';
                nameEl.parentElement.appendChild(probe);
                cachedTextColor = getComputedStyle(probe).color;
                probe.remove();
            }
            const textColor = cachedTextColor || nameStyle.color;

            box.style.color = textColor;
            box.style.fontSize = nameStyle.fontSize;
            box.style.fontWeight = nameStyle.fontWeight;

            const titleEl = box.querySelector('#' + TITLE_ID);
            const partEl = box.querySelector('#' + PARTITION_ID);
            titleEl.style.color = textColor;
            partEl.style.color = textColor;

            const title = readTitle();
            if (title && titleEl.textContent !== title) titleEl.textContent = title;

            const area = readArea();
            if (area) {
                if (partEl.textContent !== area) partEl.textContent = area;
                if (partEl.style.display !== '') partEl.style.display = '';
                const roomId = getRoomId();
                if (partEl.getAttribute('data-room') !== roomId) {
                    partEl.setAttribute('data-room', roomId);
                    partEl.removeAttribute('href');
                    applyAreaHref(partEl, roomId);
                }
            } else if (partEl.style.display !== 'none') {
                partEl.style.display = 'none';
            }
        }

        let timer = null;

        function tick() {
            if (document.hidden) return;
            ensure();
        }

        function start() {
            ensure();
            if (!timer) timer = setInterval(tick, 1000);
            document.addEventListener('visibilitychange', tick);
        }

        if (document.readyState === 'complete') {
            start();
        } else {
            window.addEventListener('load', start);
        }
    })();

// ====== 禁止轮播 ======
    if (/https:\/\/live\.bilibili\.com\/(blanc\/)?\d+/.test(location.href)) {
        if (unsafeWindow.fetch) {
            unsafeWindow['__origFetch__'] = unsafeWindow.fetch;

            unsafeWindow.fetch = async function () {
                if (((arguments[0] instanceof Request) ? arguments[0].url : String(arguments[0])).includes('api.live.bilibili.com/live/getRoundPlayVideo')) {
                    return new Response(JSON.stringify({ code: 0, data: { cid: -3 } }), {
                        status: 200,
                        headers: { 'Content-Type': 'application/json' }
                    });
                }
                return unsafeWindow['__origFetch__'].apply(this, arguments);
            };
        }
    }

// ====== 默认最高画质 ======
    const qualityTimer = setInterval(() => {
        const player = unsafeWindow.livePlayer || unsafeWindow.top?.livePlayer;
        if (player?.getPlayerInfo()?.qualityCandidates?.length > 1) {
            player.switchQuality(player.getPlayerInfo().qualityCandidates[0].qn);
            clearInterval(qualityTimer);
        }
    }, 300);

})();

// ====== 活动页面恢复为原本的直播间 ======
    if (/(https:\/\/live\.bilibili\.com)\/(\d+)/.test(document.location.href)) {
        document.location.href = document.location.href.replace(/(https:\/\/live\.bilibili\.com)\/(\d+)/, '$1/blanc/$2');
    }
