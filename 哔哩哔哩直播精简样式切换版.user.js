// ==UserScript==
// @name                                                          哔哩哔哩直播精简样式切换版
// @description                                                   提供简洁的界面，只为安心看直播。支持两种样式切换。
// @author                                                        清风醉梦 (基于G-uang的脚本修改)
// @namespace                                                     https://greasyfork.org/zh-CN/scripts/503727
// @version                                                       1.0
// @match                                                         *://live.bilibili.com/*
// @icon                                                          https://www.bilibili.com/favicon.ico
// @run-at                                                        document-body
// @license                                                       MIT
// ==/UserScript==

(function() {
    'use strict';

    // 定义两种样式
    const styles = {
        A: {
            name: "样式A",
            css: `
                /* 样式A的CSS代码 */
                .entry_logo {display:none !important;}
                .tv-logo {display:none !important;}
                div.pointer.f-left.p-relative.h-100.shortcut-item:nth-of-type(2) {display:none !important;}
                div.pointer.f-left.p-relative.h-100.shortcut-item:nth-of-type(3) {display:none !important;}
                .trending {display:none !important;}
                #nav-searchform {background-color: #ffffff !important;}
                div.pointer.f-left.p-relative.h-100.shortcut-item:nth-of-type(1) {min-width:60px;}
                .v-middle.dp-i-block.p-relative.user-panel-ctnr {width:60px;}
                .user-panel-ctnr .user-panel .header-node .progress {display:none !important;}
                .follow-cntr .anchor-list .live-status {display:none !important;}
                .down-arrow-icon-block {display:none !important;}
                .w-100.over-hidden.p-relative.flip-view {display:none !important;}
                .room-info-ctnr {display:none !important;}
                #link-footer-vm {display:none !important;}
                .link-navbar-ctnr {box-shadow: inset 0 -1px #fff0 !important;}
                .none-select.list-none.dp-i-block.new-tabs {display:none !important;}
                .repost.post-content {background-color: #fcfcfc !important;}
                li.t-center.dp-i-block.pointer.tab-candidate:nth-of-type(2) {display:none !important;}
                .room-info-cntr {height:280px !important;}
                .room-info-cntr .content-wrapper {height: 210px !important;}
                .room-introduction-tags {display:none !important;}
                .room-announce-empty {display:none !important;}
                .trends-content {margin-top:1px !important;}
                .room-feed .room-feed-content .card {border: 1px solid #F1F2F300 !important;}
                .live-room-app .app-content .app-body .section-block .right-container {margin-top:1px !important;}
                .empty-content {display:none !important;}
                .room-info-cntr {border-radius:4px !important;border: 1px solid #E3E5E700 !important;}
                .p-fixed.webp.room-bg {display:none !important;}
                .side-bar-cntr {border-radius: 24px !important;}
                .side-bar-cntr {background-color: #ffffff00 !important;box-shadow: 0px 0px 20px 0px #ff669929 !important;border: 1px solid #b7b9bc3d !important;}
                .side-bar-cntr {filter: grayscale(100%) sepia(100%) hue-rotate(290deg) saturate(300%) !important;}
                .lab-cntr {filter: grayscale(100%) sepia(100%) hue-rotate(290deg) saturate(300%) !important;}
                .my-follow {filter: grayscale(100%) sepia(100%) hue-rotate(290deg) saturate(300%) !important;}
                .follow-cntr .anchor-list .three-anchor .one-anchor .anchor-name:hover p {color: #f69 !important;}
                .side-bar-popup-cntr {right: 48px !important;}
                .bl-button--size {border-radius: 24px !important;}
                .live-player-ctnr.minimal {width: 300px !important;height: 168.75px !important;border-radius: 4px !important;padding-top: 0px !important;right: 120px !important;}
                .live-room-app .app-content .app-body {width: 91.5% !important;max-width: 2000px !important;}
                .live-room-app .app-content {padding-top: 70px !important;}
                .live-room-app .app-content .app-body .player-and-aside-area .left-container {width: calc(100% - 300px - 10px) !important;}
                .live-room-app .app-content .app-body .section-block .left-container {width: calc(100% - 300px - 10px) !important;}
                .live-room-app .app-content .app-body .player-and-aside-area {margin-bottom: 8px !important;}
                .live-room-app .app-content .app-body .player-and-aside-area .left-container .head-info-section {height: 56px !important;border-radius: 4px 4px 0 0 !important;border: 0px solid #e3e5e7 !important;}
                .live-room-app .app-content .app-body .player-and-aside-area .left-container .head-info-section {background-position: center !important;background-size: cover !important;}
                .p-relative.follow-ctnr {display:none !important;}
                .lower-row > .right-ctnr {display:none !important;}
                .play-bill .p-relative {display:none !important;}
                .live-title .title-length-limit {max-width: 512px !important;}
                .header-info-ctnr .rows-ctnr .lower-row .live-area .area-link {max-width: 256px !important;}
                .header-info-ctnr .rows-ctnr .lower-row .live-area .area-link:hover {color: #f69 !important;}
                .header-info-ctnr .rows-ctnr .upper-row .room-owner-username:hover {color: #f69 !important;}
                .header-info-ctnr .rows-ctnr .upper-row .room-owner-username {line-height: 20px !important;}
                .upper-row > .right-ctnr {display:none !important;}
                .anchor-location.default {display: none !important;}
                .anchor-location.with-skin {display: none !important;}
                .header-info-ctnr .blur-edges-ctnr {display:none !important;}
                .header-info-ctnr .rows-ctnr .upper-row .room-owner-username,.header-info-ctnr .nowrap {font-size: 14px !important;}
                .rows-content {display: flex !important; flex-direction: row !important; align-items: center !important;}
                .lower-row {margin-top: 0px !important;}
                .lower-row {margin-left: 16px !important;}
                .blive-avatar-icons, .blive-avatar-pendant {display: none !important;}
                .blive-avatar {width: 36px !important; height: 36px !important;}
                .blive-avatar-face {width: 36px !important; height: 36px !important; background-size: cover !important;}
                .header-info-ctnr .avatar {width: 36px !important; height: 36px !important;}
                .header-info-ctnr {padding: 10px !important;padding-top: 10px !important;}
                .upper-row {width: fit-content !important;max-width: 100% !important;}
                .web-player-inject-wrap {display:none !important;}
                .link-toast.info.center-animation {display:none !important;}
                #game-id {display:none !important;}
                .web-player-icon-feedback {display:none !important;}
                .content.border-box {display:none !important;}
                #player-effect-vm > div > div.rhythm-storm {display:none !important;}
                .web-player-icon-roomStatus {display:none !important;}
                .announcement-wrapper.clearfix.no-select {display:none !important;}
                .shop-popover {display:none !important;}
                #switch-login-guide-vm {display:none !important;}
                .bilibili-combo-danmaku-container {display:none !important;}
                #fullscreen-danmaku-vm {display:none !important;}
                #gift-control-vm {display:none !important;}
                #web-player__bottom-bar__container {display:none !important;}
                .chat-history-panel {border-radius:4px 4px 0 0 !important;}
                #rank-list-vm {display:none !important;}
                #rank-list-ctnr-box {display:none !important;}
                .chat-history-panel {height: calc(100% - 0px - 110px) !important;}
                .chat-gift-bubble-vm {display:none !important;}
                .gift-item {display:none !important;}
                .penury-gift-msg {display:none !important;}
                .brush-prompt {display:none !important;}
                .important-prompt-item {display:none !important;}
                .danmaku-buffer-prompt {bottom:110px !important;}
                .with-penury-gift,.with-brush-prompt {height: -webkit-fill-available !important;}
                .guard-buy {display:none !important;}
                .top3-notice {display:none !important;}
                .top3-notice.chat-item {display:none !important;}
                .chat-item.common-danmuku-msg.border-box {display:none !important;}
                .common-danmuku-msg {display:none !important;}
                .hot-rank-msg {display:none !important;}
                .convention-msg {display:none !important;}
                .vip-icon {display:none !important;}
                .rank-icon {display:none !important;}
                .title-label {display:none !important;}
                .fans-medal-item-ctnr,.fans-medal-item-target {display:none !important;}
                .common-nickname-wrapper {font-size: 14px !important;}
                .chat-history-list {font-size: 14px !important;}
                .danmaku-item {color: #61666d !important;}
                .user-name {font-size: 14px !important;}
                .user-name {color: #484c53  !important;}
                .chat-history-panel .chat-history-list .chat-item.danmaku-item .user-name:hover {color: #f69 !important;}
                .chat-history-panel .chat-history-list .chat-item.danmaku-item .danmaku-item-right:hover {color: #f69 !important;}
                .danmaku-item {line-height: 25px !important;}
                body:not(.pure_room_root) .chat-history-panel .chat-history-list .chat-item {padding: 3px !important;}
                .chat-colorful-bubble {margin: 0px 0 !important;}
                .chat-colorful-bubble {background: #00000000 !important;}
                .chat-history-panel .chat-history-list .chat-item.danmaku-item.has-bubble {border-image-source:none!important;}
                .chat-colorful-bubble {border-image-source: none !important;}
                .new-video-pk-item-dm {display:none !important;}
                .play-together-service-card-container {display:none !important;}
                .chat-history-panel.new {padding-bottom: 0px !important;}
                .chat-history-panel .chat-history-list.with-brush-prompt {height: calc(100% - 0px) !important;}
                #combo-card {display:none !important;}
                #combo-danmaku-vm {display:none !important;}
                .gift-wish-card-root {display:none !important;}
                .pay-note-panel .detail-info .mask {background-color: #fff0 !important;border-radius: 4px !important;}
                .pay-note-panel {background-color: #0000001a !important;border-radius: 4px !important;}
                .card-detail .card-item-middle-bottom {border-radius: 0px 0px 6px 6px !important;}
                .card-detail .card-item-middle-bottom .bottom-background {border-radius: 6px !important;}
                .chat-history-panel .chat-history-list .chat-item.superChat-card-detail .card-item-middle-bottom .bottom-background {border-radius: 6px !important;}
                .chat-history-panel .chat-history-list .chat-item.danmaku-item .emoticon.bulge img {height: 45px !important;}
                .live-room-app .app-content .app-body .player-and-aside-area .aside-area {border-radius:4px !important;}
                .ps:hover > .ps__scrollbar-y-rail:hover {background-color: #eeeeee00 !important;opacity: 0.5 !important;}
                .ps:hover.ps--in-scrolling.ps--y > .ps__scrollbar-y-raiy {background-color: #eeeeee00 !important;opacity: 0.5 !important;}
                .ps.ps--in-scrolling.ps--y > .ps__scrollbar-y-rail {background-color: #eeeeee00 !important;opacity: 0.5 !important;}
                .common-nickname-wrapper {display: contents !important;}
                #gift-screen-animation-vm {display:none !important;}
                .chat-control-panel {border-radius: 0 0 4px 4px !important;}
                .super-chat {display:none !important;}
                .like-btn {display:none !important;}
                .p-relative.play-together-panel {display:none !important;}
                .medal-section {display:none !important;}
                .chat-input {font-size: 14px !important;}
                .chat-input {height: 36px !important;}
                .chat-input-ctnr {margin-top: 5px !important;}
                .bottom-actions {margin-top: -10px !important;}
                .live-room-app .app-content .app-body .player-and-aside-area .aside-area .chat-control-panel {min-height: 86px !important;}
                .bl-button--small {min-width: 60px !important;height: 22px !important;}
                .right-action {top:-60px !important}
                .emoticons-panel {margin-right: 70px !important;}
                .control-panel-icon-row .icon-right-part {margin-top: 4px !important;}
                .control-panel-icon-row  {margin-top: -5px !important;margin-bottom: 5px !important;}
                .bl-button--primary {border-radius: 24px !important;}
                .bl-button--primary {background-color: #f69 !important;}
                .gift-block-toast {display:none !important;}
                .chat-input-ctnr.chat-input-focus {border: 1px solid #E3E5E7 !important;}
                #chat-control-panel-vm {background-position: center !important;background-size: cover !important;}
                .voice-rtc {display:none !important;}
                .input-limit-hint {display:none !important;}
            `
        },
        B: {
            name: "样式B",
            css: `
                /* 样式B的CSS代码 */
                .entry_logo {display:none !important;}
                .tv-logo {display:none !important;}
                div.pointer.f-left.p-relative.h-100.shortcut-item:nth-of-type(2) {display:none !important;}
                div.pointer.f-left.p-relative.h-100.shortcut-item:nth-of-type(3) {display:none !important;}
                .trending {display:none !important;}
                #nav-searchform {background-color: #ffffff !important;}
                div.pointer.f-left.p-relative.h-100.shortcut-item:nth-of-type(1) {min-width:60px;}
                .v-middle.dp-i-block.p-relative.user-panel-ctnr {width:60px;}
                .user-panel-ctnr .user-panel .header-node .progress {display:none !important;}
                .follow-cntr .anchor-list .live-status {display:none !important;}
                .down-arrow-icon-block {display:none !important;}
                .w-100.over-hidden.p-relative.flip-view {display:none !important;}
                .room-info-ctnr {display:none !important;}
                #link-footer-vm {display:none !important;}
                .link-navbar-ctnr {box-shadow: inset 0 -1px #fff0 !important;}
                .none-select.list-none.dp-i-block.new-tabs {display:none !important;}
                .repost.post-content {background-color: #fcfcfc !important;}
                li.t-center.dp-i-block.pointer.tab-candidate:nth-of-type(2) {display:none !important;}
                .room-info-cntr {height:280px !important;}
                .room-info-cntr .content-wrapper {height: 210px !important;}
                .room-introduction-tags {display:none !important;}
                .room-announce-empty {display:none !important;}
                .trends-content {margin-top:1px !important;}
                .room-feed .room-feed-content .card {border: 1px solid #F1F2F300 !important;}
                .live-room-app .app-content .app-body .section-block .right-container {margin-top:1px !important;}
                .empty-content {display:none !important;}
                .room-info-cntr {border-radius:4px !important;border: 1px solid #E3E5E700 !important;}
                .p-fixed.webp.room-bg {display:none !important;}
                .side-bar-cntr {border-radius: 24px !important;}
                .side-bar-cntr {background-color: #ffffff00 !important;box-shadow: 0px 0px 20px 0px #ff669929 !important;border: 1px solid #b7b9bc3d !important;}
                .side-bar-cntr {filter: grayscale(100%) sepia(100%) hue-rotate(290deg) saturate(300%) !important;}
                .lab-cntr {filter: grayscale(100%) sepia(100%) hue-rotate(290deg) saturate(300%) !important;}
                .my-follow {filter: grayscale(100%) sepia(100%) hue-rotate(290deg) saturate(300%) !important;}
                .follow-cntr .anchor-list .three-anchor .one-anchor .anchor-name:hover p {color: #f69 !important;}
                .side-bar-popup-cntr {right: 48px !important;}
                .bl-button--size {border-radius: 24px !important;}
                .live-player-ctnr.minimal {width: 300px !important;height: 168.75px !important;border-radius: 4px !important;padding-top: 0px !important;right: 120px !important;}
                .live-room-app .app-content .app-body {width: 87.6% !important;max-width: 1700px !important;}
                .live-room-app .app-content {padding-top: 70px !important;}
                .live-room-app .app-content .app-body .player-and-aside-area .left-container {width: calc(100% - 300px - 10px) !important;}
                .live-room-app .app-content .app-body .section-block .left-container {width: calc(100% - 300px - 10px) !important;}
                .live-room-app .app-content .app-body .player-and-aside-area {margin-bottom: 8px !important;}
                .live-room-app .app-content .app-body .player-and-aside-area .left-container .head-info-section {height: 96px !important;border-radius: 4px 4px 0 0 !important;border: 0px solid #e3e5e7 !important;}
                .live-room-app .app-content .app-body .player-and-aside-area .left-container .head-info-section {background-position: center !important;background-size: cover !important;}
                .p-relative.follow-ctnr {display:none !important;}
                .lower-row > .right-ctnr {display:none !important;}
                .play-bill .p-relative {display:none !important;}
                .live-title .title-length-limit {max-width: 512px !important;}
                .header-info-ctnr .rows-ctnr .lower-row .live-area .area-link {max-width: 256px !important;}
                .header-info-ctnr .rows-ctnr .lower-row .live-area .area-link:hover {color: #f69 !important;}
                .header-info-ctnr .rows-ctnr .upper-row .room-owner-username:hover {color: #f69 !important;}
                .header-info-ctnr .rows-ctnr .upper-row .room-owner-username {line-height: 20px !important;}
                .header-info-ctnr .rows-ctnr .upper-row .room-owner-username {margin-left: 8px !important;}
                .live-title .flex-wrap {margin-left: 8px !important;}
                .upper-row > .right-ctnr {display:none !important;}
                .anchor-location.default {display: none !important;}
                .anchor-location.with-skin {display: none !important;}
                .header-info-ctnr .blur-edges-ctnr {display:none !important;}
                .web-player-inject-wrap {display:none !important;}
                .link-toast.info.center-animation {display:none !important;}
                #game-id {display:none !important;}
                .web-player-icon-feedback {display:none !important;}
                .content.border-box {display:none !important;}
                #player-effect-vm > div > div.rhythm-storm {display:none !important;}
                .web-player-icon-roomStatus {display:none !important;}
                .announcement-wrapper.clearfix.no-select {display:none !important;}
                .shop-popover {display:none !important;}
                #switch-login-guide-vm {display:none !important;}
                .bilibili-combo-danmaku-container {display:none !important;}
                #fullscreen-danmaku-vm {display:none !important;}
                #gift-control-vm {display:none !important;}
                #web-player__bottom-bar__container {display:none !important;}
                .chat-history-panel {border-radius:4px 4px 0 0 !important;}
                #rank-list-vm {display:none !important;}
                #rank-list-ctnr-box {display:none !important;}
                .chat-history-panel {height: calc(100% - 0px - 110px) !important;}
                .chat-gift-bubble-vm {display:none !important;}
                .gift-item {display:none !important;}
                .penury-gift-msg {display:none !important;}
                .brush-prompt {display:none !important;}
                .important-prompt-item {display:none !important;}
                .danmaku-buffer-prompt {bottom:110px !important;}
                .with-penury-gift,.with-brush-prompt {height: -webkit-fill-available !important;}
                .guard-buy {display:none !important;}
                .top3-notice {display:none !important;}
                .top3-notice.chat-item {display:none !important;}
                .chat-item.common-danmuku-msg.border-box {display:none !important;}
                .common-danmuku-msg {display:none !important;}
                .hot-rank-msg {display:none !important;}
                .convention-msg {display:none !important;}
                .vip-icon {display:none !important;}
                .rank-icon {display:none !important;}
                .title-label {display:none !important;}
                .fans-medal-item-ctnr,.fans-medal-item-target {display:none !important;}
                .common-nickname-wrapper {font-size: 14px !important;}
                .chat-history-list {font-size: 14px !important;}
                .danmaku-item {color: #61666d !important;}
                .user-name {font-size: 14px !important;}
                .user-name {color: #484c53  !important;}
                .chat-history-panel .chat-history-list .chat-item.danmaku-item .user-name:hover {color: #f69 !important;}
                .chat-history-panel .chat-history-list .chat-item.danmaku-item .danmaku-item-right:hover {color: #f69 !important;}
                .danmaku-item {line-height: 25px !important;}
                body:not(.pure_room_root) .chat-history-panel .chat-history-list .chat-item {padding: 3px !important;}
                .chat-colorful-bubble {margin: 0px 0 !important;}
                .chat-colorful-bubble {background: #00000000 !important;}
                .chat-history-panel .chat-history-list .chat-item.danmaku-item.has-bubble {border-image-source:none!important;}
                .chat-colorful-bubble {border-image-source: none !important;}
                .new-video-pk-item-dm {display:none !important;}
                .play-together-service-card-container {display:none !important;}
                .chat-history-panel.new {padding-bottom: 0px !important;}
                .chat-history-panel .chat-history-list.with-brush-prompt {height: calc(100% - 0px) !important;}
                #combo-card {display:none !important;}
                #combo-danmaku-vm {display:none !important;}
                .gift-wish-card-root {display:none !important;}
                .pay-note-panel .detail-info .mask {background-color: #fff0 !important;border-radius: 4px !important;}
                .pay-note-panel {background-color: #0000001a !important;border-radius: 4px !important;}
                .card-detail .card-item-middle-bottom {border-radius: 0px 0px 6px 6px !important;}
                .card-detail .card-item-middle-bottom .bottom-background {border-radius: 6px !important;}
                .chat-history-panel .chat-history-list .chat-item.superChat-card-detail .card-item-middle-bottom .bottom-background {border-radius: 6px !important;}
                .chat-history-panel .chat-history-list .chat-item.danmaku-item .emoticon.bulge img {height: 45px !important;}
                .live-room-app .app-content .app-body .player-and-aside-area .aside-area {border-radius:4px !important;}
                .ps:hover > .ps__scrollbar-y-rail:hover {background-color: #eeeeee00 !important;opacity: 0.5 !important;}
                .ps:hover.ps--in-scrolling.ps--y > .ps__scrollbar-y-raiy {background-color: #eeeeee00 !important;opacity: 0.5 !important;}
                .ps.ps--in-scrolling.ps--y > .ps__scrollbar-y-rail {background-color: #eeeeee00 !important;opacity: 0.5 !important;}
                .common-nickname-wrapper {display: contents !important;}
                #gift-screen-animation-vm {display:none !important;}
                .chat-control-panel {border-radius: 0 0 4px 4px !important;}
                .super-chat {display:none !important;}
                .like-btn {display:none !important;}
                .p-relative.play-together-panel {display:none !important;}
                .medal-section {display:none !important;}
                .chat-input {font-size: 14px !important;}
                .chat-control-panel {height: 114px !important;}
                .live-room-app .app-content .app-body .player-and-aside-area .aside-area .chat-control-panel {min-height: 100px !important;}
                .bl-button--small {min-width: 60px !important;}
                .right-action {top: -100px !important;}
                .emoticons-panel {margin-right: 70px !important;}
                .control-panel-icon-row .icon-right-part {margin-top: 5px !important;}
                .bl-button--primary {border-radius: 24px !important;}
                .bl-button--primary {background-color: #f69 !important;}
                .gift-block-toast {display:none !important;}
                .chat-input-ctnr.chat-input-focus {border: 1px solid  #757575 !important;}
                #chat-control-panel-vm {background-position: bottom left !important;}
                .voice-rtc {display:none !important;}
            `
        }
    };



    // 加载样式函数
    function loadStyle(css) {
        let style = document.getElementById('bilibili-live-style');
        if (!style) {
            style = document.createElement('style');
            style.id = 'bilibili-live-style';
            style.type = 'text/css';
            document.head.appendChild(style);
        }
        style.innerHTML = css;
    }

    // 切换样式函数
    function toggleStyle() {
        const currentStyle = GM_getValue('currentStyle', 'A');
        const newStyle = currentStyle === 'A' ? 'B' : 'A';
        GM_setValue('currentStyle', newStyle);
        loadStyle(styles[newStyle].css);
    }

    // 初始化
    (function init() {
        // 应用保存的样式或默认样式
        const currentStyle = GM_getValue('currentStyle', 'A');
        loadStyle(styles[currentStyle].css);

        // 添加切换菜单
        GM_registerMenuCommand("样式切换", toggleStyle);
    })();
})();
