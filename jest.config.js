const nextJest = require('next/jest');

/** @type {import('jest').Config} */
const createJestConfig = nextJest({
  dir: './',
});

const config = {
  rootDir: './',
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Add this line
  moduleNameMapper: {
    
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/utils/(.*)$': '<rootDir>/src/utlis/$1',
    '^@/models/(.*)$': '<rootDir>/src/models/$1',
    '^@/api/(.*)$': '<rootDir>/src/app/api/$1',
  },
};


module.exports = createJestConfig(config);