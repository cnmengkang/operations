// vite.config.ts
import { defineConfig } from "file:///D:/Web/mdOperations/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/Web/mdOperations/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import Components from "file:///D:/Web/mdOperations/node_modules/unplugin-vue-components/dist/vite.js";
import { AntDesignVueResolver } from "file:///D:/Web/mdOperations/node_modules/unplugin-vue-components/dist/resolvers.js";
import postCssPxToRem from "file:///D:/Web/mdOperations/node_modules/postcss-pxtorem/index.js";
import path from "path";
var __vite_injected_original_dirname = "D:\\Web\\mdOperations";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false
        })
      ]
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "src")
    }
  },
  server: {
    open: true,
    cors: false,
    hmr: true
    // 热更新
  },
  css: {
    preprocessorOptions: {
      less: {}
    },
    postcss: {
      plugins: [
        postCssPxToRem({
          rootValue: 16,
          // 1rem的大小
          propList: ["!min-height", "!min-width", "*"],
          // 需要转换的属性，最小高度和最小宽度不进行转换
          unitPrecision: 5,
          //保留rem小数点多少位
          selectorBlackList: ["ignore"],
          //则是一个对css选择器进行过滤的数组，比如你设置为['fs']，那例如fs-xl类名，里面有关px的样式将不被转换，这里也支持正则写法。
          mediaQuery: false,
          //媒体查询( @media screen 之类的)中不生效
          minPixelValue: 1
          //px小于12的不会被转换
        })
      ]
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxXZWJcXFxcbWRPcGVyYXRpb25zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxXZWJcXFxcbWRPcGVyYXRpb25zXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9XZWIvbWRPcGVyYXRpb25zL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXHJcbmltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnO1xyXG5pbXBvcnQgeyBBbnREZXNpZ25WdWVSZXNvbHZlciB9IGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVycyc7XHJcbmltcG9ydCBwb3N0Q3NzUHhUb1JlbSBmcm9tICdwb3N0Y3NzLXB4dG9yZW0nO1xyXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcGx1Z2luczogW1xyXG4gICAgdnVlKCksXHJcbiAgICBDb21wb25lbnRzKHtcclxuICAgICAgcmVzb2x2ZXJzOiBbXHJcbiAgICAgICAgQW50RGVzaWduVnVlUmVzb2x2ZXIoe1xyXG4gICAgICAgICAgaW1wb3J0U3R5bGU6IGZhbHNlLFxyXG4gICAgICAgIH0pLFxyXG4gICAgICBdLFxyXG4gICAgfSksXSxcclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczoge1xyXG4gICAgICAnQCc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMnKVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgc2VydmVyOiB7XHJcbiAgICBvcGVuOiB0cnVlLFxyXG4gICAgY29yczogZmFsc2UsXHJcbiAgICBobXI6IHRydWUsIC8vIFx1NzBFRFx1NjZGNFx1NjVCMFxyXG4gIH0sXHJcbiAgY3NzOiB7XHJcbiAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XHJcbiAgICAgIGxlc3M6IHt9IC8vIGxlc3NcdTc2RjhcdTUxNzNcdTkxNERcdTdGNkVcclxuICAgIH0sXHJcbiAgICBwb3N0Y3NzOiB7XHJcbiAgICAgIHBsdWdpbnM6IFtcclxuICAgICAgICBwb3N0Q3NzUHhUb1JlbSh7XHJcbiAgICAgICAgICByb290VmFsdWU6IDE2LCAvLyAxcmVtXHU3Njg0XHU1OTI3XHU1QzBGXHJcbiAgICAgICAgICBwcm9wTGlzdDogWychbWluLWhlaWdodCcsICchbWluLXdpZHRoJywgJyonXSwgLy8gXHU5NzAwXHU4OTgxXHU4RjZDXHU2MzYyXHU3Njg0XHU1QzVFXHU2MDI3XHVGRjBDXHU2NzAwXHU1QzBGXHU5QUQ4XHU1RUE2XHU1NDhDXHU2NzAwXHU1QzBGXHU1QkJEXHU1RUE2XHU0RTBEXHU4RkRCXHU4ODRDXHU4RjZDXHU2MzYyXHJcbiAgICAgICAgICB1bml0UHJlY2lzaW9uOiA1LCAvL1x1NEZERFx1NzU1OXJlbVx1NUMwRlx1NjU3MFx1NzBCOVx1NTkxQVx1NUMxMVx1NEY0RFxyXG4gICAgICAgICAgc2VsZWN0b3JCbGFja0xpc3Q6IFsnaWdub3JlJ10sIC8vXHU1MjE5XHU2NjJGXHU0RTAwXHU0RTJBXHU1QkY5Y3NzXHU5MDA5XHU2MkU5XHU1NjY4XHU4RkRCXHU4ODRDXHU4RkM3XHU2RUU0XHU3Njg0XHU2NTcwXHU3RUM0XHVGRjBDXHU2QkQ0XHU1OTgyXHU0RjYwXHU4QkJFXHU3RjZFXHU0RTNBWydmcyddXHVGRjBDXHU5MEEzXHU0RjhCXHU1OTgyZnMteGxcdTdDN0JcdTU0MERcdUZGMENcdTkxQ0NcdTk3NjJcdTY3MDlcdTUxNzNweFx1NzY4NFx1NjgzN1x1NUYwRlx1NUMwNlx1NEUwRFx1ODhBQlx1OEY2Q1x1NjM2Mlx1RkYwQ1x1OEZEOVx1OTFDQ1x1NEU1Rlx1NjUyRlx1NjMwMVx1NkI2M1x1NTIxOVx1NTE5OVx1NkNENVx1MzAwMlxyXG4gICAgICAgICAgbWVkaWFRdWVyeTogZmFsc2UsIC8vXHU1QTkyXHU0RjUzXHU2N0U1XHU4QkUyKCBAbWVkaWEgc2NyZWVuIFx1NEU0Qlx1N0M3Qlx1NzY4NClcdTRFMkRcdTRFMERcdTc1MUZcdTY1NDhcclxuICAgICAgICAgIG1pblBpeGVsVmFsdWU6IDEgLy9weFx1NUMwRlx1NEU4RTEyXHU3Njg0XHU0RTBEXHU0RjFBXHU4OEFCXHU4RjZDXHU2MzYyXHJcbiAgICAgICAgfSlcclxuICAgICAgXVxyXG4gICAgfVxyXG4gIH0sXHJcbn0pXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBaVAsU0FBUyxvQkFBb0I7QUFDOVEsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sZ0JBQWdCO0FBQ3ZCLFNBQVMsNEJBQTRCO0FBQ3JDLE9BQU8sb0JBQW9CO0FBQzNCLE9BQU8sVUFBVTtBQUxqQixJQUFNLG1DQUFtQztBQU96QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxJQUFJO0FBQUEsSUFDSixXQUFXO0FBQUEsTUFDVCxXQUFXO0FBQUEsUUFDVCxxQkFBcUI7QUFBQSxVQUNuQixhQUFhO0FBQUEsUUFDZixDQUFDO0FBQUEsTUFDSDtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQUU7QUFBQSxFQUNMLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFXLEtBQUs7QUFBQSxJQUNwQztBQUFBLEVBQ0Y7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLEtBQUs7QUFBQTtBQUFBLEVBQ1A7QUFBQSxFQUNBLEtBQUs7QUFBQSxJQUNILHFCQUFxQjtBQUFBLE1BQ25CLE1BQU0sQ0FBQztBQUFBO0FBQUEsSUFDVDtBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ1AsU0FBUztBQUFBLFFBQ1AsZUFBZTtBQUFBLFVBQ2IsV0FBVztBQUFBO0FBQUEsVUFDWCxVQUFVLENBQUMsZUFBZSxjQUFjLEdBQUc7QUFBQTtBQUFBLFVBQzNDLGVBQWU7QUFBQTtBQUFBLFVBQ2YsbUJBQW1CLENBQUMsUUFBUTtBQUFBO0FBQUEsVUFDNUIsWUFBWTtBQUFBO0FBQUEsVUFDWixlQUFlO0FBQUE7QUFBQSxRQUNqQixDQUFDO0FBQUEsTUFDSDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
