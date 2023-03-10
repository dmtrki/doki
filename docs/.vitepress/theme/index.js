import DefaultTheme from 'vitepress/theme'
import Example from "../../components/Example.vue";
import Adm from "../../components/Adm.vue";
import Def from "../../components/Def.vue";
import Grid from "../../components/Grid.vue";
import './custom.css'

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx)
    ctx.app.component('Example', Example)
    ctx.app.component('Adm', Adm)
    ctx.app.component('Def', Def)
    ctx.app.component('Grid', Grid)
  }
}