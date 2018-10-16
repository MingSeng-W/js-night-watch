

module.exports = {
  'default e2e tests': function (browser) {
    openPage(browser)
    search(browser)
    checkDetail(browser)
    browser.end()
  }
}
function checkDetail(browser){
  for(let i = 1 ; i<=4;i++){
     //查看table的每一项,并点击详情跳转到对应页面
    browser
      .assert.elementPresent('.el-table .el-table__row:nth-child('+i+') .el-button')
      .pause(1000)
      .click('.el-table .el-table__row:nth-child('+i+') .el-button')
      .pause(1000)
      .assert.elementPresent('#detail')
      .back()
  }
}
function openPage(browser){
  const devServer = browser.globals.devServerURL
  browser
    .url('http://localhost:8080/#/list')
    .waitForElementVisible('#app', 4000)
}
function search(browser) {
        //查看是否有搜索框， 并给他赋值
        browser
          .assert.elementPresent('input')
          .setValue('input', '2017')
          //查看是否有搜索框，并且点击
          .assert.elementPresent('#search')
          .pause(1000)
          .click('#search')
          .pause(1000)
          .assert.hidden('#errorModal')
}
