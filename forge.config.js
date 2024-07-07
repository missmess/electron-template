var packageInfo = require("./package.json");

// 参考：https://www.electronforge.io/config/configuration
module.exports = {
  envConfig: {
    localRender: true, // true-本地渲染模式，读取/www目录; false-远程渲染模式，从baseUrl读取
    baseUrl: "http://127.0.0.1:5173/", // 远程渲染时，ui的http访问地址
  },
  packagerConfig: {
    name: packageInfo.name,
    appVersion: packageInfo.version,
    icon: "./pkg/icon",
    platforms: ["darwin"],
    appBundleId: "com.missmess.electrontemplate",
    ignore: [/^\/src/, /^\/webapp/, /^\/snapshots/], // 源码目录忽略掉，不打包
    appCopyright: packageInfo.author,
    junk: true,
    asar: false,
  },
  makers: [
    {
      name: "@electron-forge/maker-zip",
      config: {},
    },
  ],
};
