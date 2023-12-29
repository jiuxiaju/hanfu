import { dbTest } from './database'
import get from 'lodash/get'
const collectionActivity = dbTest.collection('activity_set')

const _ = dbTest.command;

// todo any
/**
 * 获取活动详情
 * @param params
 * @returns
 */
export const getActivityById = async (params: any) => {
  const { activityId } = params;

  return collectionActivity
    .where({
      _id: activityId,
    })
    
    .get()
    .then((res) => {
      console.log('🚀 ~ file: home.ts:12 ~ res ~ res:', res)
      let data = get(res, 'data.0')
      if (data) {
        return {
          success: true,
          data,
        }
      } else {
        return {
          success: false,
          data: null,
          error: {
            message: '查询不到该数据',
          },
        }
      }
    })
}

// 获取活动列表（暂不分页）
const getActivityList = async (params: any) => {
  const batchSize = 20; // 每个批次的数据数量
  let hasMore = true; // 是否有更多数据
  let skipCount = 0; // 初始跳过的数据数量
  const result = []; // 最终结果数组
  const currentTimestamp = new Date().getTime(); // 获取当前时间戳
  const queryCondition = {
    type: params.type,
    region: dbTest.RegExp({
      regexp: params.region || '',
      options: 'i'
    })
  };
  if (params.status === '未开始') {
    queryCondition.startTime = _.gt(currentTimestamp);
  } else if (params.status === '进行中') {
    queryCondition.startTime = _.lte(currentTimestamp);
    queryCondition.emdTime = _.gt(currentTimestamp);
  } else if (params.status === '已结束') {
    queryCondition.emdTime = _.lte(currentTimestamp);
  }
  while (hasMore) {
    const res = await collectionActivity
      .where(queryCondition)
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
  getActivityById,
  getActivityList,
}
