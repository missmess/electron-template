const { app, Menu, dialog } = require('electron')

const isMac = process.platform === 'darwin'
const isDev = process.env.NODE_ENV === 'development'

const giteeMenu = {
  label: '访问gitee',
  click: async () => {
    const { shell } = require('electron')
    await shell.openExternal('https://gitee.com/missmess')
  }
}

// 菜单配置项
const template = [
  // { role: 'appMenu' }
  ...(isMac ? [{
    label: app.name,
    submenu: [
      { role: 'about', label: '关于' },
      { 
        label: '设置',
        click: () => {
          const wm = require('./windowManager')
          wm.startWindow({ name: 'setting' })
        }
      },
      { type: 'separator' },
      { role: 'close', label: '关闭窗口' },
      { role: 'quit', label: '退出' }
    ]
  }] : [
    { role: 'quit', label: '退出' }
  ]),
  // { role: 'fileMenu' }

  // { role: 'editMenu' }
  {
    label: '编辑',
    submenu: [
      { role: 'selectAll', label: '全选' },
      { role: 'copy', label: '复制' },
      { role: 'paste', label: '粘贴' },
    ]
  },
  // { role: 'viewMenu' }
  {
    label: '视图',
    submenu: [
      { role: 'minimize', label: '最小化' },
      { role: 'togglefullscreen', label: '切换全屏' }
    ]
  },
  // { role: 'windowMenu' }

  {
    role: 'help',
    label: '帮助',
    submenu: isDev ? [
      giteeMenu,
      { type: 'separator' },
      { role: 'toggleDevTools', label: '开发工具' },
    ] : [giteeMenu]
  }
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)