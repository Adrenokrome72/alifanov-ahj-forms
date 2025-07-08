module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./test/setup.js'],
  testTimeout: 10000,
  moduleNameMapper: {
    '\\.(css)$': 'identity-obj-proxy',
  },
};