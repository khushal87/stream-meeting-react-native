module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      // Added for Chat SDK
      {
        moduleName: 'react-native-dotenv',
        path: '.env',
      },
    ],
  ],
};
