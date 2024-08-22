import { defineConfig } from '@ali/mor-cli'

export default defineConfig([
  // {
  //   name: 'wechat',
  //   sourceType: 'alipay',
  //   target: 'wechat',
  //   compileType: 'miniprogram',
  //   compileMode: 'bundle',
  // },
  // {
  //   name: 'web',
  //   sourceType: 'alipay',
  //   target: 'web',
  //   compileType: 'miniprogram',
  //   compileMode: 'bundle',
  //   processNodeModules: {
  //     include: [/tdesign\-miniprogram/]
  //   },
  //   alias: {
  //     'tdesign-miniprogram': 'tdesign-miniprogram/miniprogram_dist'
  //   },
  //     // 配置小程序组件名映射表
  //     // 默认无需配置, 可指定全局组件配置文件
  //     globalComponentsConfig: {},
  
  //     // 是否使用 rpx2rem 插件对 rpx 单位进行转换
  //     // 默认为 true
  //     // 优先级低于 usePx
  //     needRpx: true,
  
  //     // 是否需要样式隔离，如果开启该功能，在编译时会给样式加上唯一 hash 值，用于多页面解决样式冲突问题
  //     // 默认为 false
  //     styleScope: false,
  
  //     // rpx 方案的 root value。
  //     // 默认是 32
  //     rpxRootValue: 32,
  
  //     // 默认编译出来的样式会以 rem 为单位
  //     // 优先级高于 needRpx
  //     // 配合 runtime 层提供的 setRootFontSizeForRem 方法可以实现移动端的响应式。
  //     // 如果不想将样式单位编译成 rem 可以配置该对象，
  //     // 对象中包含一个参数 ratio 用于指定 rpx 2 px 的转换比例。
  //     // 如 ratio 为 1， 那么 1rpx = 1px， 如果配置 ratio 为 2， 那么 1rpx = 0.5px
  //     usePx: { ratio: 2 },
  
  //     // extensions 配置，用于设置接口扩展
  //     // 可设置多个扩展路径，如 ['extension1', 'extension2', ['extension3', {}]]
  //     extensions: [],
  
  //     // 配置可开启页面自动响应式（以375尺寸为准）
  //     // 换算方式为 rpxRootValue / usePx.ratio
  //     // 以上方默认值为例, 如需开启响应式可配置为: 32 / 2 = 16 即可
  //     responsiveRootFontSize: undefined,
  
  //     // 是否需要在导航栏展示返回按钮, 默认为 false
  //     // 配置示例:
  //     //    true: 所有页面均开启
  //     //    false: 所有页面均关闭
  //     //    []: 可通过数组配置具体需要开启的页面
  //     //    (pagePath: string) => boolean: 可通过函数来定制页面开启情况
  //     showBack: false,
  
  //     // 是否需要导航栏, 默认为 true
  //     // 配置示例:
  //     //    true: 所有页面均开启
  //     //    false: 所有页面均关闭
  //     //    []: 可通过数组配置具体需要开启的页面
  //     //    (pagePath: string) => boolean: 可通过函数来定制页面开启情况
  //     showHeader: true,
  
  //     // 产物通用路径
  //     publicPath: '/',
  
  //     // 开发服务器配置
  //     // 详细配置参见: https://webpack.js.org/configuration/dev-server/
  //     devServer: {},
  
  //     // html-webpack-plugin 插件 配置
  //     // 详细配置参见: https://webpack.js.org/plugins/html-webpack-plugin/
  //     // 支持在数组中配置多个 html 页面
  //     htmlOptions: [],
  
  //     // mini-css-extract-plugin 插件配置
  //     // 详细配置参见: https://webpack.js.org/plugins/mini-css-extract-plugin/
  //     miniCssExtractOptions: {},
  
  //     // 行内资源大小配置, 默认为 8k
  //     inlineAssetLimit: 8192,
  
  //     // 是否自动生成 entries, 默认均开启
  //     // 如关闭, 则需要自行指定 webpack 配置的入口文件
  //     autoGenerateEntries: true,
  
  //     // 入口文件配置, 仅在 autoGenerateEntries 为 false 的情况下生效
  //     // 用于手动配置 webpack 入口文件地址
  //     // 若手动配置则需要用户自行组装页面及引用
  //     entry: undefined,
  
  //     // 是否输出中间产物
  //     emitIntermediateAssets: true,
  
  //     // 支持用户自定义运行时的一些行为，该字段将作为 $MOR_APP_CONFIG 写入到 window 对象中，供运行时获取并消费
  //     appConfig: {
  //       // 用于传递业务对某个组件的特殊配置, 比如 map 组件传递 key
  //       components: {},
  
  //       // 用于自定义 URL 中 query 部分的 tabBarKey 的实际名称，该 key 作用于 URL 的 query
  //       // 并将拿到到值，用于获取 app.json 中的 tabbar 内容，以此实现通过 URL 参数切换不同 tabbar 的功能
  //       customTabBarKey: 'tabBarKey',
  
  //       // 用于配置是否允许覆盖全局对象中的方法，默认情况下不会覆盖 `my.xxx` 方法或属性
  //       // 可以通过配置为 `false` 来强制覆盖
  //       apiNoConflict: true
  //     }
  //   }

  // },
    {
    name: 'dingding',
    sourceType: 'alipay',
    target: 'dingding',
    compileType: 'miniprogram',
    compileMode: 'bundle',
    processNodeModules: {
      include: [/tdesign\-miniprogram/]
    },
    alias: {
      'tdesign-miniprogram': 'tdesign-miniprogram/miniprogram_dist'
    }
  },
])

