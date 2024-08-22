import { aPage } from '@ali/mor-core';
import { get } from '../../services';

// 获取全局 app 实例
const app = getApp()

aPage({
  data: {
    headline: '',
    article: '',
    errConfig: {},
    read_count: 0,
  },
  onLoad(options) {
    const { articleId } = options;
    if (articleId) {
      this.articleId = articleId;
      this.getArticleDetail();
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
    //转发到朋友圈
    onShareTimeline: function () {
      return {
        title: '快来看看'
      }
    },

  getArticleDetail() {
    get('/article/detail', { articleId: this.articleId }).then(res => {
      const { data = {}, success } = res;
      const { headline, article, ...remainData } = data;
      if (success && article) {
        this.setData({
          headline,
          article: app.convertRichText(article),
          ...remainData,
          errConfig: {},
        });
        this.updateArticleCReadNum();
      } else {
        const errConfig = {
          errType: 1,
        }
        this.setData({
          errConfig,
        });
      }
    });
  },

  onRefresh() {
    console.log('##### onrefresh')
    this.getArticleDetail();
  },

  /**
   * 更新阅读量
   * @param articleId 
   */
  updateArticleCReadNum() {
    get('/article/updateArticleCReadNum', { articleId: this.articleId });
  },
})
