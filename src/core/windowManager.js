const { BrowserWindow } = require('electron')
const windowManifest = require('../WindowManifest')

/** 
 * 这个类负责管理所有应用窗口。
 * 要打开应用窗口需要在WindowManifest目录下注册。
 */
class WindowManager {
  constructor() {
    this._openedWindowMap = {} //{key: name, value: window id array}
  }

  /** 
   * 打开一个窗口 
   * @param config 配置：{name,args}
   */
  startWindow(config) {
    if (!config || !config.hasOwnProperty('name')) {
      console.error('config and config.name must not be null!')
      return
    }

    let comp = windowManifest.find((v) => v.name === config.name)
    if (!comp) {
      console.error(`can not find a Window named "${config.name}"`)
      return
    }
    // 是否可以重复创建窗口
    let single = comp.single || false

    // console.log(`single=${single}`, this.hasWindowOf(config.name))
    // 单窗口模式，并且已经存在该窗口，不再创建
    if (single && this.hasWindowOf(config.name)) {
      return
    }

    let ids = this._openedWindowMap[config.name]
    // 创建
    let window = comp.creator(config.args || {})
    if (!ids) {
      ids = []
      this._openedWindowMap[config.name] = ids
    }
    ids.push(window.id)
    // 窗口关闭时，需要移除
    window.on('close', () => {
      let idx = ids.indexOf(window.id)
      ids.splice(idx, 1)
      console.log(this._openedWindowMap)
    })
    console.log(this._openedWindowMap)
  }

  /** 有已打开的window */
  hasWindow() {
    return BrowserWindow.getAllWindows.length > 0
  }

  /** 有已打开的某个name的window */
  hasWindowOf(name) {
    let ids = this._openedWindowMap[name]
    return (ids && ids.length > 0) || false
  }

  /** 根据窗口名返回该窗口 */
  findWindowOf(name) {
    if (this.hasWindowOf(name)) {
      return BrowserWindow.fromId(this._openedWindowMap[name][0])
    }
    return null
  }

  /** 返回当前激活的窗口 */
  getFocusedWindow() {
    return BrowserWindow.getFocusedWindow()
  }
}

const wm = new WindowManager()
module.exports = wm