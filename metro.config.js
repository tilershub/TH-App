const { getDefaultConfig } = require('expo/metro-config');
const config = getDefaultConfig(__dirname);
config.resolver.alias = {
  '@': './src',
  '@/components': './src/components',
  '@/screens': './src/screens',
  '@/services': './src/services',
  '@/stores': './src/stores',
  '@/types': './src/types',
  '@/utils': './src/utils',
  '@/hooks': './src/hooks',
};
module.exports = config;
