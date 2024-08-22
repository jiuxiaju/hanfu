import home from './home'
import article from './article'
import population from './population'
import activity from './activity'
import mine from './mine'
import sports from './sports'

const map: any = {
  '/home/getBannerImgs': home.getBannerImgs,
  '/home/getActivities': home.getActivities,
  '/home/getArticles': home.getRecommendArticles,
  '/article/detail': article.getArticleById,
  '/activity/detail': activity.getActivityById,
  '/my/center/detail': mine.getMyCenterdetailById,
  '/sports/getSports': sports.getSportsInfo,
  '/article/updateArticleCReadNum': article.updateArticleCReadNum,
}
export const post = (url: string, params?: any) => {
  return Promise.resolve(map[url]?.data)
}

export const get = async (url: string, params?: any) => {
  const request = map[url]
  if (typeof request === 'function') {
    return new Promise((resolve, reject) => {
      map[url](params)
        .then((res: any) => {
          resolve(res)
        })
        .catch((err: any) => {
          reject(err)
        })
    })
  } else {
    return Promise.resolve(map[url].data)
  }
}

export default {
  get,
}


