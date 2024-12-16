const path = require('path');

module.exports = function override(config) {
  // Add alias for shared package
  config.resolve.alias['@dsh/shared'] = path.resolve(__dirname, '../shared/src');

  // Modify webpack to handle shared package imports
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    include: [path.resolve(__dirname, 'src'), path.resolve(__dirname, '../shared/src')],
    use: [
      {
        loader: require.resolve('babel-loader'),
        options: {
          presets: ['@babel/preset-typescript'],
        },
      },
    ],
  });

  return config;
};
