module.exports = {
  lintOnSave: false,
  devServer: {
    disableHostCheck: true,
    host: process.env.VUE_APP_HOST,
    proxy: process.env.VUE_APP_API_HOST,
    // proxy: {
    //   '/': {
    //     target: process.env.VUE_APP_API_V1,
    //     // pathRewrite: {
    //     //   '/api/v1': '',
    //     // },
    //     // changeOrigin: true
    //   },
    // },
    port: process.env.VUE_APP_PORT,
  },
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg');

    svgRule.uses.clear();

    svgRule
      .use('vue-loader')
      .loader('vue-loader-v16') // or `vue-loader-v16` if you are using a preview support of Vue 3 in Vue CLI
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader');
  },
};
