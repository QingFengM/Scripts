// ==UserScript==
// @name         Cinny 汉化脚本
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  将 Cinny 网页客户端汉化为中文，支持动态内容
// @author       汉化者 & Gemini
// @match        https://app.cinny.in/*
// @icon         https://app.cinny.in/assets/favicon-5KspoOBy.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const styleContent = `
    /* 全局调整聊天消息容器的基础布局 */
    ._161nxvec._1qcw1440 {
      width: 100%;
      display: flex;
      flex-direction: row;
      margin: 6px 0; /* 仿微信消息间距 */
      box-sizing: border-box;
    }

    /* ========== 高仿微信气泡样式 ========== */
    /* 通用气泡基础样式（仅文字消息生效，双方统一半透灰） */
    ._161nxvec._1qcw1440 .prxiv41d:not(:has(._1f6snux3)) {
      background-color: rgba(229, 229, 229, 0.8); /* 半透明灰色（微信同款浅灰） */
      padding: 6px 6px; /* 内边距 */
      border-radius: 0; /* 先重置圆角，后续分别设置 */
      max-width: 75%; /* 消息最大宽度 */
      box-sizing: border-box;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05); /* 轻微阴影，仿微信质感 */
      line-height: 1.4; /* 优化文字行高 */
    }

    /* 本地文字消息气泡圆角 */
    ._161nxvec._1qcw1440:has(.prxiv41a ._161nxveu[style*="var(--mx-uc-2)"]) .prxiv41d:not(:has(._1f6snux3)) {
      border-radius: 4px;
    }

    /* 对方文字消息气泡圆角 */
    ._161nxvec._1qcw1440:not(:has(.prxiv41a ._161nxveu[style*="var(--mx-uc-2)"])) .prxiv41d:not(:has(._1f6snux3)) {
      border-radius: 4px;
    }

    /* ========== 消息样式调整 ==========
    /* 强制图片添加圆角（优先级最高） */
    ._161nxvec._1qcw1440 ._1f6snux3 img._189qrd90 {
      border-radius: 4px !important; /* 强制圆角 */
      overflow: hidden; /* 确保圆角生效，防止图片溢出 */
      display: block; /* 消除图片默认间隙 */
    }

    /* 图片容器适配圆角+添加阴影 */
    ._161nxvec._1qcw1440 ._1f6snux3 {
      margin: 0 !important;
      border-radius: 4px !important; /* 容器同步圆角 */
      overflow: hidden; /* 配合图片圆角生效 */
      box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.15) !important; /* 气泡阴影 */
    }

    /* 图片阴影 */
    .prxiv40._1mqalmd1._1mqalmd0.prxiv42.prxiv46._1f6snux0 {
    overflow: inherit;
    }

    /* 代码块阴影去除 */
    .prxiv40._1mqalmd1._1mqalmd0.prxiv41._1m2qi7rc {
    background: none;
    }

    `;

    // 创建style标签并插入到页面头部
    const styleElement = document.createElement('style');
    styleElement.textContent = styleContent;
    document.head.appendChild(styleElement);

    // 1. 静态翻译字典 (用于精确匹配)
    const dictionary = {
        // 主界面
        'Add Reaction': '添加回应',
        'reacted with': ' 回应',
        'View Reactions': '查看回应',
        'is typing...':'正在输入',
        'Reply': '回复',
        'Reply in Thread': '在话题串中回复',
        'Read Receipts': '阅读状态',
        'Copy Link': '复制链接',
        'Pin Message': '置顶消息',
        'Unpin Message': '取消置顶消息',
        'Delete': '删除',
        'Report': '举报',
        'Direct Messages': '私聊',
        'Create Chat': '创建聊天',
        'Chats': '聊天',
        'New Messages': '新消息',
        'Edit Message':'编辑消息',
        'View Source': '查看源代码',
        'Jump to Latest': '跳至新消息',
        'changed room name': '更改房间名称',
        'is following the conversation.': ' 正在关注对话',
        'Connecting...': '连接中...',
        'Connection Lost!': '连接失败！',
        'Connection Lost!Reconnecting...': '连接失败！正在重新连接...',
        'Connecting to server': '正在连接服务器',
        'ConnectionLost': '连接断开！',
        'HeatingUp': '正在加载',
        'More Options': '更多选项',
        'Hide Members': '隐藏成员列表',
        'Pinned Messages': '置顶消息',
        'Members': '成员', // 保留这个，用于单独出现 "Members" 的情况
        'Joined': '已加入',
        'Admin': '管理员',
        'Mark as Read': '标记为已读',
        'Notifications': '通知',
        'Invite': '邀请',
        'Invites': '邀请',
        'Room Settings': '房间设置',
        'Jump to Time': '跳转时间',
        'Leave Room': '离开房间',
        'Send': '发送',
        'Spoiler': '剧透',
        'Send a message...': '发送消息',
        'Search': '搜索',
        'Inbox': '收件箱',
        'Notification Messages': '通知消息',
        'User Settings': '用户设置',
        'Home': '主页',
        'Create Room': '创建房间',
        'Join with Address': '地址加入',
        'Message Search': '消息搜索',
        'Rooms': '房间',
        '(edited)': '(已编辑)',
        'Share': '分享',
        'Message': '私聊',
        'Moderator': '版主',
        'Member': '成员',
        'Manage Powers': '权限管理',
        'Block User': '加入黑名单',
        'Busy': '忙碌',
        'Active': '在线',
        'Disable Markdown': '关闭 Markdown',
        'Enable Markdown': '启用 Markdown',
        'Open': '打开',
        'Today': '今天',
        'Yesterday': '昨天',

        // 设置
        'Settings': '设置',
        'General': '通用',
        'Appearance': '外观',
        'System Theme': '系统主题',
        'Theme': '主题',
        'Light Theme:': '浅色主题：',
        'Dark Theme:': '深色主题：',
        'Use Ctrl + ENTER to send message and ENTER for newline.': '使用Ctrl+回车发送消息，回车换行。',
        'Turn off both typing status and read receipts to keep your activity private.': '关闭输入状态和已读回执，保护你的操作隐私。',
        'Email address attached to your account.': '账户已绑定邮箱地址。',
        'Select User': '选择用户',
        'Prevent receiving messages or invites from user by adding their userId.': '添加用户ID，拒收该用户的消息和邀请。',
        'Block': '屏蔽',
        'System': '系统',
        'Desktop Notifications': '桌面通知',
        'Show desktop notifications when message arrive.': '收到消息时显示桌面通知。',
        'Notification Sound': '通知音效',
        'Play sound when new message arrive.': '收到新消息时播放音效。',
        'Email Notification': '邮件通知',
        'Your account does not have any email attached.': '你的账户未绑定任何邮箱。',
        'All Messages': '所有消息',
        '1-to-1 Chats': '私聊',
        'Notify Loud': '醒目提醒',
        'Notify Silent': '静音提醒',
        'Disable': '关闭',
        '1-to-1 Chats (Encrypted)': '私聊（加密）',
        'Rooms (Encrypted)': '房间（加密）',
        'Special Messages': '特殊消息',
        'Mention @room': '提及@全体',
        'Contains @room': '包含@全体',
        'Keyword Messages': '关键词消息',
        'Badge:': '角标：',
        'Select Keyword': '选择关键词',
        'Set a notification preference for message containing given keyword.': '为包含指定关键词的消息设置通知方式。',
        'Block Messages': '屏蔽消息',
        'This option has been moved to "Account > Block Users" section.': '该选项已移至「账户 > 屏蔽用户」板块。',
        'Encryption Backup': '加密备份',
        'Connected': '已连接',
        'Restore Backup': '恢复备份',
        'Backup Details': '备份详情',
        'Choose between light and dark theme based on system preference.': '根据系统偏好在浅色和黑暗主题之间进行选择',
        'Theme to use when system theme is not enabled.': '未启用系统主题时主题选择',
        'Monochrome Mode': '黑白模式',
        'Page Zoom': '页面比例',
        'Date & Time': '时间 & 日期',
        '24-Hour Time Format': '时间格式 24小时',
        'Date Format': '日期格式',
        'Editor': '编辑',
        'ENTER for Newline': '回车键换行',
        'Markdown Formatting': 'Markdown 格式',
        'Hide Typing & Read Receipts': '隐藏输入阅读状态',
        'Messages': '消息',
        'Message Layout': '消息布局',
        'Modern': '现代',
        'Compact': '紧凑',
        'Bubble': '气泡',
        'Message Spacing': '消息间距',
        'None': '默认',
        'Ultra Small': '超小',
        'Extra Small': '稍小',
        'Small': '小',
        'Normal': '正常',
        'Large': '大',
        'Legacy Username Color': '传统用户名颜色',
        'Hide Membership Change': '隐藏成员变动',
        'Hide Profile Change': '隐藏个人资料变更',
        'Disable Media Auto Load': '禁用媒体自动加载',
        'Url Preview': 'URL预览',
        'Url Preview in Encrypted Room': '在加密房间中启用 URL预览',
        'Show Hidden Events': '显示隐藏的事件',
        'Account': '账户',
        'Profile': '个人资料',
        'Avatar': '头像',
        'Upload': '上传',
        'Remove': '删除',
        'Display Name': '显示名称',
        'Save': '保存',
        'Copy': '复制',
        'Contact Information': '联系信息',
        'Email Address': 'Email 地址',
        'Blocked Users': '黑名单',
        'Devices': '设备',
        'Security': '安全',
        'Device Verification': '设备验证',
        'To verify device identity and grant access to encrypted messages.': '验证设备身份允许访问加密消息',
        'Verified': '已验证',
        'Current': '当前',
        'Connected': '已连接',
        'Logout': '退出账户',
        'Edit': '编辑',
        'Emojis & Stickers': '表情 & 贴纸',
        'Default Pack': '默认贴纸包',
        'Unknown': '未知',
        'View': '查看',
        'Favorite Packs': '收藏贴纸包',
        'Select Pack': '选择贴纸包',
        'Select': '选择',
        'Select All': '全部选择',
        'Unselect All': '取消全部选择',
        'Pick emojis and stickers pack from rooms to use in all rooms.': '选择表情和贴纸包，在聊天中使用。',
        'Room Packs': '房间贴纸包',
        'Close': '关闭',
        'Developer Tools': '开发人员选项',
        'Options': '选项',
        'Enable Developer Tools': '启用开发人员选项',
        'About': '关于',
        'Retry': '重试',
        'Continue': '继续',
        'Lobby': '广场',
        'Changes saved! Apply when ready.': '点击应用更改后生效！',
        'Reset': '重置',
        'Apply Changes': '应用更改',
    };

    // 2. 新增：动态翻译规则 (使用正则表达式)
    // 格式：[ 正则表达式, 替换后的字符串 ]
    // 正则表达式中的 (\d+) 是一个捕获组，它会匹配一个或多个数字。
    // 替换字符串中的 $1 会被第一个捕获组匹配到的内容（也就是那个数字）替换。
    const regexDictionary = [
        [/^(\d+)\s+Members?$/g, '$1 位成员'], // 匹配 "X Member" 或 "X Members"
        [/^(.+?)\s+is typing\.\.\.$/g, '$1 正在输入...'],
        [/^(.+?)\s+joined the room?$/g, '$1 加入房间'],
    ];

    // 定义不应被翻译的元素标签黑名单
    const excludedTags = ['SCRIPT', 'STYLE', 'TEXTAREA', 'INPUT'];

    function translateNode(node) {
        if (node.nodeType === Node.ELEMENT_NODE) {
            // 检查标签名
            if (excludedTags.includes(node.tagName.toUpperCase())) {
                return;
            }
            // 检查是否可编辑
            if (node.isContentEditable) {
                return;
            }

            // ===【终极方案】检查元素是否为消息行 ===
            // 几乎所有消息容器都有 'data-message-id' 属性，用它来判断比用CSS类名更稳定
            if (node.hasAttribute('data-message-id')) {
                return; // 如果是消息行，则跳过此元素及其所有子元素
            }
            // =====================================
        }

        // --- 后续翻译逻辑保持不变 ---
        if (node.nodeType === Node.ELEMENT_NODE) {
            const attributesToTranslate = ['placeholder', 'title', 'aria-label'];
            attributesToTranslate.forEach(attr => {
                const value = node.getAttribute(attr);
                if (value && dictionary[value]) {
                    node.setAttribute(attr, dictionary[value]);
                }
            });
        }

        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
            let text = node.textContent.trim();
            if (dictionary[text]) {
                node.textContent = node.textContent.replace(text, dictionary[text]);
                return;
            }
            for (const [pattern, replacement] of regexDictionary) {
                if (pattern.test(text)) {
                    node.textContent = node.textContent.replace(text, text.replace(pattern, replacement));
                    pattern.lastIndex = 0;
                    return;
                }
            }
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            node.childNodes.forEach(translateNode);
        }
    }

    // MutationObserver 和初始翻译逻辑 (保持不变)
    const observer = new MutationObserver(mutations => {
        for (const mutation of mutations) {
            for (const node of mutation.addedNodes) {
                translateNode(node);
            }
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    window.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => translateNode(document.body), 500);
    });

})();

