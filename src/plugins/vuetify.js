import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import zhHans from 'vuetify/es5/locale/zh-Hans';
import { preset } from 'vue-cli-plugin-vuetify-preset-reply/preset'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.use(Vuetify);

export default new Vuetify({
  preset,
  // theme: {
  //   themes: {
  //     light: {
  //       primary: '#2196f3',
  //       secondary: '#673ab7',
  //       accent: '#cddc39',
  //       error: '#8bc34a',
  //       warning: '#009688',
  //       info: '#00bcd4',
  //       success: '#4caf50'
  //     }
  //   }
  // },
    lang: {
      locales: { zhHans },
      current: 'zhHans',
    },
    icons: {
      iconfont: 'md',
    },
});
