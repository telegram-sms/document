import { defineConfigWithTheme } from "vitepress";
import { fileURLToPath, URL } from "node:url";
import { ExtendedConfig } from "./theme/types";

// https://vitepress.dev/reference/site-config
export default defineConfigWithTheme<ExtendedConfig>({
    srcDir: "docs",
    title: "Telegram SMS",
    description: "With the power of Telegram SMS, your multi-phone life is much easier than before.",
    head: [['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }]],
    locales: {
        root: {
            label: "English",
            lang: "en",
        },
        es_es: {
            label: "Español",
            lang: "es_es",
            description: "Con la ayuda de Telegram SMS, su vida con múltiples teléfonos es más fácil que nunca.",
            themeConfig: {
                i18nRouting: true,
                nav: [
                    { text: "Inicio", link: "/es_es/" },
                    { text: "Generador de configuración", link: "https://config.telegram-sms.com/" },
                ],
                footer: {
                    message: "Publicado bajo la <a href=\"https://github.com/telegram-sms/telegram-sms/blob/master/LICENSE\">Licencia BSD de 3 cláusulas</a>.",
                    copyright: "Copyright © 2018-2025 Reall System LTD, Telegram es una marca registrada de Telegram Messenger LLP.",
                },
                sidebar: [
                    {
                        text: "Usuarios",
                        items: [
                            { text: "Manual del usuario", link: "/es_es/user-manual" },
                            { text: "Preguntas y respuestas", link: "/es_es/Q&A" },
                            { text: "Política de privacidad", link: "/es_es/privacy-policy" },
                        ],
                    },
                    {
                        text: "Desarrolladores",
                        items: [
                            { text: "Guía de desarrollo", link: "/es_es/develop/manual" },
                        ],
                    },
                ],
                footerNav: [
                    {
                        title: "Proyectos",
                        items: [
                            { text: "Telegram SMS", link: "https://github.com/telegram-sms/telegram-sms" },
                            { text: "Telegram SMS Compat", link: "https://github.com/telegram-sms/telegram-sms-compat" },
                            { text: "Telegram Remote Control", link: "https://github.com/telegram-sms/telegram-rc" },
                        ],
                    },
                    {
                        title: "Herramientas en línea",
                        items: [
                            { text: "Manual del usuario", link: "/es/user-manual" },
                            { text: "Generador de archivos de configuración", link: "https://qrcode.telegram-sms.com/" },
                        ],
                    },
                    {
                        title: "Comunidad",
                        items: [
                            { text: "GitHub", link: "https://github.com/telegram-sms" },
                            { text: "Canal de Telegram", link: "https://t.me/tg_sms_changelog" },
                            { text: "Foro", link: "https://reall.uk" },
                        ],
                    },
                ],
            },
        },
        ru_ru: {
            label: "Русский",
            lang: "ru_ru",
            description: "С помощью Telegram SMS ваша жизнь с несколькими телефонами станет проще, чем когда-либо.",
            themeConfig: {
                i18nRouting: true,
                nav: [
                    { text: "Главная", link: "/ru_ru/" },
                    { text: "Генератор конфигурации", link: "https://config.telegram-sms.com/" },
                ],
                footer: {
                    message: "Опубликовано под <a href=\"https://github.com/telegram-sms/telegram-sms/blob/master/LICENSE\">лицензией BSD с 3 пунктами</a>.",
                    copyright: "Copyright © 2018-2025 Reall System LTD, Telegram является зарегистрированной торговой маркой Telegram Messenger LLP.",
                },
                sidebar: [
                    {
                        text: "Пользователи",
                        items: [
                            { text: "Руководство пользователя", link: "/ru_ru/user-manual" },
                            { text: "Вопросы и ответы", link: "/ru_ru/Q&A" },
                            { text: "Политика конфиденциальности", link: "/ru_ru/privacy-policy" },
                        ],
                    },
                    {
                        text: "Разработчики",
                        items: [
                            { text: "Руководство по разработке", link: "/ru_ru/develop/manual" },
                        ],
                    },
                ],
                footerNav: [
                    {
                        title: "Проекты",
                        items: [
                            { text: "Telegram SMS", link: "https://github.com/telegram-sms/telegram-sms" },
                            { text: "Telegram SMS Compat", link: "https://github.com/telegram-sms/telegram-sms-compat" },
                            { text: "Telegram Remote Control", link: "https://github.com/telegram-sms/telegram-rc" },
                        ],
                    },
                    {
                        title: "Онлайн-инструменты",
                        items: [
                            { text: "Руководство пользователя", link: "/ru_ru/user-manual" },
                            { text: "Генератор конфигурационных файлов", link: "https://qrcode.telegram-sms.com/" },
                        ],
                    },
                    {
                        title: "Сообщество",
                        items: [
                            { text: "GitHub", link: "https://github.com/telegram-sms" },
                            { text: "Канал Telegram", link: "https://t.me/tg_sms_changelog" },
                            { text: "Форум", link: "https://reall.uk" },
                        ],
                    },
                ],
            },
        },
        ja_jp: {
            label: "日本語",
            lang: "ja_jp",
            description: "Telegram SMS の力を借りて、あなたのマルチスマホ生活がこれまで以上に楽になります。",
            themeConfig: {
                i18nRouting: true,
                nav: [
                    { text: "ホーム", link: "/ja_jp/" },
                    { text: "設定ジェネレーター", link: "https://config.telegram-sms.com/" },
                ],
                footer: {
                    message: " <a href=\"https://github.com/telegram-sms/telegram-sms/blob/master/LICENSE\">BSD 3-Clause License</a> の下でリリースされています。",
                    copyright: "Copyright 2018-2025 Reall System LTD, TelegramはTelegram Messenger LLPの商標です。",
                },
                sidebar: [
                    {
                        text: "ユーザー",
                        items: [
                            { text: "ユーザーマニュアル", link: "/ja_jp/user-manual" },
                            { text: "Q&A", link: "/ja_jp/Q&A" },
                            { text: "個人情報保護方針", link: "/ja_jp/privacy-policy" },
                        ],
                    },
                    {
                        text: "開発者",
                        items: [
                            { text: "開発ガイド", link: "/ja_jp/develop/manual" },
                        ],
                    },
                ],
                footerNav: [
                    {
                        title: "プロジェクト",
                        items: [
                            { text: "Telegram SMS", link: "https://github.com/telegram-sms/telegram-sms" },
                            { text: "Telegram SMS Compat", link: "https://github.com/telegram-sms/telegram-sms-compat" },
                            { text: "Telegram RC", link: "https://github.com/telegram-sms/telegram-rc" },
                        ],
                    },
                    {
                        title: "ツール",
                        items: [
                            { text: "ユーザーマニュアル", link: "/ja_jp/user-manual" },
                            { text: "設定ジェネレーター", link: "https://qrcode.telegram-sms.com/" },
                        ],
                    },
                    {
                        title: "コミュニティ",
                        items: [
                            { text: "GitHub", link: "https://github.com/telegram-sms" },
                            { text: "Telegram チャンネル", link: "https://t.me/tg_sms_changelog_eng" },
                            { text: "フォーラム", link: "https://reall.uk" },
                        ],
                    },
                ],
            },
        },
        zh_cn: {
            label: "简体中文",
            lang: "zh_cn",
            description: "借助 Telegram SMS 的力量，您的多手机生活比以往任何时候都更加轻松。",
            themeConfig: {
                socialLinks: [
                    { icon: "github", link: "https://github.com/telegram-sms/telegram-sms" },
                    { icon: "telegram", link: "https://t.me/tg_sms_changelog" },
                ],
                i18nRouting: true,
                nav: [
                    { text: "主页", link: "/zh_cn/" },
                    { text: "配置生成", link: "https://config.telegram-sms.com/" },
                ],
                footer: {
                    message: "在 <a href=\"https://github.com/telegram-sms/telegram-sms/blob/master/LICENSE\">BSD 3-Clause License</a> 许可下发布。",
                    copyright: "版权所有 2018-2025 Reall System LTD，Telegram 是 Telegram Messenger LLP 的商标。",
                },
                sidebar: [
                    {
                        text: "个人用户",
                        items: [
                            { text: "用户手册", link: "/zh_cn/user-manual" },
                            { text: "问与答", link: "/zh_cn/Q&A" },
                            { text: "隐私政策", link: "/zh_cn/privacy-policy" },
                        ],
                    },
                    {
                        text: "开发者",
                        items: [
                            { text: "开发指南", link: "/zh_cn/develop/manual" },
                        ],
                    },
                ],
                footerNav: [
                    {
                        title: "项目",
                        items: [
                            { text: "Telegram SMS", link: "https://github.com/telegram-sms/telegram-sms" },
                            { text: "Telegram SMS Compat", link: "https://github.com/telegram-sms/telegram-sms-compat" },
                            { text: "Telegram Remote Control", link: "https://github.com/telegram-sms/telegram-rc" },
                        ],
                    },
                    {
                        title: "在线工具",
                        items: [
                            { text: "用户手册", link: "/zh_cn/user-manual" },
                            { text: "配置生成", link: "https://qrcode.telegram-sms.com/" },
                        ],
                    },
                    {
                        title: "社区",
                        items: [
                            { text: "GitHub", link: "https://github.com/telegram-sms" },
                            { text: "Telegram 频道", link: "https://t.me/tg_sms_changelog" },
                            { text: "论坛", link: "https://reall.uk" },
                        ],
                    },
                ],
            },
        },
        zh_tw: {
            label: "繁體中文",
            lang: "zh_tw",
            description: "借助 Telegram SMS 的力量，您的多手機生活比以往任何時候都更加輕鬆。",
            themeConfig: {
                socialLinks: [
                    { icon: "github", link: "https://github.com/telegram-sms/telegram-sms" },
                    { icon: "telegram", link: "https://t.me/tg_sms_changelog" },
                ],
                i18nRouting: true,
                nav: [
                    { text: "主頁", link: "/zh_tw/" },
                    { text: "配置生成", link: "https://config.telegram-sms.com/" },
                ],
                footer: {
                    message: "在 <a href=\"https://github.com/telegram-sms/telegram-sms/blob/master/LICENSE\">BSD 3-Clause License</a> 許可下發布。",
                    copyright: "版權所有 2018-2025 Reall System LTD，Telegram 是 Telegram Messenger LLP 的商標。",
                },
                sidebar: [
                    {
                        text: "個人用戶",
                        items: [
                            { text: "用戶手冊", link: "/zh_tw/user-manual" },
                            { text: "問與答", link: "/zh_tw/Q&A" },
                            { text: "隱私政策", link: "/zh_tw/privacy-policy" },
                        ],
                    },
                    {
                        text: "開發者",
                        items: [
                            { text: "開發指南", link: "/zh_tw/develop/manual" },
                        ],
                    },
                ],
                footerNav: [
                    {
                        title: "專案",
                        items: [
                            { text: "Telegram SMS", link: "https://github.com/telegram-sms/telegram-sms" },
                            { text: "Telegram SMS Compat", link: "https://github.com/telegram-sms/telegram-sms-compat" },
                            { text: "Telegram Remote Control", link: "https://github.com/telegram-sms/telegram-rc" },
                        ],
                    },
                    {
                        title: "線上工具",
                        items: [
                            { text: "用戶手冊", link: "/zh_tw/user-manual" },
                            { text: "配置檔案產生器", link: "https://qrcode.telegram-sms.com/" },
                        ],
                    },
                    {
                        title: "社群",
                        items: [
                            { text: "GitHub", link: "https://github.com/telegram-sms" },
                            { text: "Telegram 頻道", link: "https://t.me/tg_sms_changelog" },
                            { text: "論壇", link: "https://reall.uk" },
                        ],
                    },
                ],
            },
        },
    },
    themeConfig: {
        i18nRouting: true,
        search: {
            provider: "local",
        },
        logo: "/logo.svg",
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: "Home", link: "/" },
            { text: "Config Generator", link: "https://config.telegram-sms.com/" },
        ],
        footer: {
            message: "Released under the <a href=\"https://github.com/telegram-sms/telegram-sms/blob/master/LICENSE\">BSD 3-Clause License</a>.",
            copyright: "Copyright 2018-2025 Reall System LTD, Telegram is a trademark of Telegram Messenger LLP.",
        },
        sidebar: [
            {
                text: "User",
                items: [
                    { text: "User manual", link: "/user-manual" },
                    { text: "Q&A", link: "/Q&A" },
                    { text: "Privacy policy", link: "/privacy-policy" },
                ],
            },
            {
                text: "Developer",
                items: [
                    { text: "Development Manual", link: "/develop/manual" },
                ],
            },
        ],
        socialLinks: [
            { icon: "github", link: "https://github.com/telegram-sms/telegram-sms" },
            { icon: "telegram", link: "https://t.me/tg_sms_changelog_eng" },
        ],
        footerNav: [
            {
                title: "Projects",
                items: [
                    { text: "Telegram SMS", link: "https://github.com/telegram-sms/telegram-sms" },
                    { text: "Telegram SMS Compat", link: "https://github.com/telegram-sms/telegram-sms-compat" },
                    { text: "Telegram Remote Control", link: "https://github.com/telegram-sms/telegram-rc" },
                ],
            },
            {
                title: "Tools",
                items: [
                    { text: "Documentation", link: "/user-manual" },
                    { text: "Config Generator", link: "https://qrcode.telegram-sms.com/" },
                ],
            },
            {
                title: "Community",
                items: [
                    { text: "GitHub", link: "https://github.com/telegram-sms" },
                    { text: "Telegram Channel", link: "https://t.me/tg_sms_changelog_eng" },
                    { text: "Forum", link: "https://reall.uk" },
                ],
            },
        ],
    },
    vite: {
        resolve: {
            alias: [
                {
                    find: /^.*\/VPFooter\.vue$/,
                    replacement: fileURLToPath(
                        new URL("./components/CustomFooter.vue", import.meta.url),
                    ),
                },
            ],
        },
    },
});
