module.exports = {
  lintOnSave: false,
  devServer: {
    host: 'localhost',
    proxy: process.env.DEV_BACKEND_URL,
  },
}
