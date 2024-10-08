// jest.config.js
module.exports = {
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(axios|@bundled-es-modules)/)' // Add other packages if needed
  ],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
  setupFiles: ['./jest.polyfills.js'],
  // Other Jest configurations...
};