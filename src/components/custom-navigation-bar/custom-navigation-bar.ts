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
    const systemInfo = my.getSystemInfoSync();
    const titleBarHeight = this.getTitleBarHeight(systemInfo.statusBarHeight);
    const statusBarHeight = systemInfo.statusBarHeight;

    // 设置数据
    this.setData({
      titleBarHeight: titleBarHeight,
      statusBarHeight: statusBarHeight,
    }, () => {
      // 设置完成后的回调函数，在此处打印
      console.log('titleBarHeight1:', this.data.titleBarHeight);
      console.log('statusBarHeight1:', this.data.statusBarHeight);
    });
  },
  didUpdate() { },
  didUnmount() { },
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
    onTitleBar(e) {
      my.alert({
        title: '点击了标题栏',
      })
    },
    click(e) {
      const { trigger } = e.detail;
      console.log(`click on the ${trigger} area`);
    },
  },
})
