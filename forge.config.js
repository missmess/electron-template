var packageInfo = require("./package.json");

// 参考：https://www.electronforge.io/config/configuration
module.exports = {
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
