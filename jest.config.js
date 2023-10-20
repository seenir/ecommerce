module.exports = {
    testEnvironment: 'node',
    moduleFileExtensions: ['js', 'vue'],
    transform: {
      '^.+\\.js$': 'babel-jest',
      '^.+\\.vue$': 'vue-jest',
    },
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/$1',
    },
  };
  