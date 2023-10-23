import { aPage } from '@ali/mor-core';
import { get } from '../../services';

// 获取全局 app 实例
const app = getApp()

aPage({
  data: {
    headline: '',
    article: '',
  },
  onLoad(options) {
    const { articleId } = options;
    if (articleId) {
      this.getArticleDetail(articleId);
    }
  },

  getArticleDetail(articleId: string | number) {
    get('/article/detail', { articleId }).then(res => {
      const { data } = res;
      const { headline, article, } = data;
      this.setData({
        headline,
        article: app.convertRichText(article),
      });
    });
  },
})
