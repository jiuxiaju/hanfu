Page({
  data: {
    items: [],
    loadingMore: false,
    hasMore: true, // 控制是否有更多数据加载
    page: 1, // 当前页码
    showBackToTop: false,// 控制回到顶部按钮的显示,
    mergedData: {
      fieldTranslations: {
        chaodai: "朝代",
        city: "城市",
        aa: "年级",
        bb: "属性",
        cb: "班级",
        dc: "段位",
        ee: "属性2"
      },
      tabsData: {
        chaodai: ["朝代"],
        city: ["北京"],
        aa: ["一年级", "二年级", "三年级"],
        bb: ["属性1", "属性2", "属性3", "属性4", "属性5", "属性6", "属性7", "属性8", "属性9", "属性10", "属性11"],
        // cb: ["一年级", "二年级", "三年级"],
        // dc: ["一年级", "二年级", "三年级"],
        // ee: ["属性1", "属性2", "属性3"]
      }
    },
  },

  onLoad() {
    // 初始化加载
    this.loadMoreItems();
  },

  onPageScroll(event) {
    console.log("页面滚动事件", event);

    const { scrollTop } = event;
    const query = wx.createSelectorQuery();
    query.select('.content').boundingClientRect(rect => {
      if (rect) {
        const totalHeight = rect.height;
        if (scrollTop + wx.getSystemInfoSync().windowHeight >= totalHeight - 50 && !this.data.loadingMore && this.data.hasMore) {
          this.loadMoreItems();
        }

        // 控制回到顶部按钮的显示
        if (scrollTop > 300) {
          this.setData({ showBackToTop: true });
        } else {
          this.setData({ showBackToTop: false });
        }
      }
    }).exec();
  },

  loadMoreItems() {
    if (!this.data.hasMore || this.data.loadingMore) {
      return;
    }

    this.setData({ loadingMore: true });

    // 模拟异步网路请求
    setTimeout(() => {
      const newItems = Array.from({ length: 20 }, (_, i) => `Item ${(this.data.page - 1) * 20 + i + 1}`);
      this.setData({
        items: this.data.items.concat(newItems),
        loadingMore: false,
        page: this.data.page + 1,
        hasMore: newItems.length > 0
      });
    }, 1500);
  },

  scrollToTop() {
    console.log("点击回到顶部");
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    });
  }
});
