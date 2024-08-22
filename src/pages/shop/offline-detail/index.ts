import { aPage } from '@ali/mor-core'
aPage({
  data: {
    currentImageIndex: 0,
    containerHeight: 200,
    shopInfo: {
      styles:[],
      images:[],
      tags:[],
    },
    showLoading: true,    // 用于显示加载动画
    styles:[],
    itemId: '',
    images:[],
    tags:[],
    rowCol: [ { width: '100%',height:'100px' }],
  },
  onLoad(query) {
    const itemId = query.itemId || '';
    this.setData({
      itemId: itemId
    });
    console.log(itemId,'itemId')
    wx.cloud
      .callFunction({
        // 云函数名称
        name: "offline-detail",
        data: {
          itemId
        }
      })
      .then((res) => {
        console.log(res, 'data'); 
        const data = res.result[0];
        if (data) {
          this.setData({
            shopInfo: data,
            images: data.images,
            style: data.style,
            isOpen: this.isShopOpen(data.businessHours),
            showLoading: false // 数据加载完毕，隐藏加载动画
          });
        }else {
        // 如果data为空，你可以根据需求处理，如隐藏动画等
        this.setData({
          showLoading: false, // 数据加载完毕，隐藏加载动画
        });
      }
      console.log(data, 'data'); 
      }).catch(err => {
        console.error(err);
        this.setData({
          showLoading: false, // 如果请求失败，隐藏加载动画
        });
      });

    this.adjustContainerHeight();


  },
  onShareAppMessage() {
    const promise = new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          title: '九霞裾',
        })
      }, 20)
    })
    return {
      title: '九霞裾',
      path: '/pages/home',
      promise,
    }
  },
  //转发到朋友圈
  onShareTimeline: function () {
    return {
      title: '快来看看',
    }
  },
  handlePopup(e) {
    const { item } = e.currentTarget.dataset;

    this.setData(
      {
        cur: item,
      },
      () => {
        this.setData({ visible: true });
      },
    );
  },
  onVisibleChange(e) {
    this.setData({
      visible: e.detail.visible,
    });
  },
  previewImage(event) {
    const index = event.currentTarget.dataset.index;
    wx.previewImage({
      current: this.data.images[index], // 当前显示图片的http链接
      urls: this.data.images // 需要预览的图片http链接列表
    });
  },
  onSwiperChange(e) {
    const currentImageIndex = e.detail.current;

    this.setData({
      currentImageIndex
    });

    // 调整容器高度
    this.adjustContainerHeight();
  },

  onImageLoad(e) {
    // 计算每张图片的实际高度
    const { width, height } = e.detail;

    // 以当前图片的宽高比计算其在Swiper中的高度
    const containerWidth = wx.getSystemInfoSync().windowWidth;
    const calculatedHeight = (height / width) * containerWidth;

    // 设置容器高度
    this.setData({
      containerHeight: calculatedHeight
    });
  },

  adjustContainerHeight() {
    const currentImageSrc = this.data.shopInfo.images[this.data.currentImageIndex];

    // 获取当前图片的宽高信息，重新调整容器高度
    wx.getImageInfo({
      src: currentImageSrc,
      success: (res) => {
        const { width, height } = res;

        // 以当前图片的宽高比计算其在Swiper中的高度
        const containerWidth = wx.getSystemInfoSync().windowWidth;
        const calculatedHeight = (height / width) * containerWidth;

        this.setData({
          containerHeight: calculatedHeight
        });
      }
    });
  },
  isShopOpen(businessHours) {
    const now = new Date();
    const currentDay = (now.getDay() + 6) % 7 + 1; // 星期几 (周一到周日分别为 1 到 7)
    const currentTime = now.toTimeString().split(' ')[0]; // 当前时间 (HH:MM:SS)

    const daysMap = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
    const today = daysMap[currentDay - 1];
    const todayHours = businessHours.find(day => day.day === today);

    if (!todayHours || todayHours.hours === '休息') {
      return false;
    }

    const [openTime, closeTime] = todayHours.hours.split(' - ');
    return currentTime >= openTime && currentTime <= closeTime;
  },
  navigateToUrl(event) {
    const style = event.currentTarget.dataset.style;
    console.log('navigateToUrl:', style); // 调试输出
    my.navigateTo({
      url: `/pages/population-list/detail/index?style=${style}`,
    })
  }
})