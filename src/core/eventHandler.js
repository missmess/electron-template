/**
 * 处理应用程序级别event
 * 如果不是应用程序级别的event，请在对应业务的窗口模块下去订阅处理
 */
const { ipcMain, dialog, app } = require("electron");
const wm = require("./windowManager");

/** 打开窗口事件 */
ipcMain.handle("open-window", (event, data) => {
  if (!data) return;
  wm.startWindow({ name: data["name"] });
});

/** 选择电脑上的文件 */
ipcMain.handle("choose-file", (event, data) => {
  var filters = undefined;
  if (data.extensions && data.extensions.length) {
    filters = [{ name: "custom", extensions: data.extensions }];
  }
  // 打开文件选择框
  return dialog
    .showOpenDialog(wm.getFocusedWindow(), {
      properties: ["openFile"],
      filters,
    })
    .then((val) => {
      // 返回文件地址列表
      return val.filePaths;
    });
});

/** 选择电脑上的文件夹 */
ipcMain.handle("choose-dir", () => {
  return dialog
    .showOpenDialog(wm.getFocusedWindow(), {
      properties: ["openDirectory", "createDirectory"],
    })
    .then((val) => {
      return val.filePaths; //string[]
    });
});

/** 获取当前应用程序的目录 */
ipcMain.on("get-app-path", (event, arg) => {
  event.returnValue = app.getAppPath();
});

/** 获取当前程序的用户数据目录 */
ipcMain.on("get-path-user-data", (event, arg) => {
  event.returnValue = app.getPath("userData");
});

/** 打印日志到控制台 */
ipcMain.handle("log", (event, ...data) => {
  console.log(...data)
})