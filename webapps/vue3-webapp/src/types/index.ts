export enum Platfrom {
  web = 0,
  windows = 1,
  mac = 2,
  linux = 3
}

export type ChooseFileConfig = {
  extensions?: string[]
}

export type NativeObj = {
  platform: Platfrom
  version: string
  getLocalIp: () => string
  openSetting: () => void
  chooseFile: (config?: ChooseFileConfig) => Promise<string[]>
  chooseDir: () => Promise<string[]>
  showInFolder: (path: string) => void
  getAppPath: () => string
  getPathUserData: () => string
  pathJoin: (...paths: string[]) => string
  saveToFile: (data: string, filename: string, ...dirs: string[]) => Promise<boolean>
  log: (...args: any[]) => void
}

declare global {
  interface Window {
    nativeObj: NativeObj | undefined
    onDvEvent: Function
  }
}
