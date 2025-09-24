const path = require('path');

module.exports = {
  // Đây là thư mục build, thay vì sửa config.output.path
  outputDir: path.resolve(__dirname, 'dist'),

  configureWebpack: config => {
    return {
      entry: {
        app: path.resolve(__dirname, 'src/main.single-spa.js'),
      },
      output: {
        filename: 'vue-mf.js',
        libraryTarget: 'umd',    // UMD ổn định với single-spa-vue
        library: 'VueMF', // tên của module, có thể đặt tùy ý
        globalObject: 'this',    // để chạy trên SystemJS
        // **KHÔNG thêm path ở đây**
      },
      optimization: {
        runtimeChunk: false,
        splitChunks: {
          cacheGroups: {
            default: false,
            vendors: false,
          },
        },
      },
    };
  },

  chainWebpack: config => config.optimization.delete('splitChunks'),

  devServer: {
    port: 64125, // port của microfrontend
    headers: {
      'Access-Control-Allow-Origin': '*', // cho phép mọi domain
    },
  },

  lintOnSave: false,
  filenameHashing: false,
};
