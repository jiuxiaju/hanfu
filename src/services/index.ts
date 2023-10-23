import activities from '../../mock/request/home/getActivities';
import articles from '../../mock/request/home/getArticles';
import sportsArticles from '../../mock/request/sports/getArticles';
import populationList from '../../mock/request/population/list'
import article from './article';
import population from './population';
import activity from './activity';
import mine from './mine';

const map: any = {
  '/home/getActivities': activities,
  '/home/getArticles': articles,
  '/sports/getArticles': sportsArticles,
  '/article/detail': article.getArticleById,
  '/population/detail': population.getPopulationById,
  '/activity/detail': activity.getActivityById,
  '/my/center/detail': mine.getMyCenterdetailById,
  '/population/list': populationList,
}
export const post = (url:string, params?: any) => {
  return Promise.resolve(map[url]?.data);
}

export const get = async (url: string, params?: any) => {
  const request = map[url];
  if (typeof request === 'function') {
    return new Promise((resolve, reject) => {
      map[url](params).then((res: any) => {
        resolve(res);
      }).catch((err: any) => {
        reject(err);
      })
    });
  } else {
    return Promise.resolve(map[url].data)
  }
}

export default {
  get,
}
