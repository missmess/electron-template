## 代码结构

assets - 界面用到的资源文件

core - 核心的一些基础类

- constants.js - 常量
- eventHandler.js - 应用程序级别的事件处理器，处理来自于渲染进程的事件，非应用程序级别的放在对应window下去处理。
- windowMangager.js - 应用窗口管理类

wins - 应用窗口规格、与应用窗口相关的独立逻辑都放在这里
- ./preload.js - 需要在渲染进程执行的逻辑，存放与窗口无关的公共逻辑
- <窗口名>/index.js - 处理窗口逻辑
- <窗口名>/preload.js - 与窗口相关，并且需要在渲染进程执行的逻辑

main.js - 桌面程序入口。负责主窗口创建、菜单栏管理、应用生命周期管理等

WindowManifest.js - 应用窗口清单文件
