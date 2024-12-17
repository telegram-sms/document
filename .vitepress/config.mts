import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Telegram SMS User manual",
  description: "This is the user guide page for telegram sms.",
  locales: {
    root: {
      label: 'English',
      lang: 'en',
      link: '/en-gb/'
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
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
    footer: {
      message: 'Telegram is a trademark of Telegram Messenger LLP.',
      copyright: 'Copyright © 2018-2024 Reall System LTD'
    }
  }
})
