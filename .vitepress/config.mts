import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Telegram SMS",
  description: "With the power of Telegram SMS, your multi-phone life is much easier than before.",
  locales: {
    root: {
      label: 'English',
      lang: 'en',
    },
    zh_cn: {
      label: '简体中文',
      lang: 'zh_cn',
      description: "借助 Telegram SMS 的力量，您的多手机生活比以往任何时候都更加轻松。",
      themeConfig: {
        i18nRouting: true,
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
    logo: 'https://telegram-sms.com/assets/fay-2x.png',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Qrcode', link: 'https://qrcode.telegram-sms.com/' }
    ],

    sidebar: [
      {
        text: 'Welcome',
        items: [
          { text: 'User manual', link: '/user-manual' },
          { text: 'Q&A', link: '/q&a' },
          { text: 'Privacy policy', link: '/privacy_policy' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/telegram-sms/telegram-sms' }
    ],
    footer: {
      message: 'Released under the <a href="https://github.com/telegram-sms/telegram-sms/blob/master/LICENSE">BSD 3-Clause License</a>.',
      copyright: 'Copyright © 2018-2024 Reall System LTD, Telegram is a trademark of Telegram Messenger LLP.'
    }
  }
})
