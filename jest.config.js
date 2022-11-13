/** @type {import('jest').Config} */

const config = {
  vervose: true,
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};

module.exports = config;
