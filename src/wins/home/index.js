const { BrowserWindow, screen } = require('electron')
const path = require('path')
const Constants = require('../../core/constants')

function createMainWindow (args) {
  // 获取主屏幕的尺寸
  const { width, height } = screen.getPrimaryDisplay().workAreaSize
  const window = new BrowserWindow({
    width: width,
    height: height,
    center: true,
    title: '',
    show: false,
    backgroundColor: '#FFF',
    webPreferences: {
      nativeWindowOpen: true,
      preload: path.join(__dirname, 'preload.js') //preload脚本
    }
  })
  // 页面首次渲染准备ok时，才显示窗口
  window.once('ready-to-show', () => {
    window.show()
  })

  if (Constants.localRender) {
    window.loadFile('www/index.html')
  } else {
    window.loadURL(Constants.baseUrl)
  }

  window.on('close', () => {
    window.webContents.send('window-close')
  })

  return window
}

module.exports = createMainWindow