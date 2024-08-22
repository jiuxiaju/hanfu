Page({
  data: {
    product: {

    }
    ,
    skuList: [],
    config: {
      fieldsToShow: ['brand', 'size', 'delivery'],
      labels: {
        brand: '品牌',
        size: '尺码',
        delivery: '发货周期'
      }
    },
    loading: true,
    images: [
    ],
    currentImageIndex: 0, // 图片预览区当前显示的图片索引
    currentSkuIndex: 0, // 当前选中的SKU索引
    imageHeights: [],     // 保存每张图片的高度
    containerHeight: 300, // 初始轮播容器的高度，避免第一次高度为0
    tabVisible: false,
  },

  onLoad: function (query) {

    const itemId = query.itemId || '';
    this.setData({
      itemId: itemId
    });
    wx.cloud
      .callFunction({
        // 云函数名称
        name: "item-sku",
        data: {
          itemId
        }
      })
      .then((res) => {
        console.log(res, 'res')
        const result = res.result;
        this.setData({
          styleetails: result.data[0],
          skuList: result.data[0].skuList,
          config: result.config,
          images: result.data[0].images,
          product: result.data[0],
          loading: false
        });
      })
    // 初始化 imageHeights 数组
    const totalImages = this.data.images.length + this.data.skuList.length;
    const initialHeights = new Array(totalImages).fill(0);
    this.setData({
      imageHeights: initialHeights
    });
  },

  // 点击main-icon时，切换预览区图片。
  onMainIconClick: function () {
    this.setData({
      currentSkuIndex: -1, // 取消选中的SKU
      currentImageIndex: 0 // 显示第一张图片
    });
    this.scrollToImage();
  },

  // 点击SKU icon时，切换预览区
  onIconClick: function (event) {
    const index = event.currentTarget.dataset.index;

    this.setData({
      currentSkuIndex: index,
      currentImageIndex: this.data.images.length + index
    });
    this.scrollToImage();
  },
  // 处理轮播图滑动（或点击）事件，更新当前索引
  onSwiperChange: function (e) {
    const currentImageIndex = e.detail.current;
    this.setData({
      currentImageIndex,
      // currentSkuIndex: currentImageIndex < this.data.images.length ? -1 : currentImageIndex - this.data.images.length
      currentSkuIndex: currentImageIndex >= this.data.images.length
        ? currentImageIndex - this.data.images.length
        : -1
    });

    // 调整容器高度
    this.adjustContainerHeight();
  },

  // 获取图片的高度
  onImageLoad: function (e) {
    const { width, height } = e.detail;
    const windowWidth = wx.getSystemInfoSync().windowWidth;

    // 计算图片显示高度
    const aspectRatio = width / height;
    const containerHeight = windowWidth / aspectRatio;

    const index = e.currentTarget.dataset.index; // 从dataset获取索引

    let { imageHeights } = this.data;

    // 更新 imageHeights 数组中的特定索引值
    if (index !== undefined) {
      imageHeights[index] = containerHeight;
      this.setData({ imageHeights });
      // 如果当前加载图片是正在显示的图片时，调整容器高度
      if (index === this.data.currentImageIndex) {
        this.setData({ containerHeight: containerHeight });
      }

      // 如果是首次加载，设置第一页的高度
      if (index === 0) {
        this.setData({ containerHeight: containerHeight });
      }
    } else {
      console.warn('onImageLoad - index is undefined');
    }
  },

  // 滚动到选中的图片
  scrollToImage: function () {
    const windowWidth = wx.getSystemInfoSync().windowWidth;
    const scrollLeft = this.data.currentImageIndex * windowWidth;
    this.setData({
      scrollLeft: scrollLeft
    });

    // 调整容器高度
    this.adjustContainerHeight();
  },
  // 根据图片高度调整容器高度
  adjustContainerHeight: function () {
    const { imageHeights, currentImageIndex } = this.data;
    const containerHeight = imageHeights[currentImageIndex];

    if (containerHeight) {
      this.setData({
        containerHeight: containerHeight
      });
    }
  },
  //分享给好友
  onShareAppMessage() {
    const app = getApp(); // 获取全局应用实例
    const promise = new Promise(resolve => {
      app.generateShareInfo().then(shareInfo => {
        // 在这里处理生成的分享信息
        resolve(shareInfo);
      });
    });
    return {
      title: '九霞裾',
      path: '/pages/home', // 这个值会被 promise 里面的 pathWithArgs 覆盖
      promise
    };
  },
  previewImage(event) {
    const urls = this.data.images.concat(this.data.skuList.map(item => item.image));
    // 获取当前点击的图片地址
    const current = urls[event.currentTarget.dataset.index];
    my.previewImage({
      current, // 当前显示图片的http链接
      urls // 需要预览的图片http链接列表
    });

  },
  //转发到朋友圈
  onShareTimeline: function () {
    return {
      title: '快来看看'
    }
  },
  handleShopClick(event) {
    const itemId = event.currentTarget.dataset.shopId;
    my.navigateTo({
      url: `/pages/shop/online-detail/index?itemId=${itemId}`,
    })
  },
  previewDetailImage(event) {
    const current = event.currentTarget.dataset.index;
    const imageUrls = this.data.skuList.map(sku => sku.image);

    wx.previewImage({
      current: imageUrls[current], // 当前显示图片的http链接
      urls: imageUrls // 需要预览的图片http链接列表
    });
  },
  //检测页面滚动高度

  onPageScroll(event) {
    const query = wx.createSelectorQuery();
    query.select('#detailsSection').boundingClientRect(rect => {
      const tabVisible = rect.top <= 0;
      if (tabVisible !== this.data.tabVisible) {
        this.setData({ tabVisible });
      }
    }).exec();
  },
  scrollToTop() {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 600
    });
  },

  scrollToDetails() {
    const query = wx.createSelectorQuery();
    query.select('#detailsSection').boundingClientRect(rect => {
      if (rect) {
        wx.pageScrollTo({
          scrollTop: rect.top + wx.getSystemInfoSync().scrollTop, // 确保滚动到顶部
          duration: 600
        });
      } else {
        console.error('无法获取 detailsSection 的位置信息');
      }
    }).exec();
  }
})
