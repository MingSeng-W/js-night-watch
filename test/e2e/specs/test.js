// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'default e2e tests': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url('http://localhost:8081/#/list')
      .waitForElementVisible('#app', 5000)
      //查看是否有搜索框， 并给他赋值
      .assert.elementPresent('input')
      .setValue('input', 'sfsfsf')
      //查看是否有搜索框，并且点击
      .assert.elementPresent('#search')
      .pause(1000)
      .click('#search')
      .pause(1000)
      .assert.hidden('#errorModal')
      //查看table的第一项
      .end()
  }
}
