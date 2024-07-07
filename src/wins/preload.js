// These scripts executes in a renderer process before its web content begins loading.
// It shares a global Window interface with the renderers.
// All of the Node.js APIs are available here.
// It has the same sandbox as a Chrome extension.
const { version } = require('../core/constants')
const { contextBridge, ipcRenderer, shell } = require('electron')
const os = require('os')
const fs = require('fs')
const path = require('path')

/** windows-1, mac-2, linux-3, other-4 */
function getPlatform() {
  let p = process.platform
  switch (p) {
    case 'win32':
      return 1
    case 'darwin':
      return 2
    case 'linux':
      return 3
    default:
      return 4
  }
}

/** get LAN ip address */
function getLocalIp() {
  var map = '';
  var ifaces = os.networkInterfaces();
  for (var dev in ifaces) {
    if (ifaces[dev][1] && ifaces[dev][1].address && ifaces[dev][1].address.indexOf('192.168') != -1) {
      return ifaces[dev][1].address;
    }
  }
  return map;
}

// You cannot directly attach any variables from the preload script to window 
// because of the contextIsolation default. Instead, use the contextBridge module.
contextBridge.exposeInMainWorld('nativeObj', {
  platform: getPlatform(),
  version: version,
  getLocalIp: getLocalIp,
  openSetting: () => {
    ipcRenderer.invoke('open-window', {
      name: 'setting'
    })
  },
  chooseFile: async (config = {}) => {
    return await ipcRenderer.invoke('choose-file', {
      extensions: config.extensions
    })
  },
  chooseDir: async () => {
    return await ipcRenderer.invoke('choose-dir')
  },
  showInFolder: (path) => {
    shell.showItemInFolder(path)
  },
  getAppPath: () => {
    return ipcRenderer.sendSync('get-app-path')
  },
  getPathUserData: () => {
    return ipcRenderer.sendSync('get-path-user-data')
  },
  pathJoin: (...paths) => {
    return path.join(...paths)
  },
  saveToFile: async (data, filename, ...dirs) => {
    let dir = path.join(...dirs)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    return new Promise((resolve, reject) => {
      var dataBuffer = Buffer.from(data, 'base64')
      let dest = path.join(dir, filename)
      fs.writeFile(dest, dataBuffer, (err) => {
        if (err) reject(err)
        else {
          resolve(true)
          console.log(`已存储文件：${dest}`)
        }
      })
    })
  },
  log: (...args) => {
    ipcRenderer.invoke('log', ...args)
  },
})