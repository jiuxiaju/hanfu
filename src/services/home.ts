import { dbTest } from './database'
const _ = dbTest.command
const collection = dbTest.collection('activity_set')
const collectionHomeImages = dbTest.collection('home_images')
const collectionArticle = dbTest.collection('article')

// 获取首页展示的banner图
const getBannerImgs = () =>
  collectionHomeImages
    .where({
      enable: true,
    })
    .get()
    .then((res) => res.data)

// 查询前2条活动
export const getActivities = async (params: any) => {
  const res = collection
    .where({})
    .orderBy('startTime', 'desc')
    .limit(2)
    .get()
    .then((res) => {
      return res.data
    })
  return res
}

// 获取推荐文章
const getRecommendArticles = () => {
  return Promise.all([
    collectionArticle
      .where({
        recommend: true,
      })
      .orderBy('_createTime', 'desc')
      .limit(3)
      .get()
      .then((res) => res.data),
    collectionArticle
      .where({
        recommend: true,
        type: '1',
      })
      .orderBy('_createTime', 'desc')
      .limit(3)
      .get()
      .then((res) => res.data),
    collectionArticle
      .where({
        recommend: true,
        type: '2',
      })
      .orderBy('_createTime', 'desc')
      .limit(3)
      .get()
      .then((res) => res.data),
  ])
}

export default {
  getBannerImgs,
  getActivities,
  getRecommendArticles,
}
