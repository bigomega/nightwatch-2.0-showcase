module.exports = {
  test_runner: {
    type: 'cucumber',
    options: { feature_path: '*/*.feature' },
  },
  src_folders: ['features/step_definitions'],
  test_settings: {
    default: {
      desiredCapabilities: { browserName: 'chrome' },
      webdriver: { start_process: true },
    },
  },
}
