import { aPage } from '@ali/mor-core';
import { post } from '../../services';

aPage({
  data: {
    types: [{
      label: '全部',
      value: 'all'
    }, {
      label: '上衣下裳',
      value: '1'
    }, {
      label: '上下连裳',
      value: '2'
    }, {
      label: '上下通裁',
      value: '3'
    }],
    articles: []
  },
  onLoad() {
    post('/sports/getArticles').then(articles => {
      this.setData({articles});
    });
  },
  onTabsChange(event:any) {
    console.log(`Change tab, tab-panel value is ${event.detail.value}.`);
  },
});
