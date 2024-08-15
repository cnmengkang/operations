import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import postCssPxToRem from 'postcss-pxtorem';
import path from 'path';

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false,
        }),
      ],
    }),],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    port:9999,
    open: true,
    cors: false,
    hmr: true, // 热更新
  },
  css: {
    postcss: {
      plugins: [
        postCssPxToRem({
          rootValue: 16, // 1rem的大小
          propList: ['!min-height', '!min-width', '*'], // 需要转换的属性，最小高度和最小宽度不进行转换
          unitPrecision: 5, //保留rem小数点多少位
          selectorBlackList: ['ignore'], //则是一个对css选择器进行过滤的数组，比如你设置为['fs']，那例如fs-xl类名，里面有关px的样式将不被转换，这里也支持正则写法。
          mediaQuery: false, //媒体查询( @media screen 之类的)中不生效
          minPixelValue: 1 //px小于12的不会被转换
        })
      ]
    }
  },
})
