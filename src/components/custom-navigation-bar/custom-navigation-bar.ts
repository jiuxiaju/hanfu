Component({
  data: {
    titleBarHeight: 0,
    statusBarHeight: 0,
  },
  didMount() {
    // 获取手机基础信息(头状态栏和标题栏高度)
    // const {
    //   titleBarHeight,
    //   statusBarHeight,
    // } = my.getSystemInfoSync()
    // this.setData({
    //   titleBarHeight: this.getTitleBarHeight(statusBarHeight),
    //   statusBarHeight,
    // },
    // )
    const systemInfo = my.getSystemInfoSync()
    const titleBarHeight = this.getTitleBarHeight(systemInfo.statusBarHeight)
    const statusBarHeight = systemInfo.statusBarHeight

    // 设置数据
    this.setData({
      titleBarHeight: titleBarHeight,
      statusBarHeight: statusBarHeight,
    })
  },
  didUpdate() {},
  didUnmount() {},
  methods: {
    // 计算titleBar的高度，wx无法自动提供
    getTitleBarHeight(statusBarHeight: number) {
      try {
        const { top, height } = wx.getMenuButtonBoundingClientRect()
        return (top - statusBarHeight) * 2 + height
      } catch (error) {
        return 48
      }
    },
    onJump2Search() {
      if (this.$page.route !== 'pages/search/search') {
        my.navigateTo({ url: '/pages/search/search' })
      }
    },
  },
})
