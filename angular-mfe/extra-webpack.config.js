module.exports = (config, options) => {
  config.output = {
    ...config.output,
    // Xuất dưới dạng System.register để SystemJS import đúng
    libraryTarget: 'system',
    // Tên file duy nhất cho entry chính (không gây conflict)
    filename: 'angular-mf.[name].js',
    chunkFilename: '[name].js',
    uniqueName: 'angular-mf',
    globalObject: 'this',
  };

  // Tắt tách runtime & vendor để có 1 file chính dễ import
  config.optimization = {
    runtimeChunk: false,
    splitChunks: {
      cacheGroups: {
        default: false,
        vendors: false,
      },
    },
  };

  return config;
};
