import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: 'docs',
  title: "Telegram SMS",
  description: "With the power of Telegram SMS, your multi-phone life is much easier than before.",
  locales: {
    root: {
      label: 'English',
      lang: 'en',
    },
    ja_jp: {
      label: '日本語',
      lang: 'ja_jp',
      description: "Telegram SMS の力を借りて、あなたのマルチスマホ生活がこれまで以上に楽になります。",
      themeConfig: {
        i18nRouting: true,
        nav: [
          { text: 'ホーム', link: '/ja_jp' },
          { text: '設定ジェネレーター', link: 'https://qrcode.telegram-sms.com/' }
        ],
        footer: {
          message: ' <a href="https://github.com/telegram-sms/telegram-sms/blob/master/LICENSE">BSD 3-Clause License</a> の下でリリースされています。',
          copyright: 'Copyright © 2018-2024 Reall System LTD, TelegramはTelegram Messenger LLPの商標です。'
        },
        sidebar: [
          {
            text: 'ようこそ',
            items: [
              { text: 'ユーザーマニュアル', link: '/ja_jp/user-manual' },
              { text: 'Q&A', link: '/ja_jp/q&a' },
              { text: '個人情報保護方針', link: '/ja_jp/privacy-policy' }
            ]
          }
        ]
      }
    },
    zh_cn: {
      label: '简体中文',
      lang: 'zh_cn',
      description: "借助 Telegram SMS 的力量，您的多手机生活比以往任何时候都更加轻松。",
      themeConfig: {
        i18nRouting: true,
        nav: [
          { text: '主页', link: '/' },
          { text: '配置生成', link: 'https://qrcode.telegram-sms.com/' }
        ],
        footer: {
          message: '在 <a href="https://github.com/telegram-sms/telegram-sms/blob/master/LICENSE">BSD 3-Clause License</a> 许可下发布。',
          copyright: '版权所有 © 2018-2024 Reall System LTD，Telegram 是 Telegram Messenger LLP 的商标。'
        },
        sidebar: [
          {
            text: '欢迎',
            items: [
              { text: '用户手册', link: '/zh_cn/user-manual' },
              { text: '问与答', link: '/zh_cn/q&a' },
              { text: '隐私政策', link: '/zh_cn/privacy-policy' }
            ]
          }
        ]
      }
    },
    zh_tw: {
      label: '繁體中文',
      lang: 'zh_tw',
      description: "借助 Telegram SMS 的力量，您的多手機生活比以往任何時候都更加輕鬆。",
      themeConfig: {
        i18nRouting: true,
        nav: [
          { text: '主頁', link: '/' },
          { text: '配置生成', link: 'https://qrcode.telegram-sms.com/' }
        ],
        footer: {
          message: '在 <a href="https://github.com/telegram-sms/telegram-sms/blob/master/LICENSE">BSD 3-Clause License</a> 許可下發布。',
          copyright: '版權所有 © 2018-2024 Reall System LTD，Telegram 是 Telegram Messenger LLP 的商標。'
        },
        sidebar: [
          {
            text: '歡迎',
            items: [
              { text: '用戶手冊', link: '/zh_tw/user-manual' },
              { text: '問與答', link: '/zh_tw/q&a' },
              { text: '隱私政策', link: '/zh_tw/privacy-policy' }
            ]
          }
        ]
      }
    }
  },
  themeConfig: {
    i18nRouting: true,
    search: {
      provider: 'local'
    },
    logo: '/logo.svg',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Config Generator', link: 'https://qrcode.telegram-sms.com/' }
    ],

    footer: {
      message: 'Released under the <a href="https://github.com/telegram-sms/telegram-sms/blob/master/LICENSE">BSD 3-Clause License</a>.',
      copyright: 'Copyright © 2018-2024 Reall System LTD, Telegram is a trademark of Telegram Messenger LLP.'
    },
    sidebar: [
      {
        text: 'User',
        items: [
          { text: 'User manual', link: '/user-manual' },
          { text: 'Q&A', link: '/q&a' },
          { text: 'Privacy policy', link: '/privacy-policy' }
        ]
      },
      {
        text: 'Developer',
        items: [
          { text: 'Development Manual', link: '/develop/manual' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/telegram-sms/telegram-sms' }
    ]
  }
})
