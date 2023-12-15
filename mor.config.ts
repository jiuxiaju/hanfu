import { defineConfig } from '@ali/mor-cli'

export default defineConfig([
  {
    name: 'wechat',
    sourceType: 'alipay',
    target: 'wechat',
    compileType: 'miniprogram',
    compileMode: 'bundle',
  },
  // {
  //   name: 'wechat-ali',
  //   sourceType: 'alipay',
  //   target: 'alipay',
  //   compileType: 'miniprogram',
  //   compileMode: 'bundle'
  // },
])
