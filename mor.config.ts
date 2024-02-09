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
  //   name: 'alipay',
  //   sourceType: 'alipay',
  //   target: 'alipay',
  //   compileType: 'miniprogram',
  //   compileMode: 'bundle'
  // },
  // {
  //   name: 'qq',
  //   sourceType: 'alipay',
  //   target: 'qq',
  //   compileType: 'miniprogram',
  //   compileMode: 'bundle'
  // },
  
])
