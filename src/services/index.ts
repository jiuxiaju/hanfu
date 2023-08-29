import activities from '../../mock/request/home/getActivities';
import articles from '../../mock/request/home/getArticles';
import sportsArticles from '../../mock/request/sports/getArticles';

const map:any = {
  '/home/getActivities': activities,
  '/home/getArticles': articles,
  '/sports/getArticles': sportsArticles,
}
export const post = (url:string, params?: any) => {

  return Promise.resolve(map[url]?.data);
}
