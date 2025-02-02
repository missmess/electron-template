// Modules to control application life and create native browser window
const { app } = require('electron')
const wm = require('./core/windowManager')
require('./core/eventHandler')
require('./core/appMenus')

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  wm.startWindow({ name: 'home' })

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (!wm.hasWindow()) wm.startWindow({ name: 'home' })
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
