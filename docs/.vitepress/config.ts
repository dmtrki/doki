import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'ru-RU',
  title: 'Doki',
  base: 'https://dmtrki.github.io/doki/',
  markdown: {
    lineNumbers: true,
    headers: {
      level: [1, 2, 3, 4],
      shouldAllowNested: true,
    }
  },
  themeConfig: {
    sidebar: [

    ]
  }
})
