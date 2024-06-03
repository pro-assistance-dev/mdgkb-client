// const AutoImport = require('unplugin-auto-import/webpack');
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import { fileURLToPath, URL } from 'url';
import { defineConfig, loadEnv } from 'vite';
import svgLoader from 'vite-svg-loader';
import ServicesNames from './src/services/ServicesNames';

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    server: {
      // disableHostCheck: true,
      host: process.env.VITE_APP_HOST,
      port: process.env.VITE_APP_PORT,
      proxy: {
        '/api': {
          ws: true,
          target: process.env.VITE_APP_API_HOST,
          changeOrigin: true,
          secure: false,
        },
      },
    },
    base: '/',
    includeAbsolute: false,
    plugins: [
      vue({
        template: {
          transformAssetUrls: {
            sourse: ['src'],
          },
        },
      }),
      svgLoader({ svgo: false }),
      Components({
        resolvers: [ElementPlusResolver()],
        // dts: true,
        dirs: ['src/components', 'src/services/components', 'src/views'],
      }),
      AutoImport({
        include: [
          '.ts',
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
          /\.md$/, // .md
        ],
        imports: [
          'vue',
          {
            '@/services/Main': ServicesNames,
            '@/classes/Main': ['Doctor'],
          },
        ],
        resolvers: [ElementPlusResolver()],
        dirs: ['srs/classes', 'srs/services/**', 'srs/services'],
        ignoreDts: ['srs/services', 'Message'],
        vueTemplate: true,
        dts: true,
        eslintrc: {
          enabled: true,
        },
      }),
    ],
    resolve: {
      alias: [{ find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) }],
    },
  });
};
