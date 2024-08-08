console.log('Running jest.config.js');
// jest.config.js
module.exports = {
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(axios|@bundled-es-modules)/)' // Add other packages if needed
  ],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  }
  // Other Jest configurations...
};