const { BrowserWindow } = require('electron')
const path = require('path')

function createSettingWindow (args) {
  const window = new BrowserWindow({
    width: 500,
    height: 600,
    title: '',
    fullscreenable: false,
    backgroundColor: '#FFF',
    minimizable: false,
    maximizable: false,
    webPreferences: {
      nativeWindowOpen: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  if (process.env.localRender == '1') {
    window.loadFile('www/index.html', {
      hash: 'setting'
    })
  } else {
    window.loadURL(process.env.baseUrl + '#setting')
  }

  return window
}

module.exports = createSettingWindow