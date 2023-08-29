import { aPage } from '@ali/mor-core';
import { post } from '../../services';

aPage({
  data: {
    articles: []
  },
  onLoad() {
    post('/sports/getArticles').then(articles => {
      this.setData({articles});
    });
  },
});
