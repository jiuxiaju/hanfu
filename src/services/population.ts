import { dbTest } from './database';
import get from 'lodash/get';
const collectionKonwLedge = dbTest.collection('knowledge_set');


// todo any
/**
 * 获取科普详情
 * @param params 
 * @returns 
 */
export const getPopulationById = async(params: any) => {
    const { PopulationById } = params;

    return collectionKonwLedge
        .where({
        _id: PopulationById,
    }).
    get()
    .then((res) => {

        return {
            success: true,
            data: get(res, 'data.0', {}),
        };
    });
}
//目前是按照全部查询的
const getpopulationList = async () => {
  const batchSize = 20; // 每个批次的数据数量
  let hasMore = true; // 是否有更多数据
  let skipCount = 0; // 初始跳过的数据数量
  const result = []; // 最终结果数组

  while (hasMore) {
    const res = await collectionKonwLedge
      .where({})
      .orderBy('type_name', 'asc')
      // 如果需要根据创建时间排序，取消下面这行的注释
      // .orderBy('_createTime', 'asc')
      .skip(skipCount)
      .limit(batchSize)
      .get();

    const data = res.data;
    result.push(...data); // 将本次查询结果加入总结果数组

    if (data.length < batchSize) {
      // 如果返回的数据少于batchSize，说明没有更多数据了
      hasMore = false;
    } else {
      skipCount += batchSize; // 准备跳过之前已加载的数据
    }
  }

  return result;
};
export default {
    getPopulationById,
    getpopulationList
}
