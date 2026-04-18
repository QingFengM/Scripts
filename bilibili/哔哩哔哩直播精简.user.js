// ==UserScript==
// @name            哔哩哔哩直播精简
// @description     提供简洁的界面，只为安心看直播。
// @homepage        https://github.com/QingFengM/Scripts/
// @author          清风醉梦
// @namespace       原作者：G-uang
// @version         3.1.4
// @match           *://live.bilibili.com/*
// @icon            https://www.bilibili.com/favicon.ico
// @grant           GM_addStyle
// @run-at          document-start
// @license         MIT
// ==/UserScript==

(function() {
    'use strict';

    GM_addStyle(`
    /* 顶栏logo */
    .entry_logo {
        display: none !important;
    }
    /* 顶栏logo */
    .tv-logo {
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
    /* 调整顶栏右边距 */
    .shortcuts-ctnr .shortcut-item {
        margin-right: 120px !important;
    }
    /* 调整顶栏左边距 */
    .link-navbar .flex-block {
        padding-left: 30px !important;
    }
    /* 调整顶栏搜索框宽度 */
    .search-bar-ctnr {
        max-width: 400px !important;
    }
    /* 隐藏顶栏热搜 */
    .trending {
        display: none !important;
    }
    /* 顶栏搜索悬浮变色 */
    .history-item:hover, .clear:hover,.history-fold-wrap:hover .fold-text {
        color: #FB7299 !important;
    }
    /* 顶栏搜索悬浮变色图标 */
    .history-fold-wrap:hover .fold-icon path {
        fill: #FB7299 !important;
    }
    /* 顶栏更多关注悬浮变色文字 */
    .more-follows:hover span {
        color: #FB7299 !important;
    }
    /* 顶栏更多关注悬浮变色箭头 */
    .more-follows:hover .blue-right-arrow {
        filter: sepia(0.42) hue-rotate(-202deg) saturate(2.55) brightness(1.28) !important;
    }
    /* 设置顶栏关注按钮最小宽度 */
    div.pointer.f-left.p-relative.h-100.shortcut-item:nth-of-type(1) {
        min-width: 60px;
    }
    /* 设置顶栏头像区域宽度 */
    .v-middle.dp-i-block.p-relative.user-panel-ctnr {
        width: 60px;
    }
    /* 隐藏顶栏头像下方的消费等级进度条 */
    .user-panel-ctnr .user-panel .header-node .progress {
        display: none !important;
    }
    /* 调整顶栏头像下方菜单距离 */
    .user-panel-ctnr .user-panel .header-node {
        height: 85px !important;
    }
    /* 调整顶栏头像菜单内容器高度 */
    .user-panel-ctnr .user-panel {
        height: 375px !important;
    }
    /* 隐藏电池相关区块 */
    .section-block.battery-block {
        display: none !important;
    }
    /* 隐藏顶栏关注列表中的“暂未开播”状态 */
    .follow-cntr .anchor-list .live-status {
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
    /* 移除顶栏分割线阴影 */
    .link-navbar-ctnr {
        box-shadow: inset 0 -1px #fff0 !important;
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
    }
    /* 隐藏主播简介里的tag标签 */
    .room-introduction-tags {
        display: none !important;
    }
    /* 隐藏主播公告未填写时显示的图片 */
    .room-announce-empty {
        display: none !important;
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
    /* 调整主播公告区域位置高度 */
    .live-room-app .app-content .app-body .section-block .right-container {
        margin-top: 1px !important;
    }
    /* 隐藏动态未刷新时的占位图片 */
    .empty-content {
        display: none !important;
    }
    /* 设置主播公告区域边框圆角及透明边框 */
    .room-info-cntr {
        border-radius: 12px !important;
        border: 1px solid #E3E5E700 !important;
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
    .live-room-app .app-content .app-body {
        width: 91.5% !important;
        max-width: 2000px !important;
    }
    /* 调整播放区顶部距离 */
    .live-room-app .app-content {
        padding-top: 70px !important;
    }
    /* 调整播放区与弹幕区间隔距离 */
    .live-room-app .app-content .app-body .player-and-aside-area .left-container {
        width: calc(100% - 300px - 10px) !important;
    }
    /* 调整动态区与公告间隔距离 */
    .live-room-app .app-content .app-body .section-block .left-container {
        width: calc(100% - 300px - 10px) !important;
    }
    /* 调整播放区与动态区间隔距离 */
    .live-room-app .app-content .app-body .player-and-aside-area {
        margin-bottom: 8px !important;
    }
    /* 关注列表悬浮变色 */
    .follow-cntr .anchor-list .three-anchor .one-anchor .anchor-name p:hover {
        color: #FB7299 !important;
    }
    /* 关注列表高度调整 */
    .follow-cntr .anchor-list .three-anchor .one-anchor .anchor-name {
        height: 0px !important;
    }
    /* 我的关注文字颜色 */
    .follow-cntr .my-follow .follow-text {
        color: #FB7299 !important;
    }
    /* 动态标签颜色 */
    .bili-dyn-tag {
        color: #FB7299 !important;
    }
    /* 隐藏底栏 */
    .link-footer {
        display: none !important;
    }

    /* 直播间标题栏 */
    /* 直播间标题栏圆角 */
    .live-room-app .app-content .app-body .player-and-aside-area .left-container .head-info-section {
        height: 56px !important;
        border-radius: 12px 12px 0 0 !important;
        border: 0px solid #e3e5e7 !important;
    }
    /* 标题栏背景图片位置 */
    .live-room-app .app-content .app-body .player-and-aside-area .left-container .head-info-section {
        background-position: center !important;
        background-size: cover !important;
    }
    /* 隐藏标题栏助力与上舰按钮 */
    .p-relative.follow-ctnr {
        display: none !important;
    }
    /* 隐藏标题栏第二行广告 */
    .lower-row > .right-ctnr {
        display: none !important;
    }
    /* 隐藏标题栏节目单 */
    .play-bill .p-relative {
        display: none !important;
    }
    /* 解除直播间标题字符长度限制 */
    .live-title .title-length-limit {
        max-width: 512px !important;
    }
    /* 解除直播间分区字符长度限制 */
    .header-info-ctnr .rows-ctnr .lower-row .live-area .area-link {
        max-width: 256px !important;
    }
    /* 直播间分区鼠标悬停字体颜色 */
    .header-info-ctnr .rows-ctnr .lower-row .live-area .area-link:hover {
        color: #FB7299 !important;
    }
    /* 直播间主播名称鼠标悬停字体颜色 */
    .header-info-ctnr .rows-ctnr .upper-row .room-owner-username:hover {
        color: #FB7299 !important;
    }
    /* 直播间主播名称字符高度 */
    .header-info-ctnr .rows-ctnr .upper-row .room-owner-username {
        line-height: 20px !important;
    }
    /* 隐藏标题栏分享/举报按钮 */
    .upper-row > .right-ctnr {
        display: none !important;
    }
    /* 隐藏主播所在城市（默认） */
    .anchor-location.default {
        display: none !important;
    }
    /* 隐藏主播所在城市（带皮肤） */
    .anchor-location.with-skin {
        display: none !important;
    }
    /* 隐藏标题栏与视频区分割线 */
    .header-info-ctnr .blur-edges-ctnr {
        display: none !important;
    }
    /* 隐藏标题栏直播小队入口 */
    .uni-live-entry {
        display: none !important;
    }

    /* 直播间标题栏修改样式 */
    /* 标题栏字体大小 */
    .header-info-ctnr .rows-ctnr .upper-row .room-owner-username,.header-info-ctnr .nowrap {
        font-size: 14px !important;
    }
    /* 标题栏字体大小（备选） */
    .header-info-ctnr .closedown-left .initiator-ctnr .initiator-name {
        font-size: 14px !important;
        margin-left: 8px !important;
    }
    /* 直播间标题字体粗细 */
    .live-title {
        font-weight: 400 !important;
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
    /* 调整直播间标题内容左下侧行元素左边距 */
    .left-upper-row {
        margin-left: 17px !important;
    }
    /* 调整标题栏主播ID与标题的上边距 */
    .lower-row {
        margin-top: 0px !important;
    }
    /* 调整标题栏主播ID与标题的间距 */
    .lower-row {
        margin-left: 16px !important;
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
    /* 播放器容器背景透明 */
    body:not(.pure_room_root) .live-room-app .app-content .app-body .player-and-aside-area .left-container #fullscreen-container {
        background: #0000 !important;
    }
    /* 开通大会员继续观看 */
    .universal-countdown-card {
        display: none !important;
    }

    /* 直播间礼物栏 */
    /* 隐藏礼物道具栏 */
    #gift-control-vm {
        display: none !important;
    }
    /* 调整礼物栏布局底部高度为0 */
    #fullscreen-container {
        grid-template-rows: minmax(0,1fr) 0px !important;
    }
    /* 礼物栏布局底部高度为0 */
    .fullscreen-container-paddingbox {
        height: 0px !important;
    }
    /* 隐藏全屏礼物道具栏 */
    #web-player__bottom-bar__container {
        display: none !important;
    }
    /* 隐藏天选时刻弹窗 */
    .m-nobar__popup-container {
        display: none !important;
    }

    /* 直播间弹幕区 */
    /* 弹幕区圆角 */
    #aside-area-vm {
        border-radius: 12px !important;
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
    /* 设置弹幕@用户ID字体大小 */
    .common-nickname-wrapper {
        font-size: 14px !important;
    }
    /* 设置弹幕字体大小 */
    .chat-history-list {
        font-size: 14px !important;
    }
    /* 弹幕字体颜色（注释掉，可根据需要启用） */
    /* .danmaku-item {color: #0F0F0F !important;} */
    /* 设置弹幕ID字体大小 */
    .user-name {
        font-size: 14px !important;
        margin-right: 4px !important;
    }
    /* 设置弹幕ID字体颜色 */
    .user-name {
        color: #707070  !important;
    }
    /* 弹幕ID鼠标悬停字体颜色 */
    .chat-history-panel .chat-history-list .chat-item.danmaku-item .user-name:hover {
        color: #FB7299 !important;
    }
    /* 弹幕内容鼠标悬停字体颜色 */
    .chat-history-panel .chat-history-list .chat-item.danmaku-item .danmaku-item-right:hover {
        color: #FB7299 !important;
    }
    /* 弹幕换行行距 */
    .danmaku-item {
        line-height: 25px !important;
    }
    /* 弹幕之间行距 */
    body:not(.pure_room_root) .chat-history-panel .chat-history-list .chat-item {
        padding: 3px !important;
    }
    /* 隐藏弹幕ID前活动头衔徽章 */
    .title-label {
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
    /* 隐藏主播今日心愿 */
    .gift-wish-card-root {
        display: none !important;
    }
    /* 醒目留言展开后背景透明度 */
    .pay-note-panel .detail-info .mask {
        background-color: #fff0 !important;
        border-radius: 4px !important;
    }
    /* 醒目留言背景颜色 */
    .pay-note-panel {
        background-color: #0000001a !important;
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
    /* 弹幕区主播表情图片大小 */
    .chat-history-panel .chat-history-list .chat-item.danmaku-item .emoticon.bulge img {
        height: 45px !important;
    }
    /* 弹幕区边框圆角 */
    .live-room-app .app-content .app-body .player-and-aside-area .aside-area {
        border-radius: 4px !important;
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

    /* 直播间弹幕输入区 */
    /* 弹幕输入框布局边距 */
    .control-panel-ctnr {
        padding: 8px 8px 8px 8px !important;
    }
    /* 隐藏醒目留言按钮 */
    .super-chat {
        display: none !important;
    }
    /* 隐藏点赞按钮 */
    .like-btn {
        display: none !important;
    }
    /* 隐藏一起玩按钮 */
    .p-relative.play-together-panel {
        display: none !important;
    }
    /* 隐藏粉丝徽章选择 */
    .medal-section {
        display: none !important;
    }
    /* 弹幕输入框字体大小 */
    .chat-input {
        font-size: 14px !important;
    }
    /* 弹幕输入框内部高度 */
    .chat-input {
        height: 36px !important;
    }
    /* 弹幕输入框内部圆角 */
    .chat-input-ctnr {
        border-radius: 12px !important;
        overflow: hidden !important;
        box-sizing: border-box !important;
    }
    /* 弹幕输入框底部间隔 */
    .bottom-actions {
        margin-top: -2px !important;
    }
    /* 弹幕输入框底部高度 */
    .live-room-app .app-content .app-body .player-and-aside-area .aside-area .chat-control-panel {
        min-height: 86px !important;
    }
    /* 弹幕发送按钮样式 */
    .bl-button--small {
        min-width: 60px !important;
        height: 22px !important;
    }
    /* 弹幕发送按钮位置高度 */
    .right-action {
        top: -68px !important
    }
    /* 弹幕表情选择面板右边距 */
    .emoticons-panel {
        margin-right: 70px !important;
    }
    /* 弹幕表情图标位置高度 */
    .control-panel-icon-row .icon-right-part {
        margin-top: 4px !important;
    }
    /* 弹幕输入框功能按钮位置高度 */
    .control-panel-icon-row  {
        margin-top: -5px !important;
        margin-bottom: -3px !important;
    }
    /* 弹幕发送按钮圆角 */
    .bl-button--primary {
        border-radius: 24px !important;
    }
    /* 弹幕发送按钮颜色 */
    .bl-button--primary {
        background-color: #FB7299 !important;
    }
    /* 隐藏关闭礼物特效提醒 */
    .gift-block-toast {
        display: none !important;
    }
    /* 弹幕输入框聚焦时边框颜色 */
    .chat-input-ctnr.chat-input-focus {
        border: 1px solid #E3E5E7 !important;
    }
    /* 弹幕输入框背景图片位置 */
    #chat-control-panel-vm {
        background-position: center !important;
        background-size: cover !important;
    }
    /* 隐藏语音上麦按钮 */
    .voice-rtc {
        display: none !important;
    }
    /* 移除弹幕输入框换行 */
    .chat-input.border-box.block-panel .block-hint {
        display: inline !important;
        white-space: nowrap !important;
    }
    /* 弹幕输入区背景颜色 */
    body:not(.pure_room_root) .live-room-app .app-content .app-body .player-and-aside-area .aside-area .chat-control-panel {
        background-color: #19485D !important;
    }
    `);

    // 搜索框热词清理
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
})();
