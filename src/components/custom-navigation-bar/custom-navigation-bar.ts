import { aComponent } from '@ali/mor-core'

aComponent({
  data: {
    titleBarHeight: 0,
    statusBarHeight: 0,
    focus: false,
  },
  props: {
    showBackIcon: false,
    onSearch: (value: string) => {},
  },
  didMount() {
    const systemInfo = my.getSystemInfoSync()
    const titleBarHeight = this.getTitleBarHeight(systemInfo.statusBarHeight)
    const statusBarHeight = systemInfo.statusBarHeight

    // 设置数据
    this.setData({
      titleBarHeight: titleBarHeight,
      statusBarHeight: statusBarHeight,
    })

    // 如果是在搜索页面，则search组件聚焦
    if (this.$page.route === 'pages/search/search') {
      this.setData({
        focus: true,
      })
    }
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
    onNavigateBack() {
      my.navigateBack()
    },
    onSearch(e) {
      this.props.onSearch(e.detail.value)
    },
  },
})
