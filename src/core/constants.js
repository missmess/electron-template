const forge = require("../../forge.config");
const pkg = require("../../package.json");
/**
 * 存放全局常量
 */
module.exports = {
  version: forge.packagerConfig.appVersion,
  homepage: pkg.homepage,
};
