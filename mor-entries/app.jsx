import React from 'react';
import ReactDOM from 'react-dom';
import '@morjs/runtime-web/lib/components';
import '@morjs/runtime-web/lib/api';
import Runtime from '@morjs/runtime-web/lib/runtime';
import { createRouter } from '@morjs/runtime-web/lib/router';
import $API_EXTENSION_0 from '@ali/tiga-miniprogram-h5-api-enhanced';
import '@/app.ts';
$API_EXTENSION_0({});
;
var config = {
  "pages": ["/pages/home/home", "/pages/shop/shop", "/pages/my/my", "/pages/sports/sports", "/pages/population-list/population-list", "/pages/pageNotFound/pageNotFound", "/pages/todos/todos", "/pages/add-todo/add-todo", "/pages/article/detail", "/pages/population/detail", "/pages/activity/detail", "/pages/activity-list/activity-list", "/pages/search/search", "/pages/my/center", "/pages/result/result"],
  "window": {
    "backgroundColor": "#F9F9F9",
    "defaultTitle": "九霞裾",
    "titleBarColor": "#FFFFFF"
  },
  "tabBar": {
    "textColor": "#000000",
    "selectedColor": "#A86600",
    "backgroundColor": "#FFFFFF",
    "items": [{
      "activeIcon": "/assets/home-active.png",
      "icon": "/assets/home-active.png",
      "pagePath": "/pages/home/home",
      "name": "首页"
    }, {
      "activeIcon": "/assets/shop-active.png",
      "icon": "/assets/shop-active.png",
      "pagePath": "/pages/shop/shop",
      "name": "店铺"
    }, {
      "activeIcon": "/assets/my-active.png",
      "icon": "/assets/my-active.png",
      "pagePath": "/pages/my/my",
      "name": "九霞裾"
    }]
  },
  "lazyCodeLoading": "requiredComponents",
  "embeddedAppIdList": ["wx8abaf00ee8c3202e"]
};
config.routes = [{
  path: '/pages/home/index',
  loader: function loader() {
    return import('./pages/home/index');
  }
}, {
  path: '/pages/shop/shop',
  loader: function loader() {
    return import('./pages/shop/shop');
  }
}, {
  path: '/pages/my/my',
  loader: function loader() {
    return import('./pages/my/my');
  }
}, {
  path: '/pages/sports/sports',
  loader: function loader() {
    return import('./pages/sports/sports');
  }
}, {
  path: '/pages/population-list/population-list',
  loader: function loader() {
    return import('./pages/population-list/population-list');
  }
}, {
  path: '/pages/pageNotFound/pageNotFound',
  loader: function loader() {
    return import('./pages/pageNotFound/pageNotFound');
  }
}, {
  path: '/pages/todos/todos',
  loader: function loader() {
    return import('./pages/todos/todos');
  }
}, {
  path: '/pages/add-todo/add-todo',
  loader: function loader() {
    return import('./pages/add-todo/add-todo');
  }
}, {
  path: '/pages/article/detail',
  loader: function loader() {
    return import('./pages/article/detail');
  }
}, {
  path: '/pages/population/detail',
  loader: function loader() {
    return import('./pages/population/detail');
  }
}, {
  path: '/pages/activity/detail',
  loader: function loader() {
    return import('./pages/activity/detail');
  }
}, {
  path: '/pages/activity-list/activity-list',
  loader: function loader() {
    return import('./pages/activity-list/activity-list');
  }
}, {
  path: '/pages/search/search',
  loader: function loader() {
    return import('./pages/search/search');
  }
}, {
  path: '/pages/my/center',
  loader: function loader() {
    return import('./pages/my/center');
  }
}, {
  path: '/pages/result/result',
  loader: function loader() {
    return import('./pages/result/result');
  }
}];
createRouter(config);