Component({
  properties: {
    title: {
      type: String,
      value: ''
    }
  },
    methods: {
      onBack() {
        wx.navigateBack();
      },
      onGoHome() {
        wx.reLaunch({
          url: '/pages/home/index',
        });
      },
    },
  });
  