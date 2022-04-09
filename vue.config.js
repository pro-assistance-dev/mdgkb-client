module.exports = {
  lintOnSave: false,
  outputDir: './test',
  devServer: {
    disableHostCheck: true,
    host: process.env.VUE_APP_HOST,
    port: process.env.VUE_APP_PORT,
    proxy: {
      '/api': {
        target: process.env.VUE_APP_API_HOST,
      },
    },
  },
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg');

    svgRule.uses.clear();

    svgRule
      .use('vue-loader')
      .loader('vue-loader-v16') // or `vue-loader-v16` if you are using a preview support of Vue 3 in Vue CLI
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
      .options({
        svgo: {
          plugins: [{ cleanupIDs: false }, { collapseGroups: false }, { removeEmptyContainers: false }],
        },
      });
  },
};
