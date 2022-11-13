/** @type {import('jest').Config} */

const config = {
  vervose: true,
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  transformIgnorePatterns: ["/node_modules/(?!(react-bootstrap-tagsinput))"],
};

module.exports = config;
