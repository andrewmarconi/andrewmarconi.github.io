import { defineConfig } from 'vitepress'
import baseConfig from 'vitepress-carbon/config'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  extends: baseConfig,
  themeConfig: {
    // ...
  },
  lang: 'en-US',
  title: 'Andrew Marconi on Github',
  description: 'Most technology asks you to trust it. I help brands build the kind that earns it.'
})