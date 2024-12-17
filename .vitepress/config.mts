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
      lang: 'zh-cn', // 可选，将作为 `lang` 属性添加到 `html` 标签中
      link: '/zh-cn/', // 默认 /fr/ -- 显示在导航栏翻译菜单上，可以是外部的
    }
  },
  themeConfig: {
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
          { text: 'Q&A', link: '/q&a' }
          { text: 'Privacy policy', link: '/q&a' }
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
