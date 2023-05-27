module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        alias: {
          '@pages': './src/pages',
          '@utils': './src/utils',
          '@navigation': './src/navigation',
          '@context': './src/context',
          '@components': './src/components',
        },
      },
    ],
  ],
};
