module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['./setupTests.ts'],
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
      '^.+\\.jsx?$': 'babel-jest',
    },
    transformIgnorePatterns: [
      '/node_modules/(?!axios)',
    ],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    moduleNameMapper: {
      '\\.(css|less)$': 'identity-obj-proxy',
    },
  };
  