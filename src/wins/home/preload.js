require('../preload')
const { webFrame, ipcRenderer } = require('electron')

window.addEventListener('DOMContentLoaded', () => {
  console.log('MainWindow dom-render accomplished.')
})

ipcRenderer.on('window-close', () => {
  console.log('MainWindow close.')
})