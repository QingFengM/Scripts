// ==UserScript==
// @name                                                          哔哩哔哩直播精简
// @description                                                   提供简洁的界面，只为安心看直播。
// @homepage                                                      https://github.com/QingFengM/Scripts/
// @author                                                        清风醉梦
// @namespace                                                     原作者：G-uang
// @version                                                       3.0
// @match                                                         *://live.bilibili.com/*
// @icon                                                          https://www.bilibili.com/favicon.ico
// @run-at                                                        document-body
// @license                                                       MIT
// ==/UserScript==

(function() {
    var css = '{display:none !important;height:0 !important}'

//直播间
    css += '.entry_logo {display:none !important;}';//顶栏log
    css += '.tv-logo {display:none !important;}';//顶栏log
    css += 'div.pointer.f-left.p-relative.h-100.shortcut-item:nth-of-type(2) {display:none !important;}';//顶栏购买电池
    css += 'div.pointer.f-left.p-relative.h-100.shortcut-item:nth-of-type(3) {display:none !important;}';//顶栏下载客户端
    css += 'div.pointer.f-left.p-relative.h-100.shortcut-item:nth-of-type(4) {display:none !important;}';//顶栏我要开播
    css += '.shortcuts-ctnr .shortcut-item {margin-right: 120px !important;}';//顶栏右边距
    css += '.link-navbar .flex-block {padding-left: 30px !important;}';//顶栏左边距
    css += '.search-bar-ctnr {max-width: 400px !important;}';//顶栏搜索框宽度
    css += '.trending {display:none !important;}';//顶栏热搜
    css += '#nav-searchform {background-color: #ffffff !important;}';//顶栏搜索背景颜色
    css += 'div.pointer.f-left.p-relative.h-100.shortcut-item:nth-of-type(1) {min-width:60px;}';//顶栏关注宽度
    css += '.v-middle.dp-i-block.p-relative.user-panel-ctnr {width:60px;}';//顶栏头像宽度
    css += '.user-panel-ctnr .user-panel .header-node .progress {display:none !important;}';//顶栏头像下方的消费等级
    css += '.user-panel-ctnr .user-panel .header-node {height: 85px !important;}';//顶栏头像下方距离菜单的距离
    css += '.user-panel-ctnr .user-panel {height: 375px !important;}';//顶栏头像菜单内容器高度
    css += '.section-block.battery-block {display:none !important;}';//电池
    css += '.follow-cntr .anchor-list .live-status {display:none !important;}';//顶栏关注中xxx暂未开播
    css += '.down-arrow-icon-block {display:none !important;}';//顶栏更多中的符号
    css += '.w-100.over-hidden.p-relative.flip-view {display:none !important;}';//视频区下方广告栏
    css += '.room-info-ctnr {display:none !important;}';//视频区下方主播推荐
    css += '#link-footer-vm {display:none !important;}';//网页底部版权信息
    css += '.link-navbar-ctnr {box-shadow: inset 0 -1px #fff0 !important;}';//顶栏分割线
    css += '.none-select.list-none.dp-i-block.new-tabs {display:none !important;}';//视频区下方动态标题
    css += '.repost.post-content {background-color: #fcfcfc !important;}';//视频区下方动态转发区背景
    css += 'li.t-center.dp-i-block.pointer.tab-candidate:nth-of-type(2) {display:none !important;}';//视频区右下方主播荣誉
    css += '.room-info-cntr {height:280px !important;}';//视频区右下方主播公告内部高度
    css += '.room-info-cntr .content-wrapper {height: 210px !important;}';//视频区右下方主播公告高度
    css += '.room-introduction-tags {display:none !important;}';//视频区下方主播简介里的tag标签
    css += '.room-announce-empty {display:none !important;}';//视频区下方主播公告未填写内容时出现的图片
    css += '.trends-content {margin-top:1px !important;}';//动态位置高度
    css += '.room-feed .room-feed-content .card {border: 1px solid #F1F2F300 !important;}';//视频区下方动态边框
    css += '.bili-dyn-item {border-radius: 12px !important;}';//动态圆角
    css += '.live-room-app .app-content .app-body .section-block .right-container {margin-top:1px !important;}';//视频区下方主播公告位置高度
    css += '.empty-content {display:none !important;}';//视频区下方动态未刷新出来时的图片
    css += '.room-info-cntr {border-radius:12px !important;border: 1px solid #E3E5E700 !important;}';//视频区下方主播公告边框圆角
    css += '.p-fixed.webp.room-bg {display:none !important;}';//直播间背景
    css += '#player-ctnr {box-shadow:0 0 12px #0003 !important;}';//直播间背景阴影
    css += '#aside-area-vm {box-shadow:0 0 12px #0003 !important;}';//直播间背景阴影
    css += '.side-bar-cntr {display: none !important;visibility: hidden !important;opacity: 0 !important;height: 0 !important;width: 0 !important;overflow: hidden !important;}';//侧边栏
    css += '#sidebar-vm {display: none !important;}';//侧边栏
    css += '.live-player-ctnr.minimal {width: 300px !important;height: 168.75px !important;border-radius: 4px !important;padding-top: 0px !important;right: 120px !important;}';//小窗播放比例修改位16:9
    css += '.live-room-app .app-content .app-body {width: 91.5% !important;max-width: 2000px !important;}';//播放区域宽度.如果想使用原来的播放器大小,请修改"width"默认为 "80%","max-width"默认为"1504px"
    css += '.live-room-app .app-content {padding-top: 70px !important;}';//播放区顶部距离
    css += '.live-room-app .app-content .app-body .player-and-aside-area .left-container {width: calc(100% - 300px - 10px) !important;}';//播放区与弹幕区间隔距离
    css += '.live-room-app .app-content .app-body .section-block .left-container {width: calc(100% - 300px - 10px) !important;}';//动态区与公告间隔距离
    css += '.live-room-app .app-content .app-body .player-and-aside-area {margin-bottom: 8px !important;}';//播放区与动态区间隔距离
    css += '.follow-cntr .anchor-list .three-anchor .one-anchor .anchor-name p:hover {color: #FB7299 !important;}';//关注
    css += '.follow-cntr .my-follow .follow-text {color: #FB7299 !important;}';//关注
    css += '.bili-dyn-tag {color: #FB7299 !important;}';//动态
    css += '.link-footer {display:none !important;}';//底栏

//直播间标题栏
    css += '.live-room-app .app-content .app-body .player-and-aside-area .left-container .head-info-section {height: 56px !important;border-radius: 12px 12px 0 0 !important;border: 0px solid #e3e5e7 !important;}';//标题栏圆角
    css += '.live-room-app .app-content .app-body .player-and-aside-area .left-container .head-info-section {background-position: center !important;background-size: cover !important;}';//标题栏背景图片位置
    css += '.p-relative.follow-ctnr {display:none !important;}';//标题栏助力与上舰
    css += '.lower-row > .right-ctnr {display:none !important;}';//标题栏第二行广告
    css += '.play-bill .p-relative {display:none !important;}';//标题栏节目单
    css += '.live-title .title-length-limit {max-width: 512px !important;}';//直播间标题字符长度限制解除
    css += '.header-info-ctnr .rows-ctnr .lower-row .live-area .area-link {max-width: 256px !important;}';//直播间分区字符长度限制解除
    css += '.header-info-ctnr .rows-ctnr .lower-row .live-area .area-link:hover {color: #f69 !important;}';//直播间分区鼠标悬停字体颜色
    css += '.header-info-ctnr .rows-ctnr .upper-row .room-owner-username:hover {color: #f69 !important;}';//直播间主播鼠标悬停字体颜色
    css += '.header-info-ctnr .rows-ctnr .upper-row .room-owner-username {line-height: 20px !important;}';//直播间主播字符高度
    css += '.upper-row > .right-ctnr {display:none !important;}';//标题栏分享/举报直播间
    css += '.anchor-location.default {display: none !important;}';//标题栏主播所在城市
    css += '.anchor-location.with-skin {display: none !important;}';//标题栏主播所在城市
    css += '.header-info-ctnr .blur-edges-ctnr {display:none !important;}';//标题栏与视频区分割线
    css += '.uni-live-entry {display:none !important;}';//标题栏直播小队

//直播间标题栏修改样式
    css += '.header-info-ctnr .rows-ctnr .upper-row .room-owner-username,.header-info-ctnr .nowrap {font-size: 14px !important;}';//标题栏字体大小
    css += '.header-info-ctnr .closedown-left .initiator-ctnr .initiator-name {font-size: 14px !important;margin-left: 8px !important;margin-right: 8px !important;}';//标题栏字体大小
    css += '.live-title {font-weight: 400 !important;}';//直播间标题字体粗细默认
    css += '.rows-content {display: flex !important; flex-direction: row !important; align-items: center !important;}'; //设置标题栏主播ID与直播间标题内容为水平弹性布局，子元素居中
    css += '.closedown-left {display: flex !important; flex-direction: row-reverse !important; align-items: center !important;}'; //设置标题栏主播ID与直播间标题内容为水平弹性布局并互换显示位置
    css += '.initiator-label.live-skin-normal-a-text[data-v-084ff7f5] {display: none !important;}';//删除发起者:文本标签
    css += '.left-lower-row {margin-top: 0px !important;}';//调整直播间标题内容左下侧行元素上边距
    css += '.left-upper-row {margin-left: 17px !important;}';//调整直播间标题内容左下侧行元素左边距
    css += '.lower-row {margin-top: 0px !important;}'; //标题栏主播ID与直播间标题水平设置
    css += '.lower-row {margin-left: 16px !important;}'; //标题栏主播ID与直播间标题间距
    css += '.blive-avatar-icons, .blive-avatar-pendant {display: none !important;}'; //隐藏头像右下认证图标和头像挂件
    css += '.blive-avatar {width: 36px !important; height: 36px !important;}'; //头像容器固定36x36
    css += '.blive-avatar-face {width: 36px !important; height: 36px !important; background-size: cover !important;}'; //头像图片大小36x36
    css += '.header-info-ctnr .avatar {width: 36px !important; height: 36px !important;}'; //头像信息内的头像固定36x36
    css += '#head-info-vm {padding: 10px !important;padding-top: 10px !important;}'; //头像信息容器内边距10px
    css += '.upper-row {width: fit-content !important;max-width: 100% !important;}';//动态调整主播ID容器宽度

//直播间视频区
    css += '.web-player-inject-wrap {display:none !important;}';//PK
    css += '.link-toast.info.center-animation {display:none !important;}';//PK
    css += '#game-id {display:none !important;}';//互动玩法
    css += '.web-player-icon-feedback {display:none !important;}';//视频区反馈
    css += '.content.border-box {display:none !important;}';//视频区恭喜主播获得超人气推荐奖励
    css += '#player-effect-vm > div > div.rhythm-storm {display:none !important;}';//视频区节奏风暴
    css += '.web-player-icon-roomStatus {display:none !important;}';//视频区直播水印
    css += '.announcement-wrapper.clearfix.no-select {display:none !important;}';//视频区礼物及广播条
    css += '.shop-popover {display:none !important;}';//视频左上角网页端暂不支持购物小橙车
    css += '#switch-login-guide-vm {display:none !important;}';//视频区未登录账号时显示登陆提示
    css += '.bilibili-combo-danmaku-container {display:none !important;}';//视频区弹幕连击
    css += '#fullscreen-danmaku-vm {display:none !important;}';//视频区全屏弹幕发送框
    css += '#live-charge-vm {display: none !important;}';//视频区付费观看直播
    css += '#player-ctnr{border-radius: 12px !important;overflow:hidden !important;}';//播放器底部圆角

//直播间礼物栏
    css += '#gift-control-vm {display:none !important;}';//礼物道具栏
    css += '#web-player__bottom-bar__container {display:none !important;}';//全屏礼物道具栏
    css += '.m-nobar__popup-container {display:none !important;}';//天选时刻

//直播间弹幕区
    css += '#aside-area-vm {border-radius:12px !important;}';//弹幕区圆角
    css += '#rank-list-vm {display:none !important;}';//弹幕区礼物榜背景
    css += '#rank-list-ctnr-box {display:none !important;}';//弹幕区顶部礼物榜
    css += '.chat-history-panel {height: calc(100% - 0px - 110px) !important;}';//弹幕区高度调整
    css += '.chat-gift-bubble-vm {display:none !important;}';//弹幕区投喂礼物信息
    css += '.gift-item {display:none !important;}';//弹幕区投喂礼物信息
    css += '.penury-gift-msg {display:none !important;}';//弹幕区底部投喂礼物信息
    css += '.brush-prompt {display:none !important;}';//弹幕区底部其他人进入直播间信息
    css += '.important-prompt-item {display:none !important;}';//弹幕区底部自己进入直播间信息
    css += '.danmaku-buffer-prompt {bottom:110px !important;}';//弹幕区底部未读弹幕提醒位置调整
    css += '.with-penury-gift,.with-brush-prompt {height: -webkit-fill-available !important;}';//弹幕区弹幕上下位移固定
    css += '.guard-buy {display:none !important;}';//弹幕区续费提示
    css += '.top3-notice {display:none !important;}';//弹幕区恭喜XX成为高能榜
    css += '.top3-notice.chat-item {display:none !important;}';//恭喜xxx成为高能用户
    css += '.chat-item.common-danmuku-msg.border-box {display:none !important;}';//恭喜主播xxx成为虚拟航海第x名
    css += '.common-danmuku-msg {display:none !important;}';//弹幕区绝杀时刻系统提示弹幕
    css += '.hot-rank-msg {display:none !important;}';//弹幕区榜单系统提示弹幕
    css += '.convention-msg {display:none !important;}';//弹幕区系统提示
    css += '.common-nickname-wrapper {font-size: 14px !important;}';//弹幕@用户ID字体大小
    css += '.chat-history-list {font-size: 14px !important;}';//弹幕字体大小
    css += '.danmaku-item {color: #61666d !important;}';//弹幕字体颜色
    css += '.user-name {font-size: 14px !important;}';//弹幕ID字体大小
    css += '.user-name {color: #484c53  !important;}';//弹幕ID字体颜色
    css += '.chat-history-panel .chat-history-list .chat-item.danmaku-item .user-name:hover {color: #f69 !important;}';//弹幕ID鼠标悬停字体颜色
    css += '.chat-history-panel .chat-history-list .chat-item.danmaku-item .danmaku-item-right:hover {color: #f69 !important;}';//弹幕鼠标悬停字体颜色
    css += '.danmaku-item {line-height: 25px !important;}';//弹幕换行行距
    css += 'body:not(.pure_room_root) .chat-history-panel .chat-history-list .chat-item {padding: 3px !important;}';//弹幕之间行距
    css += '.title-label {display:none !important;}';//弹幕区ID前活动头衔徽章
    css += '.rank-icon {display:none !important;}';//弹幕区ID前榜X
    css += '.fans-medal-item-ctnr,.fans-medal-item-target {display:none !important;}';//弹幕区ID前粉丝徽章消费等级
    css += '.new-video-pk-item-dm {display:none !important;}';//弹幕区PK弹幕广告
    css += '.play-together-service-card-container {display:none !important;}';//弹幕区找他玩消费引导横条
    css += '.chat-history-panel.new {padding-bottom: 0px !important;}';//弹幕区连击互动高度
    css += '.chat-history-panel .chat-history-list.with-brush-prompt {height: calc(100% - 0px) !important;}';//弹幕区连击互动高度
    css += '#combo-card {display:none !important;}';//弹幕区连击互动
    css += '#combo-danmaku-vm {display:none !important;}';//弹幕区连击互动
    css += '.gift-wish-card-root {display:none !important;}';//弹幕区主播今日心愿
    css += '.pay-note-panel .detail-info .mask {background-color: #fff0 !important;border-radius: 4px !important;}';//弹幕区醒目留言展开后背景透明度
    css += '.pay-note-panel {background-color: #0000001a !important;border-radius: 4px !important;}';//弹幕区醒目留言背景颜色
    css += '.card-detail .card-item-middle-bottom {border-radius: 0px 0px 6px 6px !important;}';//弹幕区醒目留言展开后图片圆角
    css += '.card-detail .card-item-middle-bottom .bottom-background {border-radius: 6px !important;}';//弹幕区醒目留言展开后图片角标圆角
    css += '.chat-history-panel .chat-history-list .chat-item.superChat-card-detail .card-item-middle-bottom .bottom-background {border-radius: 6px !important;}';//弹幕区醒目留言图片角标圆角
    css += '.chat-history-panel .chat-history-list .chat-item.danmaku-item .emoticon.bulge img {height: 45px !important;}';//弹幕区主播表情图片大小
    css += '.live-room-app .app-content .app-body .player-and-aside-area .aside-area {border-radius:4px !important;}';//弹幕区边框圆角
    css += '.ps:hover > .ps__scrollbar-y-rail:hover {background-color: #eeeeee00 !important;opacity: 0.5 !important;}';//弹幕区滚动条触碰时颜色和背景色
    css += '.ps:hover.ps--in-scrolling.ps--y > .ps__scrollbar-y-raiy {background-color: #eeeeee00 !important;opacity: 0.5 !important;}';//弹幕区滚动条按下时颜色和背景色
    css += '.ps.ps--in-scrolling.ps--y > .ps__scrollbar-y-rail {background-color: #eeeeee00 !important;opacity: 0.5 !important;}';//弹幕区滚动条滚动条滑动时颜色和背景色
    css += '.common-nickname-wrapper {display: contents !important;}';//弹幕区XXX为主播点赞
    css += '#gift-screen-animation-vm {display:none !important;}';//弹幕区礼物动画
    css += '#fans-medal-popover-vm {display:none !important;}';//弹幕区礼物动画
    css += '#chat-gift-bubble-vm {display:none !important;}';//弹幕区礼物动画
    css += '#all-guide-cards {display:none !important;}';//弹幕区礼物动画
    css += '.lottery-gift-toast {display:none !important;}';//弹幕区礼物动画
    css += '#chat-msg-bubble-vm {display: none !important;}';//弹幕区SC礼物动画
    css += '#welcome-area-bottom-vm {display:none !important;}';//弹幕区入场动画
    css += '#activity-welcome-area-vm {display:none !important;}';//弹幕区入场动画
    css += '.chat-colorful-bubble {margin: 0px 0 !important;}';//弹幕区特权弹幕行距
    css += '.chat-colorful-bubble {background: #00000000 !important;}';//弹幕区特权弹幕背景颜色
    css += '.chat-history-panel .chat-history-list .chat-item.danmaku-item.has-bubble {border-image-source:none !important;}';//弹幕区特权弹幕背景
    css += '.chat-colorful-bubble {border-image-source: none !important;}';//弹幕区特权弹幕背景图片
    css += '.chat-item.danmaku-item > div[style*="border-radius: 5px; overflow: hidden; width: 100%; height: 62px; position: absolute;"] {display: none !important;}';//弹幕区特权弹幕特效
    css += '.chat-item.danmaku-item {border-image-source: none !important;border-image-slice: initial !important;border-image-width: initial !important;position: static !important;}';//弹幕区特权弹幕特效
    css += '.pilot-icon {display: none !important;}';//弹幕区特权弹幕特效
    css += '.admin-icon ~ br {display: none !important;}';//弹幕区特权弹幕特效
    css += '.card-item-top-right {display: none !important;}';//弹幕区特权弹幕特效
    css += '.fans-medal-item-ctnr ~ br {display: none !important;}';//弹幕区特权弹幕特效
    css += '.vote-card {display: none !important;}';//弹幕区弹幕投票横幅

//直播间弹幕输入区
    css += '.super-chat {display:none !important;}';//弹幕输入框醒目留言
    css += '.like-btn {display:none !important;}';//弹幕输入框点赞
    css += '.p-relative.play-together-panel {display:none !important;}';//弹幕输入框一起玩
    css += '.medal-section {display:none !important;}';//弹幕输入框粉丝徽章
    css += '.chat-input {font-size: 14px !important;}';//弹幕输入框字体大小
    css += '.chat-input {height: 36px !important;}';//弹幕输入框内部高度
    css += '.chat-input-ctnr {margin-top: 5px !important;}';//弹幕输入框上部距离输入框功能位置间隔
    css += '.chat-input-ctnr[data-v-cbea97b8] {border-radius: 12px !important;}';//弹幕输入框内部圆角
    css += '.chat-input[data-v-cbea97b8] {border-radius: 12px !important;}';//弹幕输入框内部圆角
    css += '.bottom-actions {margin-top: -10px !important;}';//弹幕输入框底部距离输入框下部间隔
    css += '.live-room-app .app-content .app-body .player-and-aside-area .aside-area .chat-control-panel {min-height: 86px !important;}';//弹幕输入框底部高度
    css += '.bl-button--small {min-width: 60px !important;height: 22px !important;}';//弹幕输入框发送按钮样式宽度和高度
    css += '.right-action {top:-60px !important}';//弹幕输入框发送按钮位置高度
    css += '.emoticons-panel {margin-right: 70px !important;}';//弹幕输入框表情距离输入框右边的距离
    css += '.control-panel-icon-row .icon-right-part {margin-top: 4px !important;}';//弹幕输入框表情位置高度
    css += '.control-panel-icon-row  {margin-top: -5px !important;margin-bottom: 5px !important;}';//弹幕输入框功能位置高度
    css += '.bl-button--primary {border-radius: 24px !important;}';//弹幕输入框发送按钮圆角
    css += '.bl-button--primary {background-color: #f69 !important;}';//弹幕输入框发送按钮颜色
    css += '.gift-block-toast {display:none !important;}';//弹幕输入框关闭礼物特效提醒
    css += '.chat-input-ctnr.chat-input-focus {border: 1px solid #E3E5E7 !important;}';//弹幕输入框内框边框颜色
    css += '#chat-control-panel-vm {background-position: center !important;background-size: cover !important;}';//弹幕输入框背景图片位置
    css += '.voice-rtc {display:none !important;}';//弹幕输入框语音上麦
    css += '.input-limit-hint {display:none !important;}';//移除字数显示
    css += '.chat-input.border-box.block-panel .block-hint {display: inline !important; white-space: nowrap !important;}';//移除换行

//直播搜索框清理
    function cleanSearchBox() {
        // 查找搜索框元素
        const searchInput = document.querySelector('input[name="keyword"]');
        if (searchInput) {
            // 删除title和placeholder属性
            searchInput.removeAttribute('title');
            searchInput.removeAttribute('placeholder');
        }
    }

    // 页面加载完成后执行
    window.addEventListener('load', cleanSearchBox);

    // 使用MutationObserver监听DOM变化，以防搜索框是动态加载的
    const observer = new MutationObserver(function(mutations) {
        cleanSearchBox();
    });

    // 开始观察整个body及其子元素的变化
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

//加载CSS脚本
    loadStyle(css)
       function loadStyle(css) {
          var style = document.createElement('style')
          style.type = 'text/css'
          style.rel = 'stylesheet'
          style.appendChild(document.createTextNode(css))
          var head = document.getElementsByTagName('head')[0]
          head.appendChild(style);
       }

})();


