module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transformIgnorePatterns: ['node_modules/(?!(jest-)?react-native|@react-native|expo|@expo|@supabase|zustand)'],
  collectCoverageFrom: ['src/**/*.{ts,tsx}','!src/**/*.d.ts','!src/**/*.stories.{ts,tsx}'],
  coverageDirectory: 'coverage',
  coverageReporters: ['text','lcov','html'],
};
