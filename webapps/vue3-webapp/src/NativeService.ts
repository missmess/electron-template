/**
 * 与Native客户端的全部交互接口。
 *
 * 如果在纯web端，交互接口则无法从native获取，需要自己去实现。
 */
import { Platfrom } from './types'
import type { NativeObj } from './types'

/** 通过这个对象调用native接口 */
let service: {
  inWeb: Boolean
  inNative: Boolean
} & NativeObj

if (window.nativeObj !== undefined) {
  console.log('startup from native')
  service = Object.assign(
    {
      inWeb: false,
      inNative: true
    },
    window.nativeObj
  )
} else {
  console.log('Startup from web')
  service = {
    version: '-0.0.1',
    platform: Platfrom.web,
    inWeb: true,
    inNative: false,
    openSetting: () => {
      window.open('#setting', '_blank')
    },
    getLocalIp: () => {
      console.log('unable to get local ip address')
      return 'unknown'
    },
    chooseFile: async () => ['~/demo.txt'],
    chooseDir: async () => ['~/My Document'],
    getAppPath: () => '/Users/missmess/ElectronProjects/electron-template',
    getPathUserData: () => '/Users/missmess/Library/Application Support/electron-template',
    pathJoin: (...paths) => paths.join('/'),
    saveToFile: (data, filename, ...dir) => {
      console.log(`saveToFile daemon in web，${[...dir, filename].join('/')}`)
      return Promise.resolve(true)
    },
    log: console.log,
    showInFolder: (path) => {
      window.alert('web端无法打开指定文件夹')
    }
  }
}

export default service
