module.exports = {
  lintOnSave: false,
  devServer: {
    disableHostCheck: true,
    host: 'localhost',
    proxy: process.env.DEV_BACKEND_URL,
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
