var appConfig = {
  "pages": [
    "pages/home/index",
    "pages/shop/index/index",
    "pages/shop/offline-detail/index",
    "pages/shop/online-detail/index",
    "pages/shop/style/index",
    "pages/population-list/index/index",
    "pages/population-list/detail/index",
    "pages/activity-list/index/index",
    "pages/activity-list/detail/index",
    "pages/cards/index",
    "pages/product-details/index",
    "pages/my/my",
    "pages/sports/index",
    "pages/article/detail",
    "pages/menu/index",
    "pages/search/search",
    "pages/my/center",
    "pages/result/result",
    "pages/tips/index",
    "pages/navbar/index"
  ],
  "window": {
    "backgroundColor": "#F9F9F9",
    "defaultTitle": "九霞裾",
    "titleBarColor": "#FFFFFF"
  },
  "tabBar": {
    "textColor": "#000000",
    "selectedColor": "#A86600",
    "backgroundColor": "#FFFFFF",
    "items": [
      {
        "pagePath": "pages/home/index",
        "name": "首页",
        "icon": "assets/home-active.png",
        "activeIcon": "assets/home-active.png"
      },
      {
        "pagePath": "pages/shop/index/index",
        "name": "店铺",
        "icon": "assets/shop-active.png",
        "activeIcon": "assets/shop-active.png"
      },
      {
        "pagePath": "pages/my/my",
        "name": "九霞裾",
        "icon": "assets/my-active.png",
        "activeIcon": "assets/my-active.png"
      }
    ]
  },
  "embeddedAppIdList": [
    "wx8abaf00ee8c3202e"
  ],
  "usingComponents": {
    "navbar": "/pages/navbar/index"
  }
};
wx.MOR_APP_CONFIG = appConfig;
module.exports = appConfig;