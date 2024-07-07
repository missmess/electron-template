/**
 * 窗口清单文件
 */
module.exports = [
  {
    name: 'home',
    single: true,
    creator: require('./wins/home')
  },
  {
    name: 'setting',
    single: true,
    creator: require('./wins/setting')
  }
]