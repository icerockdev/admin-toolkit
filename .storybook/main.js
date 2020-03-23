const path = require('path');

module.exports = {
  stories: ['../src/stories/*.stories.tsx'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/preset-create-react-app',
  ],
  webpackFinal: config => {
    config.resolve = {
      ...(config.resolve || {}),
      extensions: [
        ...((config.resolve && config.resolve.extensions) || []),
        '.ts',
        '.tsx',
        '.js',
      ],
      alias: {
        ...((config.resolve && config.resolve.alias) || {}),
        '~': path.resolve(__dirname, '../src'),
        '@assets': path.resolve(__dirname, '../public'),
      },
    };

    return config;
  },
};
