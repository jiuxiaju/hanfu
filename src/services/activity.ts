import { dbTest } from './database'
import get from 'lodash/get'
const collectionActivity = dbTest.collection('activity_set')

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
  const batchSize = 10; // 每个批次的数据数量
  let skipCount = 0; // 初始跳过的数据数量
  const result = [];

  while (true) {
    const res = await collectionActivity
      .where({
        type: params.type,
        status: params.status,
        region: params.region,
      })
      .skip(skipCount)
      .limit(batchSize)
      .get();

    result.push(...res.data);

    if (res.data.length < batchSize) {
      break;
    }

    skipCount += batchSize;
  }

  return result;
};

export default {
  getActivityById,
  getActivityList,
}
